import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderActions";

function Order(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCTS</th>
              <th>SHOP</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>SUB TOTAL</th>
              <th>TOTAL</th>

              <th>PAID</th>

              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.orderItems.map((items) => (
                    <tr key={items._id}>
                      <td>{items.name}</td>
                    </tr>
                  ))}
                </td>
                <td>
                  {order.orderItems.map((items) => (
                    <tr key={items._id}>
                      <td>{items.brand}</td>
                    </tr>
                  ))}
                </td>
                <td>
                  {order.shipping["address"]},{order.shipping["city"]},
                  {order.shipping["postalcode"]},{order.shipping["country"]}
                </td>
                <td>{order.createdAt}</td>
                <td>
                  {order.orderItems.map((items) => (
                    <tr key={items._id}>
                      <td>Rs.{items.price}</td>
                    </tr>
                  ))}
                </td>
                <td>Rs.{order.totalPrice}</td>

                <td>{order.isPaid.toString()}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => deleteHandler(order)}
                    className="button secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Order;
