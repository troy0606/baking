import { combineReducers } from "redux";
import { MemberLogState } from "../pages/member/Reducer";
import ProductData from "../pages/products/Reducer";
export default combineReducers({
  MemberLogState: MemberLogState,
  ProductData: ProductData
});
