import React, { useEffect, useState, useRef } from "react";
import { saveAffiliateReq, getAffiliateReq } from "../../API/Api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { affiliateImage } from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { editUser, editUser } from "../../constant/Form";

const AffiliateSetting = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==editUser || getUser?.[0]?.email == editUser))
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const withdrawalRef = useRef();
  const affiliateLinkRef = useRef();
  const percentageRef = useRef();
  const [Withdrawal, setWithdrawal] = useState();
  const [Percentage, setPercentage] = useState();
  const [AffiliateLink, setAffiliateLink] = useState();
  const AffiliateDemo = useSelector((state) => state.affiliateStor.List);
  useEffect(() => {
    getAffiliateReq().then(() => {
      setWithdrawal(AffiliateDemo?.Withdrawal || 0);
      setPercentage(AffiliateDemo?.Percentage || 0);
      setAffiliateLink(AffiliateDemo?.AffiliateLink || "");
    });
  }, [AffiliateDemo]);

  const handleSaveInfo = async () => {
    
    const Withdrawal = withdrawalRef.current.value;
    const AffiliateLink = affiliateLinkRef.current.value;
    const Percentage = percentageRef.current.value;

    try {
      if (!Withdrawal) {
        toast.error("Withdrawal amount is required");
        return;
      }
      if (!AffiliateLink) {
        toast.error("Affiliate link is required");
        return;
      }
      if (!Percentage) {
        toast.error("Percentage is required");
        return;
      }

      const AffiliateData = { Withdrawal, Percentage, AffiliateLink };
      const result = await saveAffiliateReq(AffiliateData);

      if (result) {
        toast.success("Data saved successfully");
        setWithdrawal(Withdrawal);
        setPercentage(Percentage);
        setAffiliateLink(AffiliateLink);
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving affiliate info:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="row mt-5 admin-price-plan">
      <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-5">
        <h2>Affiliate Setting</h2>
        <p style={{color:"red"}}>
        This section isn't activated yet. Please don't create any Listing yet! 
        </p>
        <div className="pt-4">
          <label className="form-label">Affiliate Minimum Withdrawal</label>
          <input
            id="withdrawal"
            className="form-control"
            type="text"
            placeholder="Enter Withdrawal amount"
            ref={withdrawalRef}
            defaultValue={Withdrawal}
          />
        </div>
        <div className="pt-4">
          <label className="form-label">
            Affiliate Commission Percentage (%)
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Affiliate rate only number"
            ref={percentageRef}
            defaultValue={Percentage}
          />
        </div>
        <div className="affiliate-setting-item pt-2">
          <label className="form-label">Affiliate Link</label>
          <input
            id="affiliate"
            className="form-control"
            type="text"
            placeholder="Enter Affiliate URL"
            ref={affiliateLinkRef}
            defaultValue={AffiliateLink}
          />
        </div>
        <div className="pt-5">
          <button
            onClick={handleSaveInfo}
            className="admin-plan-button pt-3 pb-3"
          >
            Save information
          </button>
        </div>
      </div>
      <div className="affiliate-img col-md-6">
        <img src={affiliateImage} alt="Affiliate" />
      </div>
    </div>
  );
};

export default AffiliateSetting;
