// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { CWidgetStatsD } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { Link } from "react-router-dom";
import {
  getAllPaidUserList,
  getAllUserList,
  getBlogListReq
} from "../../API/Api";
const Dashboard = () => {

  const orderList = useSelector((state) => state.OrderList);
  const getUser = useSelector((state) => state.profile.userData);
  const articleWordCount = useSelector(
    (state) => state.textToArticle.articleWordCount
  );
  const articleCountTotal = useSelector(
    (state) => state.textToArticle.articleCountTotal
  );

  useEffect(() => {
      getBlogListReq(1, 10, getUser?.[0]?.email);
  }, []);

  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 20,
        hoverRadius: 3,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };
  const label = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <>
      <div className="mt-5 mb-5">
        <div className="row ">
          <div className="col-md-12 col-lg-12 col-xl-6 ">
            <div className="dashboard-main-title">
              <h2>Welcome To User Dashboard</h2>
              <p>
                Your subscription plan is{" "}
                <span className="button-sub-dashboard">
                  {getUser.map((item) => {
                    return `${item.plan}`;
                  })}
                </span>
              </p>
              <p>
                Enroll in a plan with us to unlock all services and advantages.
              </p>
              <Link to="/post/Membership">
                <button>Update</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4 dashboard-card-item-1">
            <ul>
              <li>50$ Coupons left - 0</li>
              <li>100$ Coupons left - 0</li>
              <li>150$ Coupons left - 0</li>
              <li>Additional discount - 0%</li>
            </ul>
          </div>
        </div>


        <div className="user-dashboard-text-line-chard">
          <div className=" row impassion-body">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="chart-data-title">
                <h2>Yearly Order Summary</h2>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="impassion-title">
                <h2>
                  <GoDotFill />
                  Total Orders: {orderList?.total}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dashboard-card-item-5">
              <CWidgetStatsD
                className="dashboard-card-header"
                chart={
                  <CChart
                    className="dashboard-card-body"
                    type="line"
                    data={{
                      labels: label,
                      datasets: [
                        {
                          label: "Orders Placed",
                          backgroundColor: "#c9c5ff",
                          borderColor: "#1100c7",
                          pointHoverBackgroundColor: "#fff",
                          borderWidth: 1,
                          data: orderList.order,
                          fill: true,
                        },
                      ],
                    }}
                    options={chartOptions}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
