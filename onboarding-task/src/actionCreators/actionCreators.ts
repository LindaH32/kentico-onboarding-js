import * as fetch from 'isomorphic-fetch';
import { SERVER_ROUTE, LIST_ITEM_ROUTE } from '../constants/routes';
import { addItemFactory } from './internal/addItemFactory';
import { createGuid } from '../utils/guidHelper';
import { deleteItemFactory } from './internal/deleteItemFactory';
import { putItemFactory } from './internal/putItemFactory';
import { fetchItemsFactory } from './internal/fetchItemsFactory';
import { postItemFactory } from './internal/postItemFactory';
import { checkStatus } from '../utils/checkStatus';
import {
  saveChangesToItem,
  removeItem,
  requestItems,
  succeedToFetchItems,
  succeedToPostItem,
  failToFetchItems,
  failToPostItems,
  succeedToDeleteItem,
  failToDeleteItems,
  failToPutItem,
  succeedToPutItem,
} from './internal/basicActionCreators';
import { IItemData } from '../models/IItem';

export {
  saveChangesToItem,
  cancelChangesToItem,
  removeItem,
  dismissError,
  enableEditItem,
} from './internal/basicActionCreators';

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

const deleteItemFactoryDependencies = {
  itemRemove: removeItem,
  success: succeedToDeleteItem,
  error: failToDeleteItems,
  deleteItem: (id: string) => fetch(SERVER_ROUTE + LIST_ITEM_ROUTE + '/' + id, {
    method: 'DELETE',
  }).then(response => checkStatus(response)),
};

const putItemFactoryDependencies = {
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
};

export const deleteItem = deleteItemFactory(deleteItemFactoryDependencies);

export const putItem = putItemFactory(putItemFactoryDependencies);

export const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

export const postItem = postItemFactory(postItemsFactoryDependencies);
