// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { DeleteImage, getAllImageTableDataList } from "../../../API/Api";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { DeleteAlert } from "../../../helper/Trend";
import getBaseUrl from "../../../helper/BackendConnect";

const BASE_URL = getBaseUrl();
const AllImagePage = () => {
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);
  useEffect(() => {
    getAllImageTableDataList(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);
  const ALLImageItem = useSelector((state) => state.imageTable.imageList);
  const Total = useSelector((state) => state.imageTable.total);

  const handlePageClick = async (event) => {
    await getAllImageTableDataList(event.selected + 1, perPage, searchKeyword);
  };
  const PageKeyOnChange = async (e) => {
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await getAllImageTableDataList(1, perPage, searchKeyword);
  };

  const searchOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await getAllImageTableDataList(1, perPage, "0");
    }
  };
  const searchData = async () => {
    await getAllImageTableDataList(1, perPage, searchKeyword);
  };

  const DeleteItem = async (id) => {
    const deleteConfirmation = await DeleteAlert();
    if (deleteConfirmation.isConfirmed) {
      try {
        const deleteResult = await DeleteImage(id);
        if (deleteResult.status === "success") {
          toast.success("Image deleted successfully");
          await getAllImageTableDataList(1, perPage, searchKeyword);
        } else {
          await getAllImageTableDataList(1, perPage, searchKeyword);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during the deletion process");
      }
    }
  };
  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download successful");
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
        toast.error("Download failed");
      });
  };

  return (
    <>
      <section className="mt-5 table-text-to-voice">
        <div className="mt-8">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="row mt-3">
                  <div className="col-12 col-sm-3 col-md-4 all-image">
                    <h5>All Images</h5>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 all-image-search">
                    <select
                      onChange={PageKeyOnChange}
                      className="form-control mx-2 form-select-sm form-select form-control-sm"
                    >
                      <option value="5">5 Per Page</option>
                      <option value="10">10 Per Page</option>
                      <option value="20">20 Per Page</option>
                      <option value="30">30 Per Page</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-5 col-md-4 all-image-search">
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
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="table-responsive all-data-table">
                      <table className="table">
                        <thead className="sticky-top">
                          <tr>
                            <th
                              className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                              scope="col"
                            >
                              No
                            </th>
                            <th className=" text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                              Image
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                              Size
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                              Date
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ALLImageItem.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <p className=" text-xs font-weight-bold pt-4">
                                  {i + 1}
                                </p>
                              </td>
                              <td>
                                <img
                                  src={BASE_URL + item.url}
                                  className="avatar"
                                  alt="Image"
                                />
                              </td>
                              <td>
                                <p className="text-center text-xs font-weight-bold pt-4">
                                  {item.size}
                                </p>
                              </td>
                              <td>
                                <p className="text-center text-xs font-weight-bold pt-4">
                                  {new Date(item.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                      year: "2-digit",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </p>
                              </td>
                              <td className="text-center pt-4 ">
                                <button
                                  onClick={DeleteItem.bind(this, item._id)}
                                  className=" btn btn-outline-dark  p-2 mb-0 btn-sm ms-2"
                                >
                                  <AiOutlineDelete size={15} />
                                </button>
                                <button
                                  onClick={() =>
                                    downloadImage(BASE_URL + item.url)
                                  }
                                  className="btn btn-outline-dark  p-2 mb-0 btn-sm ms-2"
                                >
                                  <AiOutlineDownload size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
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
      </section>
    </>
  );
};
export default AllImagePage;
