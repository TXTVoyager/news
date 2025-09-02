import React, { useEffect, useState } from "react";
import Nave from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { readBlogReq } from "../../../API/Api";
import getBaseUrl from "../../../helper/BackendConnect";
import { useParams } from "react-router-dom";
import { getToken } from "../../../helper/Session";

const BASE_URL = getBaseUrl();
const BlogListPage = () => {
  const isLoggedIn = getToken();
  const [activeUser, setActiveUser] = useState(0);
  const { id } = useParams();
  const BlogItem = useSelector((state) => state.blog.List);

  useEffect(() => {
    readBlogReq();
  }, []);

  useEffect(() => {
    if (BlogItem.length > 0) {
      const userActive = BlogItem.find((data) => data._id === id);
      setActiveUser(userActive);
    }
  }, [BlogItem]);

  const setActiveUserByClick = (item, index) => {
    setActiveUser(item);
    const messages = item.last_chat.map((data) => data.message);
    setAllCodeData(messages);
  };

  function postTitleLimit(title, words) {
    const descriptionWords = title.split(" ");
    if (descriptionWords.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription}`;
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
    return ` ${month} ${day}, ${year}`;
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

  return (
    <>
      {isLoggedIn ? <Nave /> : <Nave />}
      <section className="blog-section-area">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12  col-md-12 col-lg-8 col-xl-8 list-blog-page-area">
              <div className="blog-page-list-top-title">
                <h4>Latest Posts</h4>
                <button>View all</button>
              </div>
              {BlogItem.slice(0, 10).map((item, i) => !item.smPost && (
                <div onClick={() => setActiveUserByClick(item)} key={item._id}>
                  <div className="blog-image-side">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-4 col-lg-6 col-xl-5 col-xxl-5">
                        <div className="blog-image-thumbnail-list">
                          <img
                            variant="top"
                            src={item?.sourced?.length > 0 ? item.thumbnail :
                              sanitizeImageUrl(
                                BASE_URL + item.thumbnail
                              )}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 col-xxl-7">
                        <div className="blog-image-side-text-list-page">
                          <h3>{postTitleLimit(item.title, 10)}</h3>
                          <h4>
                            <div dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 24) }}></div>
                          </h4>
                          <Link to={`/article/${item._id}`}>
                            <button onClick={item._id}>Read More</button>
                          </Link>
                          <div className="blog-list-page-date-all">
                            <h4>
                              by<span className="admin">{item.publisher}</span>
                              {" | " + formatDate(item.createDate)}</h4>
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
      </section>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default BlogListPage;
