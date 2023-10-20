import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({ subTotal, handleCheckOut }) => {
  const tokenHandler = async (token) => {
    console.log(token);

    // Call the handleCheckOut function from Cart.js
    await handleCheckOut();
  };

  return (
    <StripeCheckout
      amount={subTotal * 100}
      shippingAddress
      token={tokenHandler}
      stripeKey='pk_test_51O3A9GSAMJcz1OdQHzcMQPkIwpaOMsdfSp7ZLKlyHiLXIrixFJF7iOFeTIc6GVo3alXhnU2QTJAp8AM9AW0cDqdl00tsNS9YEj'
      currency='INR'
      name="SliceMate"
      description={`Total Amount: ${subTotal} INR`} // Add this line
    >
      <button className='btn bg-success mt-5'>Pay {subTotal} INR</button>
    </StripeCheckout>
  );
};

export default Checkout;
