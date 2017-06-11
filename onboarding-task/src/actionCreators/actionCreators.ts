import * as fetch from 'isomorphic-fetch';
import {
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEMS_SUCCESS,
  POST_ITEMS_FAILURE,
  DISMISS_ERROR,
} from '../constants/actionTypes';
import { SERVER_ROUTE, LIST_ITEM_ROUTE } from '../constants/routes';
import { addItemFactory } from './addItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';
import { createGuid } from '../utils/guidHelper';
import { IAction } from './IAction';
import { postItemsFactory } from './postItemsFactory';

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
  type: FETCH_ITEMS_REQUEST,
  payload: {},
});

export const succeedToFetchItems = (json: object): IAction => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { items: json },
});

export const failToFetchItems = (error: Error): IAction => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { errorMessage: error.message || 'Items were not fetched' },
});

export const fetchItems = fetchItemsFactory({
  fetchBegin: requestItems,
  success: succeedToFetchItems,
  error: failToFetchItems,
  fetch: () => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE),
});

export const succeedToPostItems = (json: object, oldId: string): IAction => ({
  type: POST_ITEMS_SUCCESS,
  payload: { item: json, oldId },
});

export const failToPostItems = (error: Error): IAction => ({
  type: POST_ITEMS_FAILURE,
  payload: { errorMessage: error.message || 'Items were not posted' },
});

export const postItems = postItemsFactory({
  itemAdd: addItem,
  success: succeedToPostItems,
  error: failToPostItems,
  post: (body) => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  }),
});

export const dismissError = (itemId: string): IAction => ({
  type: DISMISS_ERROR,
  payload: { itemId },
});



