/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { getToken } from "../../../helper/Session";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowTrendUp, FaCartShopping } from "react-icons/fa6";
import { FaChevronCircleUp, FaFreeCodeCamp } from "react-icons/fa";

import getBaseUrl from "../../../helper/BackendConnect";

const token = getToken();
const BASE_URL = getBaseUrl();

const ProductItem = ({ product }) => {

  const navigate = useNavigate();
  const onClickHandler = () => {
    if (!token) {
      navigate("/login/item");
    }
  };
  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  return (
    <>
      <div key={"buyproducts" + product._id} className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <Link to={`/productDetailsPage/${product._id}`} className="px-4 py-4">
          <div className={`section-02-cart-area text-center ${product.soldout ? "soldcard" : ""}`}>
            <div className="row">
              <div className="sec-02-card">
                {(product.soldout || product.newListing) && (<div className={product.soldout ? "product-tag sold" : "product-tag"}>
                  {product.soldout ? "SOLD " : product.newListing ? "NEW" : null} {product.newListing && !product.soldout ? (<FaChevronCircleUp />) : null}
                </div>)}
                <img src={sanitizeImageUrl(BASE_URL + product.thumbnail)} />
              </div>
              <div className="align-self-end sec-02-card-body text-center">
                <h2>{product.title}</h2>
                <p>
                  <del>{product.off > 0.0 && product.priceCurrency + product.price}</del> {product.priceCurrency + (product.price * (100 - product.off) / 100)}
                  {product.off > 0.0 && (<b className="off"> &nbsp;{product.off}% OFF  <FaArrowTrendUp /></b>)}
                </p>
              </div>
              <div className="nave-join-popup text-center" onClick={() => console.log("buynow")}>
                BUY &nbsp;<FaCartShopping /> &nbsp;( {product.priceCurrency + (product.price * (100 - product.off) / 100)} Only)
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

// Prop types validation for ProductItem component
ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    off: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const ProductsList = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const searchProductTotal = useSelector((state) => state.product.searchProductTotal);
  const total = useSelector((state) => state.product.total);
  const perPage = 6;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productItems = useSelector((state) => state.product.list);
  const searchProductList = useSelector((state) => state.product.searchProductList);

  const [searchKeyword, setSearchKeyword] = useState("0");
  const [deafaultProducts, setDeafaultProducts] = useState(productItems || []);
  const [priceUpProducts, setPriceUpProducts] = useState(productItems || []);
  const [priceDownProducts, setPriceDownProducts] = useState(productItems || []);

  useEffect(() => {
    const pu = productItems.toSorted((a, b) => a.price - b.price);
    const pd = productItems.toSorted((a, b) => b.price - a.price);
    const listItems = productItems?.slice(0, perPage);
    const listItems1 = pu?.slice(0, perPage);
    const listItems2 = pd?.slice(0, perPage);
    setDeafaultProducts(listItems);
    setPriceDownProducts(listItems2);
    setPriceUpProducts(listItems1);

  }, [searchProductList, productItems]);


  const isLoggedIn = getToken();

  const handlePageClick = async (event, key) => {
    console.log('event pgc', event.selected, key)
    if (key == "default") {
      const listItems = productItems?.slice(event.selected * perPage, perPage * (event.selected + 1));
      setDeafaultProducts(listItems)
    }
    else if (key == "ascending") {
      const pu = productItems.toSorted((a, b) => a.price - b.price);
      const listItems = pu?.slice(event.selected * perPage, perPage * (event.selected + 1));
      setPriceUpProducts(listItems)
    }
    else if (key == "descending") {
      const pd = productItems.toSorted((a, b) => b.price - a.price);
      const listItems = pd?.slice(event.selected * perPage, perPage * (event.selected + 1));
      setPriceDownProducts(listItems)
    }
  };

  const handleProductItemClick = (id) => {
    console.log('click', id)
  }

  return (
    <>
      <div className="container">
        <div className="subscription-plan mb-5">
          <div className="common-home-page-section-title">
            {/* <p>TXTVIEWSAI FEATURES LIST</p> */}
            <h2>Best Buy</h2>
            <p>
              Buy unique products hassel free at best price! Money Back guarantee on Non-Delivery.<sup>*</sup>
            </p>
          </div>

          <Tabs
            defaultActiveKey="FilterDefault"
            transition={false}
            id="Naomi-tab-example"
            className="price-membership"
          >
            <Tab eventKey="FilterDefault" title="New">
              <div className="row">
                {deafaultProducts?.map((item) => (
                  <ProductItem
                    key={item._id}
                    product={item}
                    onClick={() => handleProductItemClick(item._id)}
                  />
                ))}
                <div className="col-12 rp-center text-center">
                  <nav aria-label="Page navigation text-center">
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
                      onPageChange={e => handlePageClick(e, "default")}
                      containerClassName="pagination"
                      activeClassName="active"
                    />
                  </nav>
                </div>
              </div>
            </Tab>
            <Tab eventKey="FilterAscending" title="Price &#x2191;">
              <div className="row">
                {priceUpProducts?.map((item) => (
                  <ProductItem
                    key={item._id}
                    product={item}
                    onClick={() => handleProductItemClick(item._id)}
                  />
                ))}

                <div className="col-12 rp-center text-center">
                  <nav aria-label="Page navigation text-center">
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
                      onPageChange={e => handlePageClick(e, "ascending")}
                      containerClassName="pagination"
                      activeClassName="active"
                    />
                  </nav>
                </div>
              </div>
            </Tab>
            <Tab eventKey="FilterDiscending" title="Price &#x2193;">
              <div className="row">
                {priceDownProducts?.map((item) => (
                  <ProductItem
                    key={item._id}
                    product={item}
                    onClick={() => handleProductItemClick(item._id)}
                  />
                ))}

                <div className="col-12 rp-center text-center">
                  <nav aria-label="Page navigation text-center">
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
                      onPageChange={e => handlePageClick(e, "descending")}
                      containerClassName="pagination"
                      activeClassName="active"
                    />
                  </nav>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
