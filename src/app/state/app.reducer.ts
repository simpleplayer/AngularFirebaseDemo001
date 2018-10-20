import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

// To access the global application state
import * as fromRoot from './app.state';
import { AppAction, AppActionTypes } from './app.actions';

// Extending the state interface for lazy loaded features
// Extend the global application state to include the item state
export interface State extends fromRoot.State {
    appState: AppState;
}

// The item state
export interface AppState {   
    foo: string;
}
// The item initial state
const initialState: AppState = {   
    foo: null
};

// The reducer
export function reducer(state: AppState = initialState, action: AppAction): AppState {

    switch (action.type) {
        case AppActionTypes.ChangeFoo:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                foo: action.payload
            };
       
        // The default case 
        default:
            return state;
    }
}

// Feature Selector
// 'app' is in the imports of app.module.ts :  StoreModule.forFeature('app', reducer),
const getAppFeatureState = createFeatureSelector<AppState>('app');

// Selectors
export const getFoo = createSelector(
    getAppFeatureState,
    state => state.foo
);
