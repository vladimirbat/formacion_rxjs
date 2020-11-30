import { Observable, Observer, Subject, Subscriber,  } from "rxjs";
import { takeUntil, takeWhile } from "rxjs/operators";

class EmisorDeObservables2 {
    private observable:Observable<number> = new Observable((observer: Observer<number>)=>{ // Cold Observable
        console.log('----- Inicio del observable -----');
        let x = 0;
        const tmp = setInterval(()=>{
            x+=10;
            observer.next(x);
            if(x>=60){
                observer.complete();
                clearInterval(tmp);
            }
        },500);
    });
    public getObservable(): Observable<number> {
        return this.observable;
    }
}


const emisorDeObservables2 = new EmisorDeObservables2();
emisorDeObservables2.getObservable()
    .pipe(takeWhile((x:number)=> x<=30)) //Me suscribo hasta que se cierre el componente (cosa indicada por los eventos del fin$ ).
    .subscribe(
        (x:number) => console.log(x),
        (error) => console.log('error -> ', error),
        () => console.log('fin')
    );



