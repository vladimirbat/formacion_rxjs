import { Observable, Observer  } from "rxjs";
import { first } from 'rxjs/operators';

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

const emisorDeObservables2 = new EmisorDeObservables2();

setTimeout(()=>  {
    emisorDeObservables2.getObservable()
        .pipe(first())
        .subscribe(
            (x:number) => console.log('cliente a', x)
        );
},3000);

emisorDeObservables2.getObservable()
        .subscribe(
            (x:number) => console.log('cliente b:', x)
        );



