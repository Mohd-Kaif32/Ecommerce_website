

import React from 'react'
import "./payment.css";
import { useHistory } from 'react-router-dom';


const Payment = () => {

  const history = useHistory();

  const HandleClick = () => {
    history.push('/products'); // Make sure "/home" is a valid route
  };
  return (
    <div className="payment-container">
      <h1>Payment Completed!!!</h1>
      <button onClick={HandleClick}>Products</button>
    </div>
  )
}

export default Payment

