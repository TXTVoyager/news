// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, Badge } from "react-bootstrap";
import {
  createBlogReq,
  getBlogListReq,
  blogDataUpdateReq,
} from "../../API/Api";
import { useSelector } from "react-redux";
import Select from "react-select";
import { FiUpload } from "react-icons/fi";
import getBaseUrl from "../../helper/BackendConnect";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";
import { CgChevronDoubleUp } from "react-icons/cg";

//frontend & backend connect function
const BASE_URL = getBaseUrl();
const BloggingPage = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == editUser || getUser?.[0]?.email == editUser)) {
    console.log(editUser, getUser?.[0]?.email)
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const [thumbnail, setThumbnail] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isRedirect, setIsRedirect] = useState(true);
  const post_title = useRef();
  const post_description = useRef();
  const post_tag = useRef();
  const author = useRef();
  const externalLink = useRef();
  const [smPost, setSMPost] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    getBlogListReq(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);

  const editBlogData = useSelector((state) => state.blog.editBlogData);

  // function for image upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateFileType(file)) {
        setThumbnail(file);
      } else {
        toast.error("Only upload JPEG, JPG, PNG files.");
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateFileType(file)) {
        setCoverImage(file);
      } else {
        toast.error("Only upload JPEG, JPG, PNG files.");
      }
    } else {
      console.error("No file selected");
    }
  };
  // Function to validate file type
  const validateFileType = (file) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    return allowedExtensions.test(file.name);
  };

  const handleSubmitUpdateBlogInfo = async (id) => {
    const title = post_title.current.value;
    const description = post_description.current.value;
    const tag = post_tag.current.value;
    const postCreate = "Web Admin";
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("thumbnail", thumbnail);
      formData.append("coverImage", coverImage);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", tag);
      formData.append("category", category);
      formData.append("postCreate", postCreate);

      const response = await blogDataUpdateReq(formData);
      if (response) {
        getBlogListReq(1, 5, 0);
        toast.success("Blog updated successfully");
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };
  useEffect(() => {
    if (editBlogData) {
      setCategory(editBlogData.category);
    }
  }, [editBlogData]);


  const eAdmin = ["txtviews"];
  // // save blog data into data base
  const handleSubmitCreateBlogInfo = async () => {
    const title = post_title.current.value;
    const description = post_description.current.value;
    const postAuthor = author.current.value;
    const postLink = externalLink.current.value;
    const tag = post_tag.current.value;

    try {
      if (
        !coverImage ||
        !title ||
        !postLink ||
        !publisher
      ) {
        toast.error("All fields are required");
      } else {
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tag", tag);
        formData.append("category", category);
        formData.append("publisher", publisher);
        formData.append("redirect", true);
        formData.append("author", postAuthor);
        formData.append("externalURL", postLink);
        formData.append("smPost", true);

        const response = await createBlogReq(formData);
        if (response) {
          getBlogListReq(1, 5, 0);
          toast.success("Blog created successfully");
          post_title.current.value = "";
          post_description.current.value = "";
          post_tag.current.value = "";
          setThumbnail(null);
          setCoverImage(null);
          setCategory("");
        } else {
          toast.error("Failed to save data");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/CreateBlogPage");
  };

  return (
    <>
      <div className="admin-page-main-title pt-5 ">
        <h2>Publish News, Create Blogs & Add Sponsored Contents</h2>
        <p>
          This will be visible in the latest news section on various pages.
        </p>
      </div>

      <form className="row pt-5 justify-content-md-center mb-5">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-8 blog-page-field">
          <div className="cancel-admin-button">
            <button onClick={handleCancel}>Cancel</button>
          </div>
          <div className="blog-image-upload">
            <div className="row">

              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="blog-page-image">
                  <div>
                    <img
                      src={
                        coverImage
                          ? URL.createObjectURL(coverImage)
                          : editBlogData.coverImage
                            ? `${BASE_URL}${editBlogData.coverImage}`
                            : null
                      }
                      alt="Cover Image (example- 1080 x 720 px)"
                    />
                  </div>
                  <div className="pt-4">
                    <input
                      type="file"
                      name="coverImage"
                      id="thumbnail-coverImage"
                      onChange={handleCoverImageChange}
                    />
                    <label
                      htmlFor="thumbnail-coverImage"
                      className="custom-label"
                    >
                      Upload Cover-Image <FiUpload /><br />
                      Max Width 1080
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
            <label htmlFor="post_title" className="form-label">
              Post Title
            </label>
            <input
              type="text"
              ref={post_title}
              className="form-control"
              id="post_title"
              defaultValue={editBlogData.title}
            />
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
            <label htmlFor="inputGroupSelect01" className="form-label">
              Select Post Category
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="AI">AI</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
            <label htmlFor="publisher" className="form-label">
              Select Publisher Category
            </label>
            <select
              className="form-select"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            >
              <option value="">Select Category</option>
              {eAdmin.map((item) => (<option value={item}>{item}</option>))}
            </select>
          </div>


          <div className="col-md-12 pt-4">
            <label htmlFor="post_tag" className="form-label">
              Post Tags <i>(separated by a , )</i>
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control"
              id="post_tag"
              ref={post_tag}
              defaultValue={editBlogData.tag}
            />
          </div>

          <div className="col-md-12 pt-4">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              rows="2"
              className="form-control"
              id="author"
              ref={author}
              defaultValue={editBlogData.author}
            />
          </div>
          {/* {publisher == "Sponsored & Partnered Content" &&
            (<div className="col-md-12 pt-4">
              <label htmlFor="isRedirect" className="form-label">
                External Redirect <span className="price-title-point">* </span>
              </label>
              <div className="">

                <input
                  type="radio"
                  name="isRedirect"
                  id="isRedirect"
                  value={true}
                  defaultChecked={isRedirect}
                  onChange={(e) => setIsRedirect(e.target.value) && console.log(e.target.value)} /> Yes {"  "}

                <input
                  type="radio"
                  name="isRedirect"
                  id="isRedirect"
                  value={false}
                  defaultChecked={!isRedirect}
                  onChange={(e) => setIsRedirect(e.target.value)} /> No

              </div>
            </div>)} */}
            
          <div className="col-md-12 pt-4">
            <label htmlFor="externalLink" className="form-label">
              Link
            </label>
            <input
              type="text"
              rows="2"
              className="form-control"
              id="externalLink"
              ref={externalLink}
              defaultValue={editBlogData ? editBlogData.externalLink : ""}
            />
          </div>


          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
            <label htmlFor="post_description" className="form-label">
              Post Description
            </label>
            <textarea
              type="text"
              className="form-control"
              rows="8"
              id="post_description"
              ref={post_description}
              defaultValue={editBlogData ? editBlogData.description : ""}
            />
          </div>
          <Button
            className="admin-plan-button mt-5 pt-3 pb-3"
            onClick={() => {
              if (editBlogData && editBlogData._id) {
                handleSubmitUpdateBlogInfo(editBlogData._id);
              } else {
                handleSubmitCreateBlogInfo();
              }
            }}
          >
            {editBlogData && editBlogData._id ? "Update Blog" : "Create Blog "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BloggingPage;
