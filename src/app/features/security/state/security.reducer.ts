import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
// Model
import { User } from '../model/user';
// To access the global application state
import * as fromRoot from '../../../state/app.state';
import { SecurityAction, SecurityActionTypes } from './security.actions';

// Extending the state interface for lazy loaded features
// Extend the global application state to include the item state
export interface State extends fromRoot.State {
    securityState: SecurityState;
}

// The  state
export interface SecurityState {
    // to indicate if user is authenticated (logged on/off)
    isAuthenticated: boolean;
    // to see if user is loading from db
    isLoading: boolean;
    // get user
    user: User;
    // Error
    error: string;
}
// The initial state
const initialState: SecurityState = {
    isAuthenticated: false,
    isLoading: false,
    user: <User>{},
    error: null
};

// The reducer
export function reducer(state: SecurityState = initialState, action: SecurityAction): SecurityState {

    switch (action.type) {

        // Is Authenticated
        case SecurityActionTypes.IsAuthenticated:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                isAuthenticated: action.payload
            };

        // Is loading
        case SecurityActionTypes.IsLoading:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                isLoading: action.payload
            };

        // set user
        case SecurityActionTypes.SetUser:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: null
            };

        // clear user
        case SecurityActionTypes.ClearUser:
            console.log('action.type ' + action.type);
            return {
                ...state,
                user: <User>{},
            };

        // The default case 
        default:
            return state;
    }
}

// Feature Selector
// 'security' is in the imports of security.module.ts :  StoreModule.forFeature('security', reducer),
const getSecurityFeatureState = createFeatureSelector<SecurityState>('security');

// Selectors

// isAuthenticated
// We make this null-check cause otherwise a problem in the authentication service
// We use the conditional (ternary) operator here
export const isAuthenticated = createSelector(
    getSecurityFeatureState,

    state => state ? state.isAuthenticated : null
);
// isLoading
export const isLoading = createSelector(
    getSecurityFeatureState,
    state => state.isLoading
);
// getUser
export const getUser = createSelector(
    getSecurityFeatureState,
    state => state.user
);
// getError
export const getError = createSelector(
    getSecurityFeatureState,
    state => state.error
);