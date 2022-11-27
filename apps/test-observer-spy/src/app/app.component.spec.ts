import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {delay, from, Observable, of} from 'rxjs';
import {AppComponent} from './app.component';
import {subscribeSpyTo} from '@hirez_io/observer-spy';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  describe('component doSomething function', () => {
    test.each([
      [[1, 2, 3], [2, 4, 6]],
      [[1, 1, 1], [2, 2, 2]],
      [[0, 0, 0], [0, 0, 0]],
    ])(
      "Given an observable with %p emitted values as arguments should returns %p",
      (firstArg, expectedResult) => {
        expect(subscribeSpyTo(component.doSomething(from(firstArg))).getValues()).toEqual(expectedResult);
      })
  })
  describe('component doRace function',() => {
    test.each`
        a | expected
        ${[of(3), of(2), of(1)]} | ${3}
        ${[of(1), of(2), of(1)]} | ${1}
        ${[of(4)]}                           | ${4}
        ${[of('first'), of('second')]}                           | ${'first'}
        ${[of('second').pipe(delay(200)), of('first').pipe(delay(300))]}                          | ${'second'}
        ${[of(true), of(false)]}                           | ${true}
      `('Given an array of observable as arguments should returns $expected',async({a, expected}) => {
        const observerSpy = subscribeSpyTo(component.doRace(a));
        await observerSpy.onComplete();
        expect(observerSpy.getFirstValue()).toEqual(expected);
      });
  });
});
