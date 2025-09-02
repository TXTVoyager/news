// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import {
  getTotalFreeUserCount,
  getTotalPaidUserCount,
  getBlogListReq
} from "../../API/Api";
import { useSelector } from "react-redux";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaImages } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { AiFillSignal } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";

const AdminDashboardCard = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);

  useEffect(() => {
    getTotalPaidUserCount();
    getTotalFreeUserCount();
    getBlogListReq();
  }, []);


  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == editUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }


  //free slice
  const totalFreeUser = useSelector((state) => state.profile.totalFreeUser);
  const totalFreeUserCurrentMonth = useSelector(
    (state) => state.profile.totalFreeUserCurrentMonth
  );
  const totalFreeUserLastMonth = useSelector(
    (state) => state.profile.totalFreeUserLastMonth
  );

  const totalFreeUserYearly = useSelector(
    (state) => state.profile.totalFreeUserYearly
  );
  //paid slice
  const totalPaidUser = useSelector((state) => state.profile.totalPaidUser);
  const totalPaidUserCurrentMonth = useSelector(
    (state) => state.profile.totalPaidUserCurrentMonth
  );
  const totalPaidUserLastMonth = useSelector(
    (state) => state.profile.totalPaidUserLastMonth
  );

  const totalPaidUserYearly = useSelector(
    (state) => state.profile.totalPaidUserYearly
  );
  // Pice slice
  const currentMonthTotalPrice = useSelector(
    (state) => state.profile.currentMonthTotalPrice
  );
  const lastMonthTotalPrice = useSelector(
    (state) => state.profile.lastMonthTotalPrice
  );

  const yearlyTotalPrice = useSelector(
    (state) => state.profile.yearlyTotalPrice
  );
  const totalTotalPrice = useSelector((state) => state.profile.totalTotalPrice);
  // Current Month Consume Data
  const currentMonthApiUsageImage = useSelector(
    (state) => state.profile.currentMonthApiUsageImage
  );
  const currentMonthApiUseCode = useSelector(
    (state) => state.profile.currentMonthApiUseCode
  );
  const currentMonthApiUseAudio = useSelector(
    (state) => state.profile.currentMonthApiUseAudio
  );
  const currentMonthApiUseArticle = useSelector(
    (state) => state.profile.currentMonthApiUseArticle
  );
  const currentMonthApiUseChat = useSelector(
    (state) => state.profile.currentMonthApiUseChat
  );
  const currentMonthApiUseAudioToText = useSelector(
    (state) => state.profile.currentMonthApiUseAudioToText
  );
  // Last Month Consume Data
  const lastMonthApiUsageImage = useSelector(
    (state) => state.profile.lastMonthApiUsageImage
  );
  const lastMonthApiUseCode = useSelector(
    (state) => state.profile.lastMonthApiUseCode
  );
  const lastMonthApiUseAudio = useSelector(
    (state) => state.profile.lastMonthApiUseAudio
  );
  const lastMonthApiUseArticle = useSelector(
    (state) => state.profile.lastMonthApiUseArticle
  );
  const lastMonthApiUseChat = useSelector(
    (state) => state.profile.lastMonthApiUseChat
  );
  const lastMonthApiUseAudioToText = useSelector(
    (state) => state.profile.lastMonthApiUseAudioToText
  );
  // Yearly Consume Data
  const yearlyApiUsageImage = useSelector(
    (state) => state.profile.yearlyApiUsageImage
  );
  const yearlyApiUseCode = useSelector(
    (state) => state.profile.yearlyApiUseCode
  );
  const yearlyApiUseAudio = useSelector(
    (state) => state.profile.yearlyApiUseAudio
  );
  const yearlyApiUseArticle = useSelector(
    (state) => state.profile.yearlyApiUseArticle
  );
  const yearlyApiUseChat = useSelector(
    (state) => state.profile.yearlyApiUseChat
  );
  const yearlyApiUseAudioToText = useSelector(
    (state) => state.profile.yearlyApiUseAudioToText
  );
  // Final Total Count Consume Data
  const totalApiUsageImage = useSelector(
    (state) => state.profile.totalApiUsageImage
  );
  const totalApiUseCode = useSelector((state) => state.profile.totalApiUseCode);
  const totalApiUseAudio = useSelector(
    (state) => state.profile.totalApiUseAudio
  );
  const totalApiUseArticle = useSelector(
    (state) => state.profile.totalApiUseArticle
  );
  const totalApiUseChat = useSelector((state) => state.profile.totalApiUseChat);
  const totalApiUseAudioToText = useSelector(
    (state) => state.profile.totalApiUseAudioToText
  );

  //total spend money count for marketing
  const currentMonthSpendTotalPrice = useSelector(
    (state) => state.profile.currentMonthSpendTotalPrice
  );
  const lastMonthSpendTotalPrice = useSelector(
    (state) => state.profile.lastMonthSpendTotalPrice
  );
  const yearlySpendTotalPrice = useSelector(
    (state) => state.profile.yearlySpendTotalPrice
  );
  const totalSpendTotalPrice = useSelector(
    (state) => state.profile.totalSpendTotalPrice
  );

  //total percentage spend money count for marketing
  const percentageSpendMoney =
    ((currentMonthSpendTotalPrice - lastMonthSpendTotalPrice) /
      lastMonthSpendTotalPrice) *
    100;
  //free
  const percentageChange =
    ((totalFreeUserCurrentMonth - totalFreeUserLastMonth) /
      totalFreeUserLastMonth) *
    100;
  //paid
  const percentageChangePaid =
    ((totalPaidUserCurrentMonth - totalPaidUserLastMonth) /
      totalPaidUserLastMonth) *
    100;
  //order
  const percentageOrder =
    ((currentMonthTotalPrice - lastMonthTotalPrice) / lastMonthTotalPrice) *
    100;

  const percentageImageGenerated =
    ((currentMonthApiUsageImage - lastMonthApiUsageImage) /
      lastMonthApiUsageImage) *
    100;

  // total token use
  const totalToken =
    totalApiUseCode + totalApiUseAudio + totalApiUseAudioToText;
  // Summarize the running month's data
  const runningMonthToken =
    currentMonthApiUseCode +
    currentMonthApiUseAudio +
    currentMonthApiUseAudioToText;
  const lastMonthTotal =
    lastMonthApiUseCode + lastMonthApiUseAudio + lastMonthApiUseAudioToText;

  const percentageChangeToken =
    ((runningMonthToken - lastMonthTotal) / lastMonthTotal) * 100;

  const yearlyTotal =
    yearlyApiUseCode + yearlyApiUseAudio + yearlyApiUseAudioToText;

  // Accumulate text and chat usage
  const totalTextAndChatCurrentMonth =
    currentMonthApiUseChat + currentMonthApiUseArticle;
  const totalTextAndChatLastMonth =
    lastMonthApiUseChat + lastMonthApiUseArticle;
  const totalTextAndChatYear = yearlyApiUseArticle + yearlyApiUseChat;

  // Calculate percentage change
  const percentageTextAndChat =
    ((totalTextAndChatCurrentMonth - totalTextAndChatLastMonth) /
      totalTextAndChatLastMonth) *
    100;
  const totalWord = totalApiUseArticle + totalApiUseChat;
  // Accumulate audio, usage

  return (
    <>
      <div className="row dashboard-card">

        <div className="col-12 col-sm-12 col-md-13 col-lg-6 col-xl-6 col-xxl-3 mt-3 ">
          <div className="dashboard-card-body-01">
            <div>
              <h2 className="card-main-title">Total Articles</h2>

              <div className="dashboard-card-parentage">
                <h2>{totalPaidUserCurrentMonth}</h2>
                {percentageChangePaid > 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretUp className="card-icon-graterthen" />
                    <p className="card-icon-title-p">
                      {Math.abs(percentageChangePaid).toFixed(1)}%{" "}
                    </p>
                    <p className="card-text-sub-title">This Month</p>
                  </div>
                )}
                {percentageChangePaid < 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretDown className="card-icon-color-lessthen" />
                    <p className="card-icon-title-l">
                      {Math.abs(percentageChangePaid).toFixed(1)}%{" "}
                    </p>
                    <p className="card-text-sub-title">Running Month</p>
                  </div>
                )}
              </div>
              <div className="card-text-footer-are">
                <div className="d-flex">
                  <p className="card-text-title">
                    Last Month <FaUsers />{" "}
                  </p>
                  <span className="total-number">{totalPaidUserLastMonth}</span>
                  <p className="card-text-title card-right-title">
                    This Year <AiFillSignal />
                  </p>
                  <span className="total-number">{totalPaidUserYearly}</span>
                </div>
                <div>
                  <p className="card-text-title">
                    Total <AiFillSignal />
                    <span className="total-number"> {totalPaidUser}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard-card-icon">
              <FaFileInvoice />
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3 mt-3 ">
          <div className="dashboard-card-body-02">
            <div>
              <h2 className="card-main-title">Total Income Statistic</h2>

              <div className="dashboard-card-parentage">
                <h2>${currentMonthTotalPrice}</h2>
                {percentageOrder > 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretUp className="card-icon-graterthen" />
                    <p className="card-icon-title-p">
                      {Math.abs(percentageOrder).toFixed(1)}%{" "}
                    </p>
                    <h5 className="card-text-sub-title">This Month</h5>
                  </div>
                )}
                {percentageOrder < 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretDown className="card-icon-color-lessthen" />
                    <p className="card-icon-title-l">
                      {Math.abs(percentageOrder).toFixed(1)}%{" "}
                    </p>
                    <p className="card-text-sub-title">Running Month</p>
                  </div>
                )}
              </div>
              <div className="card-text-footer-are">
                <div className="d-flex">
                  <p className="card-text-title">Last Month </p>
                  <span className="total-number">${lastMonthTotalPrice}</span>
                  <p className="card-text-title card-right-title">
                    This Year <AiFillSignal />
                  </p>
                  <span className="total-number">${yearlyTotalPrice}</span>
                </div>
                <div>
                  <p className="card-text-title">
                    Total <AiFillSignal />
                    <span className="total-number"> ${totalTotalPrice}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard-card-icon">
              <FaCircleDollarToSlot />
            </div>
          </div>
        </div>


        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3 mt-3 ">
          <div className="dashboard-card-body-06">
            <div>
              <h2 className="card-main-title">Total Pay For Marketing</h2>

              <div className="dashboard-card-parentage">
                <h2>${currentMonthSpendTotalPrice}</h2>
                {percentageSpendMoney > 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretUp className="card-icon-graterthen" />
                    <p className="card-icon-title-p">
                      {Math.abs(percentageSpendMoney).toFixed(1)}%{" "}
                    </p>
                    <p className="card-text-sub-title">This Month</p>
                  </div>
                )}
                {percentageSpendMoney < 0 && (
                  <div className="card-icon-color">
                    <AiOutlineCaretDown className="card-icon-color-lessthen" />
                    <p className="card-icon-title-l">
                      {Math.abs(percentageSpendMoney).toFixed(1)}%{" "}
                    </p>
                    <h5 className="card-text-sub-title">Running Month</h5>
                  </div>
                )}
              </div>
              <div className="card-text-footer-are">
                <div className="d-flex">
                  <p className="card-text-title">
                    Last Month <FaUsers />{" "}
                  </p>
                  <span className="total-number">
                    ${lastMonthSpendTotalPrice}
                  </span>
                  <p className="card-text-title card-right-title">
                    This Year <AiFillSignal />
                  </p>
                  <span className="total-number">${yearlySpendTotalPrice}</span>
                </div>
                <div>
                  <p className="card-text-title">
                    Total <AiFillSignal />
                    <span className="total-number">
                      {" "}
                      ${totalSpendTotalPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard-card-icon">
              <FaHandHoldingDollar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboardCard;
