import { timer, interval, BehaviorSubject , startsWith } from "rxjs";

export const startTime = new BehaviorSubject(false);


export const percentageCorrect$ = interval(1000);
export const timeCorrect = new BehaviorSubject('10:10');

export default interval(1000);