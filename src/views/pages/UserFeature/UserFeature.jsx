import React, { useEffect, useRef } from "react";
import {
  updateOrderItemReq
} from "../../../API/Api";
import { useSelector, useDispatch } from "react-redux";
import confetti from "canvas-confetti";
import { Link, useParams, useLocation } from "react-router-dom";
import { getToken } from "../../../helper/Session";
import { useNavigate } from "react-router-dom";
import { FaBitcoin, FaCross, FaCrosshairs, FaEthereum, FaSkullCrossbones, FaTimes } from "react-icons/fa";
import { DeleteAlert } from "../../../helper/PopupAlert";
import { FaMedal } from "react-icons/fa6";

const UserFeature = () => {
  const dispatch = useDispatch();
  const userStripeData = useSelector((state) => state.OrderList.order);
  const emailProfile = useSelector((state) => state.profile.userData?.[0]?.email);
  const tableRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const msg = queryParams.get("msg");
  const navigate = useNavigate();


  useEffect(() => {
    getOrderListReq(1, 10, emailProfile);
    console.log(userStripeData,emailProfile);
  }, []);

  useEffect(() => {
    const isLoggedIn = getToken();
    if (!isLoggedIn) { navigate(`/login/item?msg=${msg}`) }
  }, [msg]);


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
  }, [userStripeData]);

  useEffect(() => {
    // Function to animate horizontal scrolling
    const scrollHorizontally = (element, amount, duration) => {
      const start = element.scrollLeft;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        element.scrollLeft = start + amount * progress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    if (window.innerWidth >= 1200 && tableRef.current) {
      scrollHorizontally(tableRef.current, 200, 2000);
    }
  }, [userStripeData]);

  const cancelCOrder = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      console.log("cancellation request");
      const data = {
        orderId: id,
        orderStatus: "CANCELLED",
      }
      const DeleteResult = await updateOrderItemReq(data);
      if (DeleteResult) {
        await getOrderListReq(1, 10, emailProfile);
      }
    }
  }

  return (
    <>
      <div className="container user-payment-details-css">
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-10 user-payment-css">
            <h2>My Purchases</h2>
            {userStripeData && userStripeData.length > 0 ? (
              <div className="table-responsive" ref={tableRef}>
                <table className="table table-data">
                  <thead className="thead-css">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Email</th>
                      <th scope="col"> Product </th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Order Status</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Assets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userStripeData.map((item) => (
                      <tr key={item.orderId} style={item.productType=="Donation"?{backgroundColor:" #fdedec"}:null}>
                        <td>
                          <p>
                            <strong>{item.orderId}</strong><br/>
                            {item.productType=="Donation"?(<><FaMedal/> Thanks for your DONATION</>):null}
                          </p>
                        </td>
                        <td>
                          <p>{item.email}</p>
                        </td>

                        <td>
                          <p>{item.productInfo}</p>
                        </td>
                        <td>
                          <p>{item.productCurrency + ""}{item.orderAmount}</p>
                        </td>
                        <td className="text-center payment-status">
                          <p className={item.paymentStatus == "PAYMENT SUCCESS" ? "" : "bg-danger"}> {item.paymentStatus}</p>
                        </td>
                        <td className="text-center payment-status">
                          <p className={item.orderStatus == "CANCELLED" ? "bg-danger" : "bg-info"}> {item.orderStatus}</p>
                        </td>

                        <td>
                          <p>
                            {new Date(item.createDate).toLocaleString("en-US", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </td>
                        <td>
                          {item.paymentType != "FIAT" ? (<>
                            {item?.transactionDetailsObject?.name == "BTC" ? (<FaBitcoin />) :
                              item?.transactionDetailsObject?.name == "ETH" ? (<FaEthereum />) :
                                "Crypto"}
                            {" " + item?.transactionDetailsObject?.name}
                            {item.orderStatus != "CANCELLED" && <p onClick={()=>cancelCOrder(item.orderId)} className="text-danger"><FaTimes />cancel</p>}
                            </>
                          ) : item.productCurrency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default UserFeature;
