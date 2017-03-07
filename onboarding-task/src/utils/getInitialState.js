import Immutable from 'immutable';
import { generateGuid } from './generateGuid';
import { ItemRecord } from './itemRecord';

function getInitialState() {
  const firstItem = new ItemRecord({ guid: generateGuid(), text: 'serus' });
  const secondItem = new ItemRecord({ guid: generateGuid(), text: 'soj' });
  const thirdItem = new ItemRecord({ guid: generateGuid(), text: 'nazdar' });

  const initState = {
    itemsById: Immutable.Map({
      [firstItem.guid]: firstItem,
      [secondItem.guid]: secondItem,
      [thirdItem.guid]: thirdItem,
    }),
    itemsFlags: Immutable.Map({
      [firstItem.guid]: { isEdited: true },
      [secondItem.guid]: { isEdited: false },
      [thirdItem.guid]: { isEdited: false },
    }),
    itemsOrder: Immutable.List([firstItem.guid, secondItem.guid, thirdItem.guid]),
  };
  return initState;
}
export { getInitialState };
