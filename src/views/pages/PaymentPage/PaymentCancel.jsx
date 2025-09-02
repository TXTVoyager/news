// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
const PaymentCancel = ({res}) => {
  useEffect(() => {
    console.log("Payment cancel component mounted",res);
  }, []);
  return (
    <>
      <h1 className="text-danger">Payment Not Successful! Payment cancelled!</h1>
      <h1 className="text-info">Please try again...</h1>
    </>
  );
};

export default PaymentCancel;
