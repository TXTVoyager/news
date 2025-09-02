// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
const PaymentSuccess = () => {
  useEffect(() => {
    console.log("Payment success component mounted");
  }, []);

  return (
    <>
      <h1 className="text-success">Payment Success! Thank You</h1>
    </>
  );
};

export default PaymentSuccess;
