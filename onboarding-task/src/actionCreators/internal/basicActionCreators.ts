import {
  DELETE_ITEM,
  ENABLE_EDIT_ITEM,
  SAVE_CHANGES_TO_ITEM,
  CANCEL_CHANGES_TO_ITEM,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  POST_ITEM_SUCCESS,
  POST_ITEM_FAILURE,
  DISMISS_ERROR,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  PUT_ITEM_FAILURE,
  PUT_ITEM_SUCCESS,
} from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const removeItem = (id: string): IAction => ({
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

export const failToFetchItems = (id: string, error: Error): IAction => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { id, errorMessage: error.message || 'Items were not fetched' },
});

export const succeedToPostItem = (json: object, oldId: string): IAction => ({
  type: POST_ITEM_SUCCESS,
  payload: { item: json, oldId },
});

export const failToPostItems = (id: string, error: Error): IAction => ({
  type: POST_ITEM_FAILURE,
  payload: {id, errorMessage: error.message || 'Items were not posted' },
});

export const dismissError = (id: string): IAction => ({
  type: DISMISS_ERROR,
  payload: { id },
});

export const succeedToDeleteItem = (json: object): IAction => ({
  type: DELETE_ITEM_SUCCESS,
  payload: { item: json },
});

export const failToDeleteItems = (id: string, error: Error): IAction => ({
  type: DELETE_ITEM_FAILURE,
  payload: {id, errorMessage: error.message || ('The item with the id ' + id + ' was not deleted')},
});

export const succeedToPutItem = (json: object): IAction => ({
  type: PUT_ITEM_SUCCESS,
  payload: { item: json },
});

export const failToPutItem = (id: string, error: Error): IAction => ({
  type: PUT_ITEM_FAILURE,
  payload: {id, errorMessage: error.message || ('The item with the id ' + id + ' was not updated')},
});
