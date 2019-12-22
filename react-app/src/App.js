import React, { BrowserRouter, useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  Member,
  Products,
  Teacher,
  Forum,
  MemberLogIn_SignUp,
  Navigation,
  Cart
} from "./routes/Rotues";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { useDispatch } from "react-redux";
import { LOG_IN_ACTION } from "./pages/member/Actions";

function App() {
  const [orderCart, setOrderCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/member/checklogin", {
        withCredentials: true
      })
      .then(result => {
        console.log(result);
        if (result.data.status === "202") {
          return result.data.data;
        }
      })
      .then(result => {
        dispatch(LOG_IN_ACTION());
        console.log(result);
      })
      .catch();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router history={BrowserRouter}>
          <NavBar />
          <Switch>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/" exact component={Navigation}></Route>
            <Route
              path="/member/signup_Login"
              exact
              component={MemberLogIn_SignUp}
            ></Route>
            <Route path="/member/:page?" exact component={Member}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/teacher" exact component={Teacher}></Route>
            <Route path="/forum" exact component={Forum}></Route>
            <Route
              path="/cart"
              exact
              component={() => <Cart orderCart={orderCart} />}
            ></Route>
            <Route path="" component={() => 404} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </>
  );
}

export default App;
