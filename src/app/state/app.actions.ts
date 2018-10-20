/* NgRx */
import { Action } from '@ngrx/store';

export enum AppActionTypes {
    ChangeFoo = '[App] Change Foo',
}

// Action Creators
export class ChangeFoo implements Action {
    readonly type = AppActionTypes.ChangeFoo;
    constructor(public payload: string) { }
}


export type AppAction =  ChangeFoo; 