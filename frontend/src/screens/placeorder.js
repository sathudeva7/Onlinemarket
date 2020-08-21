import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Checkoutsteps from "../components/checkoutsteps";
import { createOrder } from "../actions/orderActions";

function Placeorder(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  }
  if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push("/");
    }
  }, [success]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div>
      <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Delivery</h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalcode},{cart.shipping.country},
            </div>
          </div>

          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                      <div className="cart-name">
                        <div>{item.name}</div>
                        <div>
                          Qty:
                          {item.qty}
                        </div>
                        <div>{item.brand}</div>
                      </div>
                      <div className="cart-price">Rs.{item.price}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}
              >
                PlaceOrder
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>Rs.{itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>Rs.{shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>Rs.{taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>Rs.{totalPrice}</div>
            </li>
          </ul>
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs.{" "}
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Placeorder;
