import { Get_ProductData } from "./AcctionType";

const ProductData = (state = [], action) => {
  switch (action.type) {
    case Get_ProductData: {
      let newState = action.data;
      // newState.push(action.data);
      console.log(state);
      console.log(newState + "3");
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default ProductData;
