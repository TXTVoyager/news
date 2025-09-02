// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { DeleteUserReq, getAllUserList, getAllPaidUserList } from "../../API/Api";
import { DeleteAlert } from "../../helper/PopupAlert";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";

const AllUserDataList = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == editUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);
  useEffect(() => {
    getAllUserList(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);
  const ALLImageItem = useSelector((state) => state.profile.userDataList);
  useEffect(() => {
    getAllPaidUserList(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);
  const allPaidUser = useSelector((state) => state.profile.paidUserList);
  const Total = useSelector((state) => state.profile.total);
  const handlePageClick = async (event) => {
    await getAllUserList(event.selected + 1, perPage, searchKeyword);
  };
  const searchData = async () => {
    await getAllUserList(1, perPage, searchKeyword);
  };
  const PageKeyOnChange = async (e) => {
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await getAllUserList(1, perPage, searchKeyword);
  };
  const searchOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await getAllUserList(1, perPage, "0");
    }
  };

  const DeleteItem = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      const DeleteResult = await DeleteUserReq(id);
      if (DeleteResult) {
        await getAllUserList(1, perPage, searchKeyword);
      }
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>All Free Users</h2>
        <p>
          Users who created account but have not made any purchases yet.
        </p>
      </div>
      <div className=" mt-5 mb-4">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <h5>All User List</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2">
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
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
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
                    <div className="col-12 col-sm-12 col-md-12 co-xxl-12">
                      <div className="table-responsive data-table">
                        <table className="table">
                          <thead className="sticky-top">
                            <tr className="thead-css">
                              <th
                                className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col"
                              >
                                Image
                              </th>
                              <th
                                className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col"
                              >
                                Name
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                UserName
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Email
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Author
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Plan
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Duration
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Data
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...ALLImageItem,...allPaidUser].map((item) => (
                              <tr key={item._id}>
                                <td>
                                  <div className="common-table-image">
                                    <img src={item.image} alt={item["name"]} />
                                  </div>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.name}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.userName}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.email}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.auth}
                                  </p>
                                </td>
                                <td>
                                  <p className=" free-payment-admin text-center text-xs font-weight-bold pt-4">
                                    <span> {item.plan}</span>
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {item.packageTime}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-center text-xs font-weight-bold pt-4">
                                    {new Date(item.Date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "2-digit",
                                        month: "2-digit",
                                        day: "2-digit",
                                      }
                                    )}
                                  </p>
                                </td>
                                <td className="text-center pt-3 ">
                                  <button
                                    onClick={DeleteItem.bind(this, item._id)}
                                    className="btn btn-outline-dark text-danger mb-0 ms-2"
                                  >
                                    <AiOutlineDelete size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
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
                          pageCount={Total / perPage}
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
      </div>
    </>
  );
};

export default AllUserDataList;
