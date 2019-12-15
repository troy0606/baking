import { Get_ProductData } from "./AcctionType";

export const getListAction = data => ({
  type: Get_ProductData,
  data
});

export const GetProductData = postData => {
  console.log(postData);
  return dispatch => {
    fetch("http://localhost:5000/product", {
      method: "POST", // or 'PUT'
      body: postData ? JSON.stringify({ product_category: postData }) : null, // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => {
        const data = response.data;
        const action = getListAction(data);
        console.log(action.type + "2");
        dispatch(action);
        console.log("Success:", data);
      })
      .catch(error => console.error("Error:", error));
  };
};
