import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import Checkoutsteps from '../components/checkoutsteps';
function Payment(props){
    const [payment, setPayment] = useState('');
    
    
    
     const dispatch = useDispatch();
     

     const submitHandler = (e) => {
         e.preventDefault();
         dispatch(savePayment(payment));
        props.history.push('placeorder')
     
        }
   

return <div>
     

       
         <Checkoutsteps step1 step2 step3></Checkoutsteps>
    
         <div className="form">
    <form onSubmit={submitHandler}>
        <ul className="form-container">
            <li>
                <h2>Payment</h2>
            </li>
            
            <li>
            <input type="radio" value="paypal" name="payment" id="payment" onChange={(e) => setPayment(e.target.value)}></input>

                <label htmlFor="payment">
                    Paypal
                </label>
            </li>

            
            <li>
                <button type="submit" className="button primary">Continue</button>
            </li>
           
            
        </ul>
    </form>
</div>
</div>
}
export default Payment;