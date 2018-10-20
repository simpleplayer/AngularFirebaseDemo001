import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
// Model Item
import { Item } from '../model/item';
// To access the global application state
import * as fromRoot from '../../../state/app.state';
import { ItemAction, ItemActionTypes } from './item.actions';

// Extending the state interface for lazy loaded features
// Extend the global application state to include the item state
export interface State extends fromRoot.State {
    itemState: ItemState;
}

// The item state
export interface ItemState {
    // to see if item is loading from db
    isLoading: boolean;
    // entities
    //entities: { [id: string]: Item };
    // current item
    selectedItem: Item;
    // get item
    item: Item;
    // item list
    items: Item[];
    // Error
    error: string;
}
// The item initial state
const initialState: ItemState = {
    isLoading: false,
    selectedItem: <Item>{},
    item: <Item>{},
    //entities: {},
    items: [],
    error: null
};

// The reducer
export function reducer(state: ItemState = initialState, action: ItemAction): ItemState {

    switch (action.type) {
        case ItemActionTypes.IsLoading:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                isLoading: action.payload
            };
        case ItemActionTypes.SetSelectedItem:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                selectedItem: action.payload
            };
        case ItemActionTypes.ClearSelectedItem:
            console.log('action.type ' + action.type);
            return {
                ...state,
                selectedItem: {
                    id: '',
                    title: '',
                    description: ''
                }
            };
        case ItemActionTypes.ClearItem:
            console.log('action.type ' + action.type);
            return {
                ...state,
                item: {
                    id: '',
                    title: '',
                    description: ''
                }
            };
        case ItemActionTypes.SetItems:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                items: action.payload
            };
        // get all Items
        case ItemActionTypes.GetItems:
            console.log('action.type ' + action.type);
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case ItemActionTypes.GetItemsSuccess:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            // New TODO !!!!
            /*
            const entities = action.payload.reduce(
                (entities: { [id: string]: Item }, item: Item) => {
                    return {
                        ...entities,
                        [item.id]: item,
                    };
                },
                {
                    ...state.entities,
                }
            );
            */
            //console.log('entities ' , entities);
            return {
                ...state,
                //entities,
                items: action.payload,
                isLoading: false,
                error: null
            };
        case ItemActionTypes.GetItemsFail:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                items: [],
                isLoading: false,
                error: action.payload
            };
        // get Item
        case ItemActionTypes.GetItemSuccess:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                item: action.payload,
                isLoading: false,
                error: null
            };
        case ItemActionTypes.GetItemFail:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                item: null,
                isLoading: false,
                error: action.payload
            };
        // add Item   
        case ItemActionTypes.CreateItemSuccess:
            // Put the changes item in the array
            // The map() method creates a new array with the results of calling a provided function on 
            // every element in the calling array.
            // No items to be updated, will be done by firestore realtime update
            //const itemsTmp = state.items.map(item => action.payload.id === item.id ? action.payload : item);
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                //items:itemsTmp,
                error: null
            };
        case ItemActionTypes.CreateItemFail:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                error: action.payload
            };
        // update Item   
        case ItemActionTypes.UpdateItemSuccess:
            // Put the changes item in the array
            // The map() method creates a new array with the results of calling a provided function on 
            // every element in the calling array.
            // No items to be updated, will be done by firestore realtime update
            //const itemsTmp = state.items.map(item => action.payload.id === item.id ? action.payload : item);
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                //items:itemsTmp,
                error: null
            };
        case ItemActionTypes.UpdateItemFail:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                error: action.payload
            };
        // delete Item   
        case ItemActionTypes.DeleteItemSuccess:
            // Put the changes item in the array
            // The map() method creates a new array with the results of calling a provided function on 
            // every element in the calling array.   
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                error: null
            };
        case ItemActionTypes.DeleteItemFail:
            console.log('action.type ' + action.type + ' with action.payload ', action.payload);
            return {
                ...state,
                error: action.payload
            };
        // The default case 
        default:
            return state;
    }
}

// Feature Selector
// 'items' is in the imports of items.module.ts :  StoreModule.forFeature('items', reducer),
const getItemFeatureState = createFeatureSelector<ItemState>('items');

// Selectors
export const isLoading = createSelector(
    getItemFeatureState,
    state => state.isLoading
);
export const getSelectedItem = createSelector(
    getItemFeatureState,
    state => state.selectedItem
);
export const getItem = createSelector(
    getItemFeatureState,
    state => state.item
);
export const getItems = createSelector(
    getItemFeatureState,
    state => state.items
);
export const getError = createSelector(
    getItemFeatureState,
    state => state.error
);