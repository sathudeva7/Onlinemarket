import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Link,
} from "react-router-dom";

import Cart from "./screens/cart";
import Home from "./screens/home";
import Product from "./screens/product";
import Signin from "./screens/signup";
import adminSignin from "./screens/signinadmin";
import { useSelector } from "react-redux";
import Register from "./screens/register";
import Registeradmin from "./screens/registeradmin";
import Products from "./screens/products";
import Shipping from "./screens/shipping";
import Payment from "./screens/payment";
import Order from "./screens/order";
import Placeorder from "./screens/placeorder";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileAdmin from "./screens/Profileadmin";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const adminSignup = useSelector((state) => state.adminSignup);
  const { adminInfo } = adminSignup;
  const openMenu = () => {
    if (adminInfo) {
      document.querySelector(".sidebar").classList.add("open");
    }
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Online Super Market</Link>
          </div>
          <div className="header-links">
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Customer Login</Link>
            )}
            {adminInfo ? (
              <Link to="/profileadmin">{adminInfo.name}</Link>
            ) : (
              <Link to="/signinadmin">Store Login</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              {adminInfo ? (
                <Link to="/products">Add Products</Link>
              ) : (
                <Link to="/signinadmin">Store Login</Link>
              )}
            </li>
            <li>
              <Link to="/order">Orders</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={Product} />
            <Route path="/signin" component={Signin} />
            <Route path="/signinadmin" component={adminSignin} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/profileadmin" component={ProfileAdmin} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={Placeorder} />
            <Route path="/order" component={Order} />
            <Route path="/products" component={Products} />
            <Route path="/register" component={Register} />
            <Route path="/registeradmin" component={Registeradmin} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/" exact={true} component={Home} />
          </div>
        </main>
        <footer className="footer">CO 328</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
