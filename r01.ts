import { Observable, of } from "rxjs";

const obs:Observable<number> = of(10,20,30);
obs.subscribe(
    (x:number) => console.log(x),
    (error) => console.log('error -> ', error),
    () => console.log('fin')
);

