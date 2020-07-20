import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch, BrowserRouter,Link } from "react-router-dom";


import Cart from "./screens/cart";
import Home from "./screens/home";
import Product from "./screens/product";
import Signin from "./screens/signup";
import { useSelector } from "react-redux";
import Register from "./screens/register";
import Products from "./screens/products";
import Shipping from "./screens/shipping";
import Payment from "./screens/payment";
import Placeorder from "./screens/placeorder";


function App() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

    return (
      <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu} >&#9776;</button>
            <Link to="/">Online Super Market</Link>
          </div> 
          <div className="header-links">
           
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to ="/signin">Signin</Link>
           }
           {
              userInfo ? <Link to="/products">Add Products</Link> : <Link to ="/signin">Admin</Link> 
           }
           
           
            
          </div> 
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Food</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={Product} />
            <Route path="/signin" component={Signin} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={Placeorder} />
            <Route path="/products" component={Products} />
            <Route path="/register" component={Register} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/" exact={true} component={Home} />
            
          </div>
        </main>
        <footer className="footer">
          CO 328
        </footer>
      </div>

      </BrowserRouter>
      
  
      
    );
  }

export default App;