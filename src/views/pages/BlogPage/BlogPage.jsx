import React, { useEffect, useState } from "react";
import Nave from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { readBlogReq, getBlogListReq, getPostbyID } from "../../../API/Api";
import getBaseUrl from "../../../helper/BackendConnect";
import { useParams } from "react-router-dom";
import { getToken } from "../../../helper/Session";
import { FaSquareShareNodes } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";
import { toast } from "react-toastify";
const BASE_URL = getBaseUrl();
const BlogPage = () => {
  const [activeUser, setActiveUser] = useState(0);

  const { id } = useParams();
  const blogItem = useSelector((state) => state.blog.currentBlogData);
  const webAdminList = useSelector((state) => state.blog.webAdminData);
  const editorialList = useSelector((state) => state.blog.editorialData);
  const deskList = useSelector((state) => state.blog.deskData);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(`Link Copied!`);
  }
  useEffect(() => {
    getPostbyID({ id: id })
    getBlogListReq(1, 15, "0");
  }, []);

  useEffect(() => {
    if (webAdminList.length > 0 && editorialList.length > 0) {
      const userActive =
        webAdminList.find((data) => data._id === id) ||
        editorialList.find((data) => data._id === id) ||
        deskList.find((data) => data._id === id);
      setActiveUser(userActive);
    }
    else {
      if (blogItem._id == id)
        setActiveUser(blogItem);
    }
  }, [blogItem]);

  const setActiveUserByClick = (item) => {
    setActiveUser(item);
  };

  function postTitleLimit(title, words) {
    const descriptionWords = title.split(" ");
    if (descriptionWords.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  function wordWrap(str, maxWidth) {
    if (!str) return [];
    const words = str.split(" ");
    let currentLine = words[0];
    const lines = [];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = `${currentLine} ${word}`;
      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function truncateDescription(description, words) {
    const descriptionWords = description.split(" ");
    if (descriptionWords.length <= words) {
      return description;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }
  const isLoggedIn = getToken();
  return (
    <>
      {isLoggedIn ? <Nave /> : <Nave />}
      <section className="blog-section-area">
        <div className="container">
          <div className="row">
            <div className=" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xx-8 blog-right-side-show-read">
              <h2>{activeUser.title}</h2>
              <p>
                {activeUser.publisher} | Published {formatDate(activeUser.createDate) + " "}
                {activeUser.updateDate != null && <span>
                  | Last Updated {formatDate(activeUser.updateDate)}
                </span>}
              </p>
              <div className="blog-reading-section">
                <img
                  src={activeUser?.sourced?.length > 0 ? activeUser.thumbnail :
                    sanitizeImageUrl(BASE_URL + activeUser.coverImage
                    )}
                />
                <div className="blog-reading-text-section">
                  <h2>{activeUser.title}</h2>
                  {
                    activeUser?.publisher?.toLowerCase() == "txtviews editor" ?
                      <div dangerouslySetInnerHTML={{ __html: activeUser.description }}></div> :
                      wordWrap(activeUser.description, 440).map((line, index) => (
                        <React.Fragment key={index}>
                          <p>{line}</p>
                          {index + 1 !==
                            wordWrap(activeUser.description, 40).length && <br />}
                        </React.Fragment>
                      ))
                  }
                </div>
              </div>
              {activeUser?.video == true && activeUser?.externalURL?.length > 0 && <div>
                <iframe width="95%" height="380"
                  src={activeUser?.externalURL}
                  title="YouTube video player" frameborder="1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              </div>}

              <div className="row blog-footer-section">
                <div className="col-md-8 blog-tag-area">
                  <p><FaTags />  </p>
                  <p className="tags-color"> &nbsp; {activeUser.tag && activeUser.tag.toString()}</p>
                </div>
                <div className="col-md-4 blog-social-media">
                  <div>
                    <Link><h2 onClick={copyLink}>share  <FaSquareShareNodes /></h2></Link>
                  </div>
                </div>
                <div className="col-12 blog-tag-area">
                  <p>{activeUser?.author?.name?.length > 0 && activeUser?.author?.editorType == "PREMIUM" && <span>Author: {activeUser.author.name} <br />
                    This article has been written by, {activeUser.author.name}, a TXTVIEWS premium contributor.  <br /></span>}
                    {activeUser?.sourced?.length > 0 && <span>This article has been sourced from {activeUser.sourced}.</span>}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}

            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xx-4 blog-left-category">
              <div className="row">

                {/* Recent News -  Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Recent News</h2>
                  {webAdminList.slice(0, 5).map((item, i) => item._id != activeUser._id && (
                    <div
                      onClick={() => setActiveUserByClick(item)}
                      key={item._id}
                    >
                      <div className="blog-image-side">
                        <div className="row">

                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="blog-image-thumbnail">
                              <img
                                src={item?.sourced?.length > 0 ? item.thumbnail :
                                  sanitizeImageUrl(BASE_URL + item.thumbnail
                                  )}
                                style={{ 'max-height': '100px' }}
                              />
                            </div>
                          </div>
                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                            <div className="blog-image-side-text">
                              <h2>{postTitleLimit(item.title, 7)}</h2>
                              <p>{truncateDescription(item.description, 17)}</p>
                              <div className="blog-list-page-date">
                                <h2>
                                  by
                                  <span className="text-info">
                                    {/* {item.postCreate} */} txtviews Web Admin |
                                  </span>
                                  {" " + formatDate(item.createDate)}
                                </h2>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>




                {/* Featured Products - Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Featured Stories</h2>
                  {editorialList.slice(0, 3).map((item, i) => (
                    <div
                      onClick={() => setActiveUserByClick(item)}
                      key={item._id}
                    >
                      <div className="blog-image-side">
                        <div className="row">
                          <div className="col-12">
                            <div className="blog-image-thumbnail">
                              <img
                                src={sanitizeImageUrl(
                                  BASE_URL + item.thumbnail
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="blog-image-side-text mt-2">
                              <h2>{postTitleLimit(item.title, 7)}</h2>
                              <div dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 20) }}></div>
                              <div className="blog-list-page-date">
                                <h2>
                                  by
                                  <span className="text-info">
                                    {/* {item.postCreate} */} TXTVIEWS Editor |
                                  </span>
                                  {" " + formatDate(item.createDate)}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default BlogPage;
