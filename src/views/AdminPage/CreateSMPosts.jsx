// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DeleteBlogReq,
  getBlogListReq,
  onOffBlogReq,
  editBlogDataReq,
} from "../../API/Api";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteAlert } from "../../helper/PopupAlert";
import { AiFillEye } from "react-icons/ai";
import { HiEyeOff } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { editUser } from "../../constant/Form";

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
    if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==editUser || getUser?.[0]?.email == editUser))
    {
      navigate("/homepage");
      return (<><span>"Error"</span></>);
    }
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    getBlogListReq(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);

  const allBlog = useSelector((state) => state.blog.tableData);
  const total = useSelector((state) => state.blog.total);
  const handlePageClick = async (event) => {
    await getBlogListReq(event.selected + 1, perPage, searchKeyword);
  };
  const searchData = async () => {
    await getBlogListReq(1, perPage, searchKeyword);
  };
  const PageKeyOnChange = async (e) => {
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await getBlogListReq(1, perPage, searchKeyword);
  };
  const searchOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await getBlogListReq(1, perPage, "0");
    }
  };
  // delete blog item one by one
  const DeleteItem = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      const DeleteResult = await DeleteBlogReq(id);
      if (DeleteResult) {
        await getBlogListReq(1, perPage, searchKeyword);
      }
    }
  };

  const handleToggleClick = async (id, bullionData) => {
    try {
      const res = await onOffBlogReq({ id, bullionData });
      if (res && res.status === 200) {
        await getBlogListReq(1, perPage, searchKeyword);
        toast.success("updated successfully");
      } else {
        await getBlogListReq(1, perPage, searchKeyword);
        toast.success("Update successfully");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };
  const handleEditClick = async (id) => {
    try {
      const res = await editBlogDataReq({ id });
      if (res === 200) {
        toast.success("updated successfully");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;
    const draggedItemId = allAssistant[source.index]._id;
    const newPosition = destination.index;
    try {
      await updateAssistantPositionInDB(draggedItemId, newPosition);

      await getAssistantListReq(1, perPage, searchKeyword);

      // Show success message
      toast.success("Assistant reordered successfully");
    } catch (error) {
      console.error("Error updating assistant position:", error);
      toast.error("Failed to reorder assistant");
    }
  };
  const handleSaveBlog = () => {
    navigate("/BloggingPage");
  };
  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Publish News, Create Blogs & Add Sponsored Contents</h2>
        <p>
          This will be visible in the recent news section on various pages. Only latest 3 will be shown on homepage!<br/>- Web Admin
        </p>
      </div>
      <div className="cancel-admin-button">
        <button onClick={handleSaveBlog}>Create Post</button>
      </div>
      <section className="mt-5 mb-5">
        <div className=" mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-6">
                        <h2>Your Post List</h2>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
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
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
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
                      <div className="col-12">
                        <div className="table-responsive data-table">
                          <table className="table">
                            <thead className="sticky-top ">
                              <tr className="thead-css">
                                <th
                                  className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                  scope="col"
                                >
                                  No.
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Blog Title
                                </th>

                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Category
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Date
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Status
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Edit
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <DragDropContext onDragEnd={onDragEnd}>
                              <Droppable
                                droppableId={allBlog.map((item) => item._id)}
                                type="assistant"
                              >
                                {(provided) => (
                                  <tbody
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    {[...allBlog]
                                      .sort(
                                        (a, b) =>
                                          parseInt(a.position) -
                                          parseInt(b.position)
                                      )
                                      .map((item, index) => (
                                        <Draggable
                                          key={item._id}
                                          draggableId={item._id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <tr
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <td className="pt-4 table-drag-icon">
                                                <MdOutlineDragIndicator />
                                              </td>
                                              <td>
                                                <p className="text-center text-xs font-weight-bold pt-4">
                                                  {item.title}
                                                </p>
                                              </td>

                                              <td>
                                                <p className="text-center text-xs font-weight-bold pt-4">
                                                  {item.category}
                                                </p>
                                              </td>
                                              <td>
                                                <p className="text-center text-xs font-weight-bold pt-4">
                                                  {new Date(
                                                    item.createDate
                                                  ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                      year: "2-digit",
                                                      month: "2-digit",
                                                      day: "2-digit",
                                                    }
                                                  )}
                                                </p>
                                              </td>
                                              <td className="text-center pt-4 on-off-button">
                                                {item.active === "true" ? (
                                                  <AiFillEye
                                                    className="open-button"
                                                    onClick={() =>
                                                      handleToggleClick(
                                                        item._id,
                                                        "false"
                                                      )
                                                    }
                                                  />
                                                ) : (
                                                  <HiEyeOff
                                                    className="off-button"
                                                    onClick={() =>
                                                      handleToggleClick(
                                                        item._id,
                                                        "true"
                                                      )
                                                    }
                                                  />
                                                )}
                                              </td>
                                              <td className="text-center pt-3 ">
                                                <div onClick={handleSaveBlog}>
                                                  <button
                                                    onClick={() =>
                                                      handleEditClick(item._id)
                                                    }
                                                    className="btn btn-outline-dark text-danger mb-0  ms-2"
                                                  >
                                                    <TbEdit />
                                                  </button>
                                                </div>
                                              </td>
                                              <td className="text-center pt-3 ">
                                                <button
                                                  onClick={DeleteItem.bind(
                                                    this,
                                                    item._id
                                                  )}
                                                  className="btn btn-outline-dark text-danger mb-0  ms-2"
                                                >
                                                  <AiOutlineDelete />
                                                </button>
                                              </td>
                                            </tr>
                                          )}
                                        </Draggable>
                                      ))}
                                    {provided.placeholder}
                                  </tbody>
                                )}
                              </Droppable>
                            </DragDropContext>
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
        </div>
      </section>
    </>
  );
};

export default CreateBlogPage;
