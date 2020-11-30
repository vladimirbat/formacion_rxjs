import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";

class EmisorDeObservables {
    private subject:Subject<number> = new Subject<number>(); // Hot Observable
    constructor() {
        console.log('----- Inicio del observable -----');
        let x = 0;
        const tmp = setInterval(()=>{
            x+=10;
            this.subject.next(x);
            if(x>=60){
                this.subject.complete();
                clearInterval(tmp);
            }
        },1000);
    }
    public getObservable(): Observable<number> {
        return this.subject;
    }
}

const emisorDeObservables = new EmisorDeObservables();

setTimeout(()=>  {
    const subscription:Subscription = emisorDeObservables.getObservable().subscribe(
        (x:number) => console.log(x),//Next
        (error) => console.log('error -> ', error),//Error
        () => { // Complete
            console.log('fin');
            subscription.unsubscribe();
        }
    );
},3000);



