import { User } from '../model/user';

/* NgRx */
import { Action } from '@ngrx/store';

export enum SecurityActionTypes {
    IsAuthenticated = '[User] Toggle (true/false) if user is authenticated',
    IsLoading = '[User] Toggle (start/stop) loading of user profile',
    SetUser = '[User] Set User',
    ClearUser = '[User] Clear User',
}

// Action Creators
export class IsAuthenticated implements Action {
    readonly type = SecurityActionTypes.IsAuthenticated;
    constructor(public payload: boolean) { }
}
export class IsLoading implements Action {
    readonly type = SecurityActionTypes.IsLoading;
    constructor(public payload: boolean) { }
}

export class SetUser implements Action {
    readonly type = SecurityActionTypes.SetUser;
    constructor(public payload: User) { }
}
export class ClearUser implements Action {
    readonly type = SecurityActionTypes.ClearUser;

}
export type SecurityAction =
    IsAuthenticated
    | IsLoading
    | SetUser
    | ClearUser;
