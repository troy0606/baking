import React, { BrowserRouter } from "react";
import { Home, Member, Products, Teacher } from "./routes/Rotues";
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
function App() {
  return (
    <>
      <Provider store={store}>
        <Router history={BrowserRouter}>
          <NavBar />
          <Switch>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/member" exact component={Member}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/teacher" exact component={Teacher}></Route>
            <Route path="" component={() => 404} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </>
  );
}

export default App;
