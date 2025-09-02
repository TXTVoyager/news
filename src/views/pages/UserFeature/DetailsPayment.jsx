import React, { useEffect } from "react";
import NavBar from "../../../components/Navbar";
import confetti from "canvas-confetti";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DetailsPayment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userStripeData = useSelector((state) => state.profile.userStripeData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stripeData = await getPaymentStipeData();
        dispatch({ type: "SET_STRIPE_DATA", payload: stripeData });
      } catch (error) {
        console.error("Error fetching Stripe data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const animationDuration = 7000;
    const count = 200;
    const fire = (particleRatio, opts) => {
      confetti({
        particleCount: Math.floor(count * particleRatio),
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const timer = setTimeout(() => {
      confetti.reset();
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="container user-payment-details-css">
        <div className="row justify-content-md-center">
          <div className="col-md-12 col-xl-8 col-xxl-8 user-payment-css">
            <h2>Payment Details</h2>
            {userStripeData && userStripeData.length > 0 ? (
              <div className="">
                {userStripeData.map((item) => {
                  if (item._id === id || item.email === email) {
                    return (
                      <div key={item._id}>
                        <h2>
                          Name:<strong> {item.userName}</strong>
                        </h2>
                        <h2>
                          Package Name:<strong> {item.packageName}</strong>
                        </h2>
                        <h2>Package Duration: {item.packageDuration}</h2>

                        <h2>Payment Status: {item.paymentStatus}</h2>
                        <h2>Email: {item.email}</h2>
                        <h2>${item.paymentPrice}</h2>
                        <span
                          className="payment-icon"
                          dangerouslySetInnerHTML={{ __html: item.stripeIcon }}
                        />

                        <div className="payment-method">
                          <h2> {item.paymentMethod}</h2>
                        </div>

                        <p>
                          {new Date(item.createDate).toLocaleString("en-US", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <div>
                          <button className="button">View More</button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <h2>Thank you for Payment</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPayment;
