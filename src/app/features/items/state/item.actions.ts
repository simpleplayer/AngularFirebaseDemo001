import { Item } from '../model/item';

/* NgRx */
import { Action } from '@ngrx/store';

export enum ItemActionTypes {
    IsLoading = '[Item] Toggle (start/stop) loading of items',
    SetSelectedItem = '[Item] Set selected Item',
    SetItems = '[Item] Set Item List',
    ClearItem = '[Item] Clear Item',
    ClearSelectedItem = '[Item] Clear selected Item',
    GetItems = '[Item] Get Items',
    GetItemsSuccess = '[Item] Get Items Success',
    GetItemsFail = '[Item] Get Items Fail',
    GetItem = '[Item] Get Item',
    GetItemSuccess = '[Item] Get Item Success',
    GetItemFail = '[Item] Get Item Fail',
    UpdateItem = '[Item] Update Item',
    UpdateItemSuccess = '[Item] Update Item Success',
    UpdateItemFail = '[Item] Update Item Fail',
    CreateItem = '[Item] Create Item',
    CreateItemSuccess = '[Item] Create Item Success',
    CreateItemFail = '[Item] Create Item Fail',
    DeleteItem = '[Item] Delete Item',
    DeleteItemSuccess = '[Item] Delete Item Success',
    DeleteItemFail = '[Item] Delete Item Fail'
}

// Action Creators
export class IsLoading implements Action {
    readonly type = ItemActionTypes.IsLoading;
    constructor(public payload: boolean) { }
}

export class SetSelectedItem implements Action {
    readonly type = ItemActionTypes.SetSelectedItem;
    constructor(public payload: Item) { }
}

export class ClearItem implements Action {
    readonly type = ItemActionTypes.ClearItem;
}

export class ClearSelectedItem implements Action {
    readonly type = ItemActionTypes.ClearSelectedItem;
}
export class SetItems implements Action {
    readonly type = ItemActionTypes.SetItems;
    constructor(public payload: Item[]) { }
}

export class GetItems implements Action {
    readonly type = ItemActionTypes.GetItems;
}

export class GetItemsSuccess implements Action {
    readonly type = ItemActionTypes.GetItemsSuccess;

    constructor(public payload: Item[]) { }
}

export class GetItemsFail implements Action {
    readonly type = ItemActionTypes.GetItemsFail;

    constructor(public payload: string) { }
}
export class GetItem implements Action {
    readonly type = ItemActionTypes.GetItem;
    constructor(public payload: Item) { }
}

export class GetItemSuccess implements Action {
    readonly type = ItemActionTypes.GetItemSuccess;

    constructor(public payload: Item) { }
}

export class GetItemFail implements Action {
    readonly type = ItemActionTypes.GetItemFail;

    constructor(public payload: string) { }
}
export class UpdateItem implements Action {
    readonly type = ItemActionTypes.UpdateItem;

    constructor(public payload: Item) { }
}

export class UpdateItemSuccess implements Action {
    readonly type = ItemActionTypes.UpdateItemSuccess;

    constructor(public payload: Item) { }
}

export class UpdateItemFail implements Action {
    readonly type = ItemActionTypes.UpdateItemFail;

    constructor(public payload: string) { }
}

export class CreateItem implements Action {
    readonly type = ItemActionTypes.CreateItem;

    constructor(public payload: Item) { }
}

export class CreateItemSuccess implements Action {
    readonly type = ItemActionTypes.CreateItemSuccess;

    constructor(public payload: Item) { }
}

export class CreateItemFail implements Action {
    readonly type = ItemActionTypes.CreateItemFail;

    constructor(public payload: string) { }
}

export class DeleteItem implements Action {
    readonly type = ItemActionTypes.DeleteItem;

    constructor(public payload: Item) { }
}

export class DeleteItemSuccess implements Action {
    readonly type = ItemActionTypes.DeleteItemSuccess;

    constructor(public payload: Item) { }
}

export class DeleteItemFail implements Action {
    readonly type = ItemActionTypes.DeleteItemFail;

    constructor(public payload: string) { }
}
export type ItemAction =
    IsLoading
    | SetSelectedItem
    | ClearSelectedItem
    | ClearItem
    | SetItems
    | GetItems
    | GetItemsSuccess
    | GetItemsFail
    | GetItem
    | GetItemSuccess
    | GetItemFail
    | UpdateItem
    | UpdateItemSuccess
    | UpdateItemFail
    | CreateItem
    | CreateItemSuccess
    | CreateItemFail
    | DeleteItem
    | DeleteItemSuccess
    | DeleteItemFail; 