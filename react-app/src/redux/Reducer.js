const CHANGE_INPUT = "changeInput";
const ADD_ITEM = "addItem";
const ADD_DEL = "addDel";
const GET_LIST = "getList";
const defaultState = {
  inputValue: "Write Something2",
  list: []
};
export default (state = defaultState, action) => {
  console.log(state, action);
  //reducer 只能接收state不能改變
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }

  if (action.type === ADD_DEL) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.i, 1);
    newState.inputValue = "";
    return newState;
  }

  if (action.type === GET_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    console.log(action);
    newState.list = action.list;

    // newState.inputValue = "";
    return newState;
  }
  return state;
};
//管理員
