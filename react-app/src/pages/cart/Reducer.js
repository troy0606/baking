import { INSERT_carData } from "./AcctionType";
import { GET_carData } from "./AcctionType";
import { Del_cartData } from "./AcctionType";
import { INSERT_orderData } from "./AcctionType";
import { Del_orderData } from "./AcctionType";
import { Push_orderData } from "./AcctionType";

const CartData = (state = [], action) => {
  switch (action.type) {
    case GET_carData: {
      let newState = action.data;
      return newState;
    }
    case Del_cartData: {
      let newState = state.filter((v, index) => {
        return index != action.key;
      });
      console.log(action.key);
      console.log(newState);

      return newState;
    }
    case INSERT_carData: {
      let newState = action.data;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const OrderCart = (state = [], action) => {
  switch (action.type) {
    case INSERT_orderData: {
      let newState = action.data;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export { CartData, OrderCart };
