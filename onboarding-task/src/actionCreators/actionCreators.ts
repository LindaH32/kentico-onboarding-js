import * as fetch from 'isomorphic-fetch';
import {
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  PUT_ITEM_SUCCESS,
  PUT_ITEM_FAILURE,
} from '../constants/actionTypes';
import { SERVER_ROUTE, LIST_ITEM_ROUTE } from '../constants/routes';
import { addItemFactory } from './internal/addItemFactory';
import { createGuid } from '../utils/guidHelper';
import { IAction } from './IAction';
import { deleteItemFactory } from './deleteItemFactory';
import { putItemFactory } from './putItemFactory';
import { fetchItemsFactory } from './internal/fetchItemsFactory';
import { postItemFactory } from './internal/postItemFactory';
import { checkStatus } from '../utils/checkStatus';
import { saveChangesToItem, removeItem, requestItems, succeedToFetchItems, succeedToPostItem, failToFetchItems, failToPostItems  } from './internal/basicActionCreators';
import { IItemData } from '../models/IItem';

export { saveChangesToItem, cancelChangesToItem, removeItem, dismissError, enableEditItem  } from './internal/basicActionCreators';

export const addItem = addItemFactory(createGuid);

const fetchItemsFactoryDependencies = {
  fetchBegin: requestItems,
  success: succeedToFetchItems,
  error: failToFetchItems,
  fetch: () => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE)
    .then(response => checkStatus(response)),
  idGenerator: createGuid,
};

const postItemsFactoryDependencies = {
  itemAdd: addItem,
  success: succeedToPostItem,
  error: failToPostItems,
  post: (body: IItemData) => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  }).then(response => checkStatus(response)),
};

export const succeedToDeleteItem = (json: object): IAction => ({
  type: DELETE_ITEM_SUCCESS,
  payload: { item: json },
});

export const failToDeleteItems = (id: string, error: Error): IAction => ({
  type: DELETE_ITEM_FAILURE,
  payload: {id, errorMessage: error.message || ('The item with the id ' + id + ' was not deleted')},
});

export const deleteItem = deleteItemFactory({
  itemRemove: removeItem,
  success: succeedToDeleteItem,
  error: failToDeleteItems,
  deleteItem: (id: string) => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE + '/' + id, {
    method: 'DELETE',
  }).then(response => checkStatus(response)),
});

export const succeedToPutItem = (json: object): IAction => ({
  type: PUT_ITEM_SUCCESS,
  payload: { item: json },
});

export const failToPutItem = (id: string, error: Error): IAction => ({
  type: PUT_ITEM_FAILURE,
  payload: {id, errorMessage: error.message || ('The item with the id ' + id + ' was not updated')},
});

export const putItem = putItemFactory({
  itemUpdate: saveChangesToItem,
  success: succeedToPutItem,
  error: failToPutItem,
  put: (id: string, text: string) => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE, {
    method: 'PUT',
    body: JSON.stringify({ id: id, text: text }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  }).then(response => checkStatus(response)),
});

export const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

export const postItem = postItemFactory(postItemsFactoryDependencies);
