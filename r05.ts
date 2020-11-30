import { Observable, Observer, Subject, Subscriber,  } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
        },1000);
    });
    public getObservable(): Observable<number> {
        return this.observable;
    }
}

// Constructor del componente creamos el observable de fin.
const fin$: Subject<void> = new Subject();

// simulamos que el componente se termina al cabo de 3 segundos
setTimeout(()=>  {
    // esto lo pondríamos en el onDestroy del componente
    fin$.next();
},3000);

const emisorDeObservables2 = new EmisorDeObservables2();
emisorDeObservables2.getObservable()
    .pipe(takeUntil(fin$)) //Me suscribo hasta que se cierre el componente (cosa indicada por los eventos del fin$ ).
    .subscribe(
        (x:number) => console.log(x),
        (error) => console.log('error -> ', error),
        () => console.log('fin')
    );



