// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { isEmpty } from "../../helper/Validation";
import { toast } from "react-toastify";
import { sentOrderIdReq } from "../../API/Api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";
const ConformOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==editUser || getUser?.[0]?.email == editUser))
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const [email, setEmail] = useState("");
  const [packageData, setPackageData] = useState("");
  const [packageTime, setPackageTime] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    sentOrderIdReq();
  }, []);
  const selectedPlanData = useSelector((state) => state.OrderList.conform);

  useEffect(() => {
    if (Array.isArray(selectedPlanData)) {
      const orderData = selectedPlanData.find((item) => item._id === id);
      if (orderData) {
        setEmail(orderData.email);
        setPackageData(orderData.packageName);
        setPackageTime(orderData.packageDuration);
        setName(orderData.userName);
      }
    } else {
      console.error("selectedPlanData is not an array:", selectedPlanData);
    }
  }, [selectedPlanData, id]);
  const plaName = useRef();
  const packageTimeV = useRef();
  const plaEmail = useRef();
  const sendData = async () => {
    try {
      if (isEmpty(packageTime)) {
        toast.error("package duration is Required");
      } else if (isEmpty(email)) {
        toast.error("email is Required");
      } else if (isEmpty(packageData)) {
        toast.error("package Name is Required");
      } else {
        const orderStatus = "Confirmed";
        const confirmData = { email, packageTime, packageData, orderStatus };
        // const result = await updateConfirmDataReq(confirmData);
        const result = true;
        if (result === true) {
          toast.success("Order Confirm successfully");
        } else {
          toast.error("Failed to Confirm Order. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Request failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Order Confirmation Page</h2>
        <p>
          You will confirm order as per user request. 1st choose Package Type
          and package dateline then confirm
        </p>
      </div>
      <div className="admin-price-plan pt-4">
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-4">
            <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control "
                ref={plaEmail}
                defaultValue={name}
              />
            </div>

            <div className="pt-4">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control "
                ref={plaEmail}
                defaultValue={email}
                readOnly
              />
            </div>

            <div className="pt-4">
              <label className="form-label">Package Type</label>
              <input
                type="text"
                className="form-control "
                ref={plaName}
                defaultValue={packageData}
                readOnly
              />
            </div>
            <div className="pt-4">
              <label className="form-label">Package Dateline</label>
              <input
                type="text"
                className="form-control "
                placeholder="email"
                ref={packageTimeV}
                defaultValue={packageTime}
                readOnly
              />
            </div>
            <div className="profile-save-button">
              <button onClick={sendData}>Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConformOrder;
