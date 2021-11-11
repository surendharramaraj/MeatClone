let defaultState = {
  selectedItems: {
    items: [],
    shopId: null,
  },
};
let cartReducers = (state = defaultState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADD_TO_CART": {
      newState.selectedItems = {
        items: [...newState.selectedItems.items, action.payload.item],
        shopId: action.payload.shopId,
      };
      console.log(newState.selectedItems.items);
      return newState;
    }
    case "REMOVE_FROM_CART": {
      var arr = [...newState.selectedItems.items];
      if (arr.indexOf(action.payload.item) > -1) {
        arr.splice(arr.indexOf(action.payload.item), 1);
      }
      newState.selectedItems = { items: arr, shopId: action.payload.shopId };
      return newState;
    }
    case "DELETE_CART": {
      newState.selectedItems = {
        items: [],
        shopId: null,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default cartReducers;
