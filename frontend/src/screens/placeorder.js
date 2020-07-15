import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import Checkoutsteps from '../components/checkoutsteps';

function Placeorder(props){

    const cart = useSelector(state => state.cart);

    const {cartItems,shipping,payment} = cart;
    if(!shipping){
        props.history.push("/shipping");
    }
    if(!payment){
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a,c) => a+c.price*c.qty,0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 *itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    const dispatch = useDispatch();
   
    const placeorderHandler = () => {
        //create an order
    }

    useEffect(() => {
        
    },[])

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return <div>
        <Checkoutsteps step1 step2 step3 step4 ></Checkoutsteps>
   
    <div className="placeorder">
        <div className="placeorder-info">
            <div>
                <h3>
                    Shipping
                </h3>
                <div>
                    {cart.shipping.address},{cart.shipping.city},
                    {cart.shipping.postalcode},{cart.shipping.country},
                </div>
            </div>

            <div>
                <h3>
                    Payment
                </h3>
                <div>
                    Payment Method: {cart.payment.paymentMethod}
                    
                </div>
            </div>
            <div>

            <ul className="cart-list-container">
               <li>
                   <h3>
                       Shopping Cart
                   </h3>
                   <div>
                       Price
                   </div>
                   </li> 
                   {
                       cartItems.length ===0 ?
                       <div>
                           Cart is empty
                       </div>
                       :
                       cartItems.map( item =>
                        <li>
                        <div className="cart-image">
                            <img src={item.image} alt="product" />
                            <div className="cart-name">
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    Qty:
                                   {item.qty}
                                </div>
                            </div>
                             <div className="cart-price">
                                ${item.price}
                            </div>
                        </div>
                        </li>
                        )
                   }
            </ul>

            </div>
           
        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                    <button className="button primary full-width" onClick={placeorderHandler}>PlaceOrder</button>
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice}</div>
                </li>
            </ul>
            <h3>
                Subtotal ( {cartItems.reduce((a,c) => a + c.qty, 0)} items)
                :
            $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h3>
           
        </div>
        </div>
        </div>
    
}
export default Placeorder;