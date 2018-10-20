export interface ItemDoc {
  title: string;
  description: string;
}

export interface Item extends ItemDoc {
  id: string;
}

export interface ItemDictionary {
  [id: string]: Item;
}

// Constants

// Enum 
export enum ItemDetailActions {
  ACTION_UPDATE,
  ACTION_CREATE
}

// Enum 
export enum ItemDetailAnswers {
  ANSWER_OK,
  ANSWER_CANCEL
}