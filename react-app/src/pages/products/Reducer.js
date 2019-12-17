import { Get_ProductData } from "./AcctionType";

const ProductData = (state = [], action) => {
  switch (action.type) {
    case Get_ProductData: {
      let newState = action.data;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export { ProductData };
