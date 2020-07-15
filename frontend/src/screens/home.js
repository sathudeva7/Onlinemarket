import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';
function Home(props){

  const productList = useSelector(state => state.productList);
  const { products, loading,error} = productList;
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(listProducts());
    return () => {
      
    };
  }, [])
    return loading ? <div>Loading..</div>: 
    error ? <div>{error}</div>:
    (
    <div>

<ul className="products">
              {
                products.map(product => 
                  <li key={product._id}>
                <div className="product">
                  <img className="product-image" src={product.image}>

                  </img>
                  <div className="product">
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                  </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">Rs.{product.price}</div>
                    <div className="product-rating">{product.star} </div>
                  </div>
                </div>
              </li>
                )
              }
            </ul>



    </div>
    )
}
export default Home;