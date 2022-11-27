import {Component, OnInit} from '@angular/core';
import {delay, map, Observable, of, race} from 'rxjs';

@Component({
  selector: 'monorepo-nosh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  obs1$: Observable<number> = of(1, 2, 3);
  obs2$: Observable<number> = of(4, 5, 6);
  obs3$: Observable<number> = of(7, 8, 9);

  ngOnInit(): void {
    race([of('second').pipe(delay(200)), of('first').pipe(delay(300))]).subscribe(console.warn);
  }

  doSomething(obs$: Observable<number>): Observable<number> {
    return obs$.pipe(
      map((value) => value * 2)
    );
  }

  doRace<T>(observables$: Array<Observable<T>>): Observable<T> {
    return race(observables$);
  }
}
