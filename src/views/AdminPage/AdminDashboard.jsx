// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  getAllPaidUserList,
  getAllUserList,
  getBlogListReq
} from "../../API/Api";
import { useSelector } from "react-redux";
import { CWidgetStatsD } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { GoDotFill } from "react-icons/go";
import AdminDashboardCard from "./AdminDashboardCard";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";
import getBaseUrl from "../../helper/BackendConnect";
import { TiTick } from "react-icons/ti";
import { FaHourglass, FaInstagram } from "react-icons/fa6";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  const ChartData = useSelector((state) => state.OrderList.chartData);
  const totalOrder = useSelector((state) => state.OrderList.totalOrder);
  const allPaidUser = useSelector((state) => state.profile.paidUserList);

  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);

  const BASE_URL = getBaseUrl();

  useEffect(() => {
    getBlogListReq(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);

  useEffect(() => {
    getAllPaidUserList(1, 5, 0);
    getAllUserList(1, 5, 0);
  }, []);

  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == editUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }

  //blog slice
  const allBlog = useSelector((state) => state.blog.tableData);

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

  function postTruncate(title, words) {
    const descriptionWords = title?.split(" ");
    if (descriptionWords.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }

  return (
    <>
      <div className="mt-5">
        <section>
          <h2 className="admin-dashboard-top-title">
            Welcome To Admin Dashboard
          </h2>
          <p>
            TXTVIEWS | www.txtviews.com
          </p>
        </section>

        <AdminDashboardCard />
        <section className="admin-dashboard-user-section">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
              <div className="paid-table-admin">
                <h2>Latest Editors</h2>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="thead-css">
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPaidUser.slice(0, 5).map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="common-table-image pt-1">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold pt-1">
                              {item.name} <br /> {item.email}
                            </p>
                          </td>
                          <td className="paid-complete-admin">
                            <p className="text-xs font-weight-bold pt-3">
                              <span><TiTick /> PRO</span>
                            </p>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold pt-3">
                              {item.auth}
                            </p>
                          </td>
                          <td className="paid-active-admin">
                            <p className="text-xs font-weight-bold pt-3">
                              <span>Active</span>
                            </p>
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold pt-3">
                              {new Date(item.Date).toLocaleDateString("en-US", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
              <div className="free-table-admin">
                <h2>Latest Posts</h2>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="thead-css">
                        <th scope="col">Image</th>
                        <th scope="col">Post</th>
                        <th scope="col">Approval</th>
                        <th scope="col">by</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBlog.slice(0, 5).map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="common-table-image pt-2">
                              {item.smPost ? <FaInstagram /> :
                                <img src={`${BASE_URL}${item.thumbnail}`} alt={"thumbnail"} />}
                            </div>
                          </td>
                          <td className="">
                            <p className="text-xs font-weight-bold pt-1">
                              <b>{postTruncate(item.title, 6)}</b> <br /> {postTruncate(item.description, 15)}
                            </p>
                          </td>
                          <td className="paid-complete-admin">
                            {item.approved ? <p className="text-xs font-weight-bold pt-3">
                              <span>Approved</span>
                            </p> :
                              <p className="text-xs font-weight-bold pt-3 ">
                                <span className="text-danger">Pending</span>
                              </p>}
                          </td>
                          <td className="paid-active-admin">
                            {item.publisher}<br />
                            {item?.author?.name} <br /> {item?.author?.email}
                          </td>
                          <td>
                            <p className="text-xs font-weight-bold pt-3">
                              {new Date(item.createDate).toLocaleDateString("en-US", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="admin-dashboard-line-chard">
          <div className="impassion-body">
            <div className="chart-data-title ">
              <h2>Yearly Posts Summary</h2>
            </div>
            <div className="impassion-title">
              <h2>
                <GoDotFill />
                Total Order {totalOrder < 10 ? "0" + totalOrder : totalOrder}
              </h2>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dashboard-card-item-5">
            <CWidgetStatsD
              className="dashboard-card-header"
              chart={
                <CChart
                  className="dashboard-card-body"
                  type="line"
                  data={{
                    labels: [
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
                    ],
                    datasets: [
                      {
                        label: "Order",
                        backgroundColor: "#c9c5ff",
                        borderColor: "#1100c7",
                        pointHoverBackgroundColor: "#fff",
                        borderWidth: 1,
                        data: ChartData,
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              }
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
