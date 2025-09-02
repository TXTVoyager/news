// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
} from "../../API/Api";
import ReactPaginate from "react-paginate";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteAlert, UpdateOrderAlert } from "../../helper/PopupAlert";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";

const OrderListPage = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);

  useEffect(() => {
    getOrderNotifyReq();
    getOrderListReq(1, perPage, searchKeyword);
  }, []);


  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(0);
  const selectedPlanData = useSelector((state) => state.OrderList.order);
  const total = useSelector((state) => state.OrderList.total);

  if (getUser?.[0]?.auth != "admin" || getUser?.[0]?.email != editUser) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }

  const handlePageClick = async (event) => {
    await getOrderListReq(event.selected + 1, perPage, searchKeyword);
    setSelectedPage(event.selected);
  };
  const searchData = async () => {
    await getOrderListReq(1, perPage, searchKeyword);
  };
  const PageKeyOnChange = async (e) => {
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await getOrderListReq(1, perPage, searchKeyword);
  };
  const searchOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await getOrderListReq(1, perPage, "0");
    }
  };

  const DeleteItem = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      const data = {
        orderId: id,
        orderStatus: "CANCELLED",
      }
      const DeleteResult = await updateOrderItemReq(data);
      if (DeleteResult) {
        await getOrderListReq(1, perPage, "0");
      }
    }
  };
  const UpdateItem = async (id, status) => {
    const Result = await UpdateOrderAlert();
    if (Result.isConfirmed) {
      const data = {
        orderId: id,
        orderStatus: status == "NEW" ? "PROCESSING" : status == "PROCESSING" ? "DELIVERED" : "",
      }
      const updateResult = await updateOrderItemReq(data);
      if (updateResult) {
        await getOrderListReq(1, perPage, "0");
      }
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>All Order List</h2>
        <p>
          --all placed orders--
        </p>
      </div>
      <section className="pt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                      <h5>Order List</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-2">
                      <select
                        onChange={PageKeyOnChange}
                        className="form-control form-select-sm form-select form-control-sm"
                      >
                        <option value="5">5 Per Page</option>
                        <option value="10">10 Per Page</option>
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={searchOnChange}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searchData}
                          className="btn  btn-outline-primary btn-sm mb-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-xxl-12 ">
                      <div className="table-responsive data-table">
                        <table className="table">
                          <thead className="sticky-top">
                            <tr className="thead-css">
                              <th
                                className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col"
                              >
                                No.
                              </th>
                              <th
                                className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col">
                                Order Id
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Customer Name
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Email
                              </th>

                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Mobile
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Product
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Price
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Payment Status
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Order Status
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Pay Method
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Date
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Confirm Order
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Cancel Order
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPlanData.map((item, i) => {
                              return(
                              <tr key={i}>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {i + 1 + (selectedPage * perPage)}.
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs pt-4">
                                    {item.orderId}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.name}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.email}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.mobile}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.productInfo}
                                    <br /><i>product id: {item.productId}</i>
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.productCurrency == "INR" ? "₹" : "$"}{item.orderAmount}
                                  </p>
                                </td>
                                <td>
                                  <p
                                    className="text-center font-weight-bold pt-4"
                                  >
                                    {item.paymentStatus}
                                  </p>
                                </td>

                                <td>
                                  <p
                                    className={item.orderStatus == "NEW" ? "text-center text-xs font-weight-bold pt-4 text-info"
                                      : "text-center text-xs font-weight-bold pt-4"}>
                                    {item.orderStatus}
                                  </p>
                                </td>
                                <td className="payment-icon">
                                  <p
                                    className={
                                      "text-center text-xs font-weight-bold pt-4"
                                    }
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: item.stipeIcon,
                                      }}
                                    />
                                    {item?.transactionDetailsObject?.bankcode}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {new Date(
                                      item.createDate
                                    ).toLocaleDateString("en-US", {
                                      year: "2-digit",
                                      month: "2-digit",
                                      day: "2-digit",
                                    })}
                                  </p>
                                </td>

                                <td className="text-center pt-3">
                                  {(item.orderStatus == "NEW" || item.orderStatus == "PROCESSING") ? (<Link
                                    className="btn  p-2 mb-0 btn-sm ms-2"
                                    onClick={UpdateItem.bind(this, item.orderId, item.orderStatus)}
                                  >
                                    Confirm Order
                                  </Link>) : item.orderStatus == "DELIVERED" ? "Already Confirmed!" : ""}
                                </td>

                                <td className="text-center pt-3 ">
                                  {(item.orderStatus == "NEW" || item.orderStatus == "PROCESSING") && (<button
                                    onClick={DeleteItem.bind(this, item.orderId)}
                                    className="btn btn-outline-dark text-danger mb-0 ms-2"
                                  >
                                    <AiOutlineDelete size={15} />
                                  </button>)}
                                </td>
                              </tr>
                            )}
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={total / perPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderListPage;
