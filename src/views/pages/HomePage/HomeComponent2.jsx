import React, { useRef, useEffect, useState } from "react";
import Nave from "../../../components/NavbarAudio";
import Footer from "../../../components/FooterAudio";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { readBlogReq, readProductReq, getBlogListReq, addNewsItemReq } from "../../../API/Api";
import { sponsoredProductsEnable, sponsoredAdverts, webAdvertisementsEnable } from "../../../helper/OptionsToggle";
import getBaseUrl from "../../../helper/BackendConnect";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../../helper/Session";
import { FaSquareShareNodes } from "react-icons/fa6";
import { toast } from "react-toastify";
import { HiChevronDoubleUp } from "react-icons/hi";
import { FaInstagram, FaTags, FaImage, FaSearchengin, FaRobot, FaClock, FaFacebookMessenger, FaTwitter, FaXmark } from "react-icons/fa6";
import { topLogoAI, separator } from "../../../assets/index";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa";
import { Button, Badge, InputGroup } from 'react-bootstrap';
import { LuCircleArrowRight } from "react-icons/lu";


const BASE_URL = getBaseUrl();

const HomeComponent2 = () => {
  const [activeUser, setActiveUser] = useState(0);
  const productFeaturedItems = useSelector((state) => state.product.featured);
  const { id } = useParams();
  const blogList = useSelector((state) => state.blog.tableData);
  const deskList = useSelector((state) => state.blog.deskData);
  const webAdminList = useSelector((state) => state.blog.webAdminData);
  const editorialList = useSelector((state) => state.blog.editorialData);
  const smList = useSelector((state) => state.blog.smData);
  const BlogItem = useSelector((state) => state.blog.List);
  const tweetList = useSelector((state) => state.blog.tweetList);
  const copyLink = (id) => {
    navigator.clipboard.writeText(window.location.href + `#/article/${id}`)
    toast.success(`Link Copied!`);
  }

  const navigate = useNavigate();
  const aichat = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // readBlogReq();
    getBlogListReq(1, 15, "0");
    if (productFeaturedItems.length <= 0)
      readProductReq();
  }, []);

  useEffect(() => {
    var ip;
    const checkIfNewUser = () => {
      if (!localStorage.getItem("visitedBefore")) {
        localStorage.setItem("visitedBefore", true);
        const currentDate = new Date().toISOString();
        localStorage.setItem("firstVisitDate", currentDate);
        const newUserCount =
          parseInt(localStorage.getItem("newUserCount")) || 0;
        localStorage.setItem("newUserCount", newUserCount + 1);
        getIP();
        console.log("New user visited the website on", currentDate);

      }
    };
    const getIP = async () => {
      await fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          ip = data.ip; console.log(data?.ip?.length > 0 ? "fetched adr" : "unable to fetch adr");
          addNewsItemReq({ ip: ip?.length > 0 ? ip : '' });
        })
        .catch(error => {
          console.error('Error fetching IP3:', error);
        });
    }
    checkIfNewUser();
  }, []);


  const setActiveUserByClick = (item) => {
    setActiveUser(item);
  };

  function postTitleLimit(title, words) {
    const descriptionWords = title?.split(" ");
    if (descriptionWords?.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords?.slice(0, words).join(" ");
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
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hh = date.getHours();
    const mm = date.getMinutes();
    return `${day} ${month} ${year} ${hh}: ${mm}`;
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
    const descriptionWords = description?.split(" ");
    if (descriptionWords?.length <= words) {
      return description;
    } else {
      const truncatedDescription = descriptionWords?.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }


  function extractDescription(description, words = 3) {
    const descriptionWords = description?.split(",");
    if (descriptionWords?.length <= words) {
      return description;
    } else {
      const truncatedDescription = descriptionWords?.slice(0, words).join(", ");
      return `${truncatedDescription}`;
    }
  }

  const isLoggedIn = getToken();
  return (
    <>
      {isLoggedIn ? <Nave /> : <Nave
        audioRef={audioRef}
        togglePlay={togglePlay}
      />}
      <section className="blog-section-area">
        <div className="container">
          <div className="row">

            {/* Left SECTION-01 */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xx-3 blog-left-category">
              <div className="row">
                {/* Chat txtviews AI -  Left Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>TXTVIEWS AI</h2>
                  <InputGroup className="ms-1">
                    <input
                      type="text"
                      className="form-control"
                      ref={aichat}
                      placeholder={" Lets chat or create an image "}
                    />
                    <Button variant="outline-dark" onClick={() => {
                      console.log("chat", aichat.current.value);
                      window.location = "https://ai.txtviews.com/" + aichat.current.value;
                    }}>
                      <Badge bg="dark">
                        <LuCircleArrowRight />

                        <img src={topLogoAI} alt="Logo" width={24} height={24} />
                      </Badge>
                    </Button>
                  </InputGroup>

                  <div className="blog-image-side-text mt-2">
                    <p><i>
                      <FaImage style={{ color: '#0d6efd', marginRight: '6px' }} />
                      Let’s <strong>create an image</strong>,{' '}
                      <FaSearchengin style={{ color: '#198754', margin: '0 6px' }} />
                      <strong>research a topic</strong>, or simply{' '}
                      <FaRobot style={{ color: '#6f42c1', margin: '0 6px' }} />
                      <strong>chat with TXTVIEWS AI</strong> - your all-in-one platform for creativity and insight.

                    </i></p>
                  </div>
                </div>
              </div>


              {/* Twitter Trends - Left Sidebar */}
              {
                (tweetList != undefined && tweetList?.length > 0) &&
                <div className="row">
                  <Link to={`https://x.com/txtviewsai`} target="_blank">
                    <div className="col-12 blog-short-list">
                      <h2>Trending on Twitter</h2>
                      {
                        tweetList && JSON.parse(tweetList?.[0]?.description || [])?.data.slice(0, 10).map((item, i) =>
                          item?.entities?.annotations?.[0]?.type != undefined && item?.entities?.annotations?.[0]?.type != "Other" ?
                            (<div className="row" key={item.id}>
                              <div
                                className="col-12 blog-image-side-text tweet"
                                key={i}
                              >
                                <div className="tweet-trend">
                                  <p>Trending - {`${item?.entities?.annotations?.[0]?.type} | ${item?.entities?.annotations?.[0]?.normalized_text}`}</p>
                                </div>
                                <div className="tweet-text">
                                  <p><FaTwitter /> {truncateDescription(item?.text, 15)}</p>{" "}
                                </div>
                                <div className="tweet-datetime">
                                  <p><FaClock />{" " + formatDateTime(item?.created_at)}</p>
                                </div>
                              </div>
                              <hr />
                              {/* ))} */}
                            </div>)
                            : null
                        )}
                    </div>
                  </Link>
                </div>
              }

              <div className="row">
                {/* Featured Posts - Left Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Featured Posts</h2>
                  {smList && smList.slice(0, 1).map((item, i) => (
                    <div className="blog-image-side" key={item._id}>
                      <div className="row">

                        <div
                          className="col-12"
                          key={i}
                        >
                          <div className="home-page-blog-item">
                            <Link to={`${item.externalURL}`} target="_blank">
                              <div className="blog-image-section">
                                <div className="blog-image-sm">
                                  <img
                                    src={sanitizeImageUrl(BASE_URL + item.coverImage)}
                                    alt={item.title}
                                  />
                                </div>
                                <div className="blog-image-text">
                                  <div className="blog-date">
                                    <p><FaInstagram /> {item.publisher}</p>{" "}
                                    <p><FaClock />{" " + formatDate(item.createDate)}</p>
                                    <p className="text-info">
                                      <LuCircleArrowRight /> Visit
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        {/* ))} */}

                      </div>
                    </div>
                    // </Link>
                  ))}
                </div>
              </div>



              {/* Featured Products - Sidebar */}
              <div className="row">
                {sponsoredProductsEnable && <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Featured Store Products</h2>
                  {productFeaturedItems && productFeaturedItems.slice(0, 1).map((item) => (
                    <Link to={`https://store.txtviews.com/${item._id}`} key={item._id}>
                      <div className="blog-image-side">
                        <div className="row">
                          <div className="col-12">
                            <div className="blog-image-thumbnail blog-image-thumbnail-expanded">
                              <img
                                src={sanitizeImageUrl(
                                  BASE_URL + item.thumbnail
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="blog-image-side-text mt-2">
                              <h2>{postTitleLimit(item.title, 8)}</h2>
                              {/* <p>{truncateDescription(item.description, 10)}</p> */}
                              <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 20) }}></p>
                              <div className="blog-list-page-date">
                                <h2>

                                  <span className="off">
                                    Price
                                    {" " + item.priceCurrency + item.price} <span className={item.soldout ? "admin" : "text-info"}> | {item.soldout ? "SOLD" : "BUY NOW"} </span>
                                  </span>

                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>}
              </div>

              {/* webAdvertisements - Sidebar */}
              <div className="row">
                {webAdvertisementsEnable && <div className="col-12 col-sm-12  col-md-12 col-lg-12  text-center blog-short-list advertisement-list">
                  <span className="text-center">Advertisements</span>
                  {productFeaturedItems && productFeaturedItems.slice(0, 1).map((item) => (
                    <Link to={`https://store.txtviews.com/${item._id}`} key={item._id} >
                      <div className="blog-image-side">
                        <div className="row">
                          <div className="col-12">
                            <div className="blog-image-thumbnail blog-image-thumbnail-expanded">
                              <img
                                src={sanitizeImageUrl(
                                  BASE_URL + item.thumbnail
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="blog-image-side-text mt-2">
                              <h2>{postTitleLimit(item.title, 8)}</h2>
                              <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 20) }}></p>
                              <div className="blog-list-page-date">
                                <h2>

                                  <span className="off">
                                    Price
                                    {" " + item.priceCurrency + item.price} <span className={item.soldout ? "admin" : "text-info"}> | {item.soldout ? "SOLD" : "BUY NOW"} </span>
                                  </span>

                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>}
              </div>

            </div>

            {/* Main SECTION-01 */}
            <div className=" col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xx-6 blog-right-side-show-read">
              {[...webAdminList.slice(0, 1), ...deskList.slice(0, 2)].map((item, i) => (

                <div className="row" key={item._id}>
                  <Link to={`/article/${item._id}`}>
                    <div className="blog-reading-section">
                      <img
                        src={item?.sourced?.length > 0 ? item?.thumbnail :
                          sanitizeImageUrl(BASE_URL + item.coverImage)}
                      />
                      <div className="blog-reading-text-section">
                        <h2>{item.title}</h2>
                        <p>by <span className="text-info">
                          {item.publisher} |
                        </span> {formatDate(item.createDate)}</p>
                        <React.Fragment key={item.title}>
                          <p>{truncateDescription(item.description, 52)}</p>
                        </React.Fragment>
                      </div>
                    </div>
                  </Link>

                  <div className="row blog-footer-section">
                    <div className="col-md-9">
                      <p> <FaTags />  &nbsp; {item.tag && extractDescription(item.tag, 3)}</p>
                    </div>
                    <div className="col-md-3">
                      <Link onClick={() => copyLink(item._id)} className="text-success"> share  <FaSquareShareNodes /></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right SECTION-01 */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xx-3 blog-left-category">
              <div className="row">
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Recent News</h2>
                  {webAdminList.slice(1, 5).map((item, i) => (
                    <div
                      onClick={() => setActiveUserByClick(item)}
                      key={item._id}
                    >
                      <div className="blog-image-side">
                        <div className="row">
                          <Link to={`/article/${item._id}`}>

                            <div className="col-12">
                              <div className="blog-image-thumbnail">
                                <img
                                  src={item?.sourced?.length > 0 ? item?.thumbnail :
                                    sanitizeImageUrl(BASE_URL + item.thumbnail)}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="blog-image-side-text mt-2">
                                <h2>{postTitleLimit(item.title, 7)}</h2>
                                <p>{truncateDescription(item.description, 18)}</p>
                                <div className="blog-list-page-date">
                                  <h2>
                                    by
                                    <span className="text-info">
                                      {/* {item.postCreate} */} {item.publisher} |
                                    </span>
                                    {" " + formatDate(item.createDate)}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </Link>

                        </div>
                      </div>

                    </div>
                  ))}
                </div>


              </div>
            </div>

            <div
              className="separated"
              style={{
                backgroundImage: `url(${separator})`,
              }}
            ></div>

          </div>
        </div>

      </section >


      {sponsoredAdverts && <section className="testimonials-section decreaseIndent">
        <div className="testimonials-content">
          <div className="container">
            <div className="common-home-page-section-title">
              <h2>Sponsored & Partnered Features</h2>
              <p>
                Explore high-quality sponsored articles and advertorials from our partners.{" "}
              </p>
            </div>
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                768: {
                  slidesPerView: 1,
                },
                992: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 2,
                },
                1440: {
                  slidesPerView: 3,
                },
              }}
            >
              {[...BlogItem, ...BlogItem].map((item) => (
                <SwiperSlide className="item-01">
                  <div className="testimonial-item">
                    <div className="blog-image-side">
                      <div className="row">
                        <div className="col-12">
                          <div className="testimonial-blog-image-thumbnail">
                            <img
                              src={sanitizeImageUrl(
                                BASE_URL + item.thumbnail
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="blog-image-side-text mt-2">
                            <h2>{postTitleLimit(item.title, 8)}</h2>
                            <p>{truncateDescription(item.description, 22)}</p>
                            <div className="blog-list-page-date">
                              <h2>
                                {" " + formatDate(item.createDate)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className="text-center text-secondary">
                      <i>
                        " Meet Mr. Darth Vader the 2nd "
                      </i>
                    </span>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>


            <div
              className="separated"
              style={{
                backgroundImage: `url(${separator})`,
              }}
            ></div>

          </div>
        </div>
      </section>}

      <section className="home-page-section-02">
        <div className="container">
          <div className="home-page-section-title">
            <h2>Featured Stories</h2>
            <span className="text-info">Where ideas meet insight - browse our collection of expert blogs, smart podcasts, and original stories.</span>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-10">
              <div className="row">
                {editorialList.map((item, i) => (
                  <div key={"featuredlist" + i} className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                    <Link to={`/article/${item._id}`}>
                      <div className="section-02-cart-area">

                        <div className="blog-image-side">
                          <div className="row">
                            <div className="col-12">
                              <div className="blog-image-thumbnail">
                                {(item.newListing) || (<div className="product-tag text-center">
                                  <HiChevronDoubleUp /></div>)}
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
                                <div dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 22) }}></div>
                                <div className="blog-list-page-date">
                                  <h2>
                                    by
                                    <span className="text-info">
                                      TXTVIEWS Editor |
                                    </span>
                                    {"  " + formatDate(item.createDate)}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="home-footer-section ">
        <Footer
          audioRef={audioRef}
          togglePlay={togglePlay}
        />
      </section>

      <div className="fab-insta">
        <a href="https://chat.txtviews.com" target="_blank"><FaFacebookMessenger /></a>
      </div>

    </>
  );
};

export default HomeComponent2;
