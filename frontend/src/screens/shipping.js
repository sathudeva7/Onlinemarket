import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartAction";
import Checkoutsteps from "../components/checkoutsteps";
function Shipping(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalcode, country }));
    props.history.push("payment");
  };

  return (
    <div>
      <Checkoutsteps step1 step2></Checkoutsteps>

      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Delivery</h2>
            </li>

            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </li>

            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>

            <li>
              <label htmlFor="postalcode">Postal Code</label>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                onChange={(e) => setPostalcode(e.target.value)}
              ></input>
            </li>

            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default Shipping;
