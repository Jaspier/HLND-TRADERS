import { JOIN_ITEM, JOIN_CANCEL } from '../constants/joinConstants';

export const joinReducer = (state = { joinItems: [] }, action) => {
  switch (action.type) {
    case JOIN_ITEM:
      const item = action.payload;

      const existItem = state.joinItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          joinItems: state.joinItems.map(x =>
            x.product === existItem.product ? state.joinItems.pop() : x
          ),
        };
      }

      return {
        ...state,
        joinItems: [...state.joinItems, item],
      };
    case JOIN_CANCEL:
      return {
        ...state,
        joinItems: state.joinItems.filter(x => x.product !== action.payload),
      };
    default:
      return state;
  }
};
