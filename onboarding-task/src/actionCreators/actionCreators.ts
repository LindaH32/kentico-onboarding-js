import * as fetch from 'isomorphic-fetch';
import { SERVER_ROUTE, LIST_ITEM_ROUTE } from '../constants/routes';
import { addItemFactory } from './internal/addItemFactory';
import { fetchItemsFactory } from './internal/fetchItemsFactory';
import { createGuid } from '../utils/guidHelper';
import { postItemFactory } from './internal/postItemFactory';
import { checkStatus } from '../utils/checkStatus';
import { requestItems, succeedToFetchItems, succeedToPostItem, failToFetchItems, failToPostItems  } from './internal/basicActionCreators';
import { IItemData } from '../models/IItem';

export { saveChangesToItem, cancelChangesToItem, deleteItem, dismissError, enableEditItem  } from './internal/basicActionCreators';

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

export const fetchItems = fetchItemsFactory(fetchItemsFactoryDependencies);

export const postItem = postItemFactory(postItemsFactoryDependencies);
