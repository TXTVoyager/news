// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { languages, pageTitle } from "../constant/Form";
import getBaseUrl from "../helper/BackendConnect";
import { toast } from "react-toastify";
import { FaCircleInfo } from "react-icons/fa6";
import Carousel from 'react-bootstrap/Carousel';

const BASE_URL = getBaseUrl();


const CarouselProducts = ({ slides }) => {

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = pageTitle;
  }, [currentLanguage, t]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {slides && slides.map((slideItem, i) => (<Carousel.Item key={"carouselgallery" + i}>
          <img
            className="d-block w-100"
            alt="First Slide Image"
            key={"carouselGalleryImage" + i}
            src={sanitizeImageUrl(BASE_URL + slideItem.path)} />
          {slideItem.details && slideItem.details.length > 1 && (<Carousel.Caption className="carousel-overlay-text">
            {/* <h3>{slideItem.details}</h3> */}
            <span> <FaCircleInfo /> &nbsp;  {slideItem.details}</span>
          </Carousel.Caption>)}
        </Carousel.Item>))}

      </Carousel>
    </>
  );
};
export default CarouselProducts;
