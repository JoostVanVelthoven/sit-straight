import { interval, BehaviorSubject  }  from "rxjs";
import { scan , map, filter , withLatestFrom, startWith , throttleTime} from 'rxjs/operators';

const secondsToHuman = (s) => (s-(s%=60))/60+(9<s?':':':0')+s;

export const isCorrectPosition$ = new BehaviorSubject(false); 
export const time$ = interval(1000);
export const timeCorrectCounter$ = time$.pipe(
     withLatestFrom(isCorrectPosition$),
     filter(([_,isActive]) => !!isActive),
     scan((acc, val) => acc +1 , 0)
     ); 


export const percentageCorrect$ = time$.pipe(
    withLatestFrom(timeCorrectCounter$),
    filter(([totalSeconds, correctSeconds]) => totalSeconds > 0 && correctSeconds > 0),
    map(([totalSeconds, correctSeconds]) => Math.min(Math.round((100 * correctSeconds) / totalSeconds),100)),
    map(v => v + ' %'),
    throttleTime(10000),
    startWith(undefined)
);
export const timeCorrect$ = timeCorrectCounter$.pipe(map(seconds => secondsToHuman(seconds)));
