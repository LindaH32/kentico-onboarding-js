import { OrderedSet, Map } from 'immutable';
import { IItemData } from '../../models/IItem';

export interface IListState {
  itemIds: OrderedSet<string>;
  items: Map<string, IItemData>;
  isFetching: boolean;
  isPosting: boolean;
  errors: Map<string, string>;
  errorIds: OrderedSet<string>;
}
