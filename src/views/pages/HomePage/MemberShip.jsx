/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { getToken } from "../../../helper/Session";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import PropTypes from "prop-types";
import NavBar3 from "../../../components/Navbar3";
import {
  packageList,
  orderPackageReq,
  getAllAssistantUserReq,
  stripeReq,
} from "../../../API/Api";
import NavBar from "../../../components/Navbar";

const token = getToken();
const PlanItem = ({ plan,key,setSelectedPlanId }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (!token) {
      navigate("/login/item");
    }
    setSelectedPlanId(key);
  };

  const [selectedTagLabels, setSelectedTagLabels] = useState([]);
  const [selectedTagPremiumAssistant, setSelectedTagPremiumAssistant] =
    useState([]);

  useEffect(() => {
    stripeReq();
  }, []);

  useEffect(() => {
    if (plan && plan.selectedVIP && plan.selectedVIP.length > 0) {
      const iconsAndNames = plan.selectedVIP.map((tag) => ({
        icon: tag.assistantIcon,
        name: tag.assistantName,
      }));
      setSelectedTagLabels(iconsAndNames);
    }
  }, [plan]);

  useEffect(() => {
    if (plan && plan.selectedPremium && plan.selectedPremium.length > 0) {
      const iconsAndNames = plan.selectedPremium.map((tag) => ({
        icon: tag.assistantIcon,
        name: tag.assistantName,
      }));
      setSelectedTagPremiumAssistant(iconsAndNames);
    }
  }, [plan]);

  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 price-item">
      <div className="price-element">
        <div className="price-header-section">
          <h5>{plan.packageType} plan</h5>
          <h1>
            {plan.packageCurrency}
            {plan.price}
            <span className="package-duration-title">
              /{plan.packageDuration}
            </span>
          </h1>
        </div>

        <div className="price-body-section">
          <p>
            <FiCheckCircle />
            Text To Image limit : {plan.textToImage}
          </p>
          <p>
            <FiCheckCircle />
            Imagination : {plan.imagination}
          </p>
          <p>
            <FiCheckCircle />
            Image caption Maker : {plan.imageCaption}
          </p>

          <p>
            <FiCheckCircle />
            Image Chatting Limit: {plan.chatImageLimit}
          </p>
          <p>
            <FiCheckCircle />
            Image To Audio : {plan.imageAudioLimit}
          </p>
          <p>
            <FiCheckCircle />
            Scratch To Code Generate : {plan.scratchToCodeLimit}
          </p>
          <p>
            <FiCheckCircle />
            Grammar Chekiang Limit: {plan.grammarChekiangLimit}
          </p>
          <p>
            <FiCheckCircle />
            Text To Paraphraser Limit : {plan.textToParaphraserLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Chat Assistant Limit : {plan.aiChatAssistantLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Template Accesses Limit : {plan.aiTemplateLimit}
          </p>
          <p>
            <FiCheckCircle />
            Edit Audio Limit : {plan.editAudioLimit}
          </p>
          <p>
            <FiCheckCircle />
            Video To Text Limit : {plan.videoToTextLimit}
          </p>
          <p>
            <FiCheckCircle />
            Web Scripting Limit : {plan.webScriptingLimit}
          </p>
          <p>
            <FiCheckCircle />
            ai Vision Limit : {plan.aiVisionLimit}
          </p>
          <p>
            <FiCheckCircle />
            YouTube Analyser Limit : {plan.youTubeAnalyserLimit}
          </p>
          <p>
            <FiCheckCircle />
            Speech To Text Limit :{plan.speechToTextLimit}
          </p>

          <p>
            <FiCheckCircle />
            AI Rewriter Limit : {plan.aiRewriterLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Voiceover Limit : {plan.aiVoiceoverLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Code Generate Limit : {plan.aiCodeGenerateLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Rewriter Limit : {plan.aiRewriterLimit}
          </p>
          <p>
            <FiCheckCircle />
            AI Rewriter Limit : {plan.aiRewriterLimit}
          </p>
          <p>
            <FiCheckCircle />
            <b> Free Limit :</b> {plan.freeLimit}
          </p>
          <p>
            <FiCheckCircle />
            Download Image
          </p>
          <p>
            <FiCheckCircle />
            Edit and Download Text
          </p>
          <p>
            <FiCheckCircle />
            Edit and Download PDF
          </p>
        </div>
        <div className="price-icon-section">
          {selectedTagLabels && selectedTagLabels.length > 0 && (
            <div>
              <h2>VIP Assistant</h2>
              {selectedTagLabels.map((tag, index) => (
                <span key={index}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: tag.icon,
                    }}
                  />
                </span>
              ))}
            </div>
          )}

          {selectedTagPremiumAssistant &&
            selectedTagPremiumAssistant.length > 0 && (
              <div>
                <h2>Premium Assistant</h2>
                {selectedTagPremiumAssistant.map((tag, index) => (
                  <span key={index}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: tag.icon,
                      }}
                    />
                  </span>
                ))}
              </div>
            )}
        </div>

        <button onClick={onClickHandler}>Choose Plan</button>
      </div>
    </div>
  );
};

// Prop types validation for PlanItem component
PlanItem.propTypes = {
  plan: PropTypes.shape({
    packageType: PropTypes.string.isRequired,
    packageCurrency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    packageDuration: PropTypes.string.isRequired,
    codeGenerate: PropTypes.number.isRequired,
    textToImage: PropTypes.number.isRequired,
    aiChatImage: PropTypes.number.isRequired,
    selectedTags: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        assistantIcon: PropTypes.string.isRequired,
        assistantName: PropTypes.string.isRequired,

        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const MemberShip = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllAssistantUserReq();
    packageList("Monthly");
    packageList("Life-Time");
    packageList("Yearly");
  }, [dispatch]);

  const monthlyPackage = useSelector((state) => state.packageSlice.monthly);
  const yearlyPackage = useSelector((state) => state.packageSlice.yearly);
  const lifetimePackage = useSelector((state) => state.packageSlice.lifTime);
  const handleSocialDefault = (planId) => {
    console.log('select plan',planId)
    setSelectedPlanId(planId);
  };

  useEffect(() => {
    if (selectedPlanId) {
      orderPackageReq(selectedPlanId);
      navigate(`/post/OrderPage?_id=${selectedPlanId}`);
    }
  }, [selectedPlanId, navigate]);

  const isLoggedIn = getToken();
  return (
    <>
      {/* {isLoggedIn ? <NavBar /> : <NavBar3 />} */}

      <div className="container">
        <div className="subscription-plan mb-5">
          <div className="common-home-page-section-title">
          {/* <p>TXTVIEWSAI FEATURES LIST</p> */}
            <h2>Choose a plan</h2>
            <p>
              Make the best decision for your business.For the variety of needs
              of our clients.
            </p>
          </div>

          <Tabs
            defaultActiveKey="Monthly"
            transition={false}
            id="Naomi-tab-example"
            className="price-membership"
          >
            <Tab eventKey="Monthly" title="Monthly">
              <div className="row">
                {monthlyPackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    onClick={() => handleSocialDefault(item._id)}
                    setSelectedPlanId={()=>setSelectedPlanId}
                  />
                ))}
              </div>
            </Tab>
            <Tab eventKey="Yearly" title="Yearly">
              <div className="row">
                {yearlyPackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    onClick={() => handleSocialDefault(item._id)}
                  />
                ))}
              </div>
            </Tab>
            <Tab eventKey="Lifetime" title="Lifetime">
              <div className="row">
                {lifetimePackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    onClick={() => handleSocialDefault(item._id)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MemberShip;
