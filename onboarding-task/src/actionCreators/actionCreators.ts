import * as fetch from 'isomorphic-fetch';
import {
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
} from '../constants/actionTypes';
import { addItemFactory } from './addItemFactory';
import { createGuid } from '../utils/guidHelper';
import { IAction } from './IAction';

export const addItem = addItemFactory(createGuid);

export const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: { id },
});

export const enableEditItem = (id: string): IAction => ({
  type: ENABLE_EDIT_ITEM,
  payload: { id },
});

export const saveChangesToItem = (id: string, text: string): IAction => ({
  type: SAVE_CHANGES_TO_ITEM,
  payload: { id, text },
});

export const cancelChangesToItem = (id: string): IAction => ({
  type: CANCEL_CHANGES_TO_ITEM,
  payload: { id },
});

export const requestItems = (): IAction => ({
  type: REQUEST_ITEMS,
  payload: {},
});

export const receiveItems = (json: any): IAction => ({
  type: RECEIVE_ITEMS,
  payload: { items: json.data.children },
});

export const fetchItems = () => ((dispatch: Dispatch) => {
    dispatch(requestItems());

    return fetch('http://localhost:50458/api/v1/ListItems')
      .then(response => response.json())
      .then(json => dispatch(receiveItems(json)));
  }
);
