/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { languages, pageTitle } from "../../../constant/Form";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import { useSelector } from "react-redux";
import { getImageDataListReq, getAllAssistantUserReq } from "../../../API/Api";
import { setAffiliate } from "../../../helper/Session";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import AssistantCard from "../../../components/AssistantCard";

const AIAssistant = () => {
  const [selectedVipAssistant, setSelectedVipAssistant] = useState([]);
  const [selectedPremiumAssistant, setSelectedPremiumAssistant] = useState([]);

  useEffect(() => {
    const checkIfNewUser = () => {
      if (!localStorage.getItem("visitedBefore")) {
        localStorage.setItem("visitedBefore", true);
        const currentDate = new Date().toISOString();
        localStorage.setItem("firstVisitDate", currentDate);
        const newUserCount =
          parseInt(localStorage.getItem("newUserCount")) || 0;
        localStorage.setItem("newUserCount", newUserCount + 1);

        console.log("New user visited the website on", currentDate);
      }
    };

    checkIfNewUser();
  }, []);

  let params = new URLSearchParams(window.location.search);
  let ref = params.get("ref");
  useEffect(() => {
    getImageDataListReq();
    setAffiliate(ref);
  }, []);
  useEffect(() => {
    getAllAssistantUserReq();
  }, []);
  const commonAssistant = useSelector(
    (state) => state.assistantStore.commonAssistant
  );
  const getUser = useSelector((state) => state.profile.userData);
  useEffect(() => {
    if (getUser && getUser.length > 0) {
      const selectedVIPAssistantArray = getUser[0]?.selectedVIPAssistant;
      if (selectedVIPAssistantArray && selectedVIPAssistantArray.length > 0) {
        const iconsAndNames = selectedVIPAssistantArray.map((assistant) => ({
          value: assistant.value,
          assistantIcon: assistant.assistantIcon,
          assistantName: assistant.assistantName,
          assistantCategory: assistant.assistantCategory,
        }));
        setSelectedVipAssistant(iconsAndNames);
      }
    }
  }, [getUser]);

  useEffect(() => {
    if (getUser && getUser.length > 0) {
      const selectedPremiumAssistantArray =
        getUser[0]?.selectedPremiumAssistant;
      if (
        selectedPremiumAssistantArray &&
        selectedPremiumAssistantArray.length > 0
      ) {
        const iconsAndNames = selectedPremiumAssistantArray.map(
          (assistant) => ({
            value: assistant.value,
            assistantIcon: assistant.assistantIcon,
            assistantName: assistant.assistantName,
            assistantCategory: assistant.assistantCategory,
          })
        );
        setSelectedPremiumAssistant(iconsAndNames);
      }
    }
  }, [getUser]);

  const navigate = useNavigate();
  const handleClickChat = () => {
    navigate("/login/item");
  };
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const [flagName, setFlagName] = useState(
    localStorage.getItem("language") || "en"
  );
  const { t } = useTranslation();
  useEffect(() => {
    localStorage.setItem("language", flagName);
  }, [flagName]);
  useEffect(() => {
    localStorage.setItem("language", flagName);
  }, [flagName]);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = pageTitle;
  }, [currentLanguage, t]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [text] = useTypewriter({
    words: [
      "Assistant",
      "Image Generator",
      "Article Writer",
      "Text to Audio",
      "Audio To Text",
      "Code Generate",
      "ChatBot",
      "Affiliate Program",
    ],
    loop: 400,
    typeSpeed: 140,
    deleteSpeed: 240,
  });

  // text slider
  const scrollContainerRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [cursorOnSlider, setCursorOnSlider] = useState(false);
  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  useEffect(() => {
    if (!cursorOnSlider) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return stopAutoScroll;
  }, [cursorOnSlider]);

  const startAutoScroll = () => {
    if (scrollContainerRef.current) {
      setAutoScrollInterval(
        setInterval(() => {
          if (
            scrollContainerRef.current &&
            scrollContainerRef.current.scrollLeft +
            scrollContainerRef.current.offsetWidth >=
            scrollContainerRef.current.scrollWidth
          ) {
            scrollContainerRef.current.scrollLeft = 0;
          } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 1;
          }
        }, 30)
      );
    }
  };

  const onClickHandler = async (item) => {
    const { _id, packageType, category } = item;

    // For VIP assistants
    if (selectedVipAssistant.some((assistant) => assistant.value === _id)) {
      if (category === "common" || category === "Article") {
        navigate(`/liveChat/${_id}`);
      } else if (category === "Image") {
        navigate(`/imageGenerate/${_id}`);
      } else if (category === "Imagination") {
        navigate(`/imaginationImage/${_id}`);
      } else if (category === "ImageCaption") {
        navigate(`/imageCaptioning/${_id}`);
      }
    } else if (
      selectedPremiumAssistant.some((assistant) => assistant.value === _id)
    ) {
      // For Premium assistants
      if (category === "common" || category === "Article") {
        navigate(`/liveChat/${_id}`);
      } else if (category === "Image") {
        navigate(`/imageGenerate/${_id}`);
      } else if (category === "Imagination") {
        navigate(`/imaginationImage/${_id}`);
      } else if (category === "ImageCaption") {
        navigate(`/imageCaptioning/${_id}`);
      }
    } else if (packageType === "Free") {
      // For Free assistants
      if (category === "Imagination") {
        navigate(`/imaginationImage/${_id}`);
      } else if (category === "Image") {
        navigate(`/imageGenerate/${_id}`);
      } else if (category === "ImageCaption") {
        navigate(`/imageCaptioning/${_id}`);
      } else {
        navigate(`/liveChat/${_id}`);
      }
    } else {
      navigate(`/Membership`);
      toast.error("Please update your package.");
    }
  };
  return (
    <>
      <NavBar expand="md" className={scrolled ? "scrolled" : ""} />
      <section className="home-02-assistant-section pt-5">
        <div className="container">
          <div className="row">
            <div className="common-home-page-section-title">
              <h2>chat with our AI Team</h2>
              <p>
                Thousands of entrepreneurs, agencies, and marketers use NimbleAI
                to streamline and automate their content marketing.{" "}
              </p>
            </div>
            {commonAssistant &&
              [...commonAssistant]
                .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                .map((item, i) => (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
                    onClick={() => onClickHandler(item, i)}
                  >
                    <div className="custom-cart">
                      <AssistantCard
                        id={item._id}
                        title={item.assistantName}
                        photo={
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.assistantIcon,
                            }}
                          />
                        }
                        desc={item.title}
                        packageType={item.packageType}
                        favorite={item.favorite}
                        brandIcon={
                          <span
                            dangerouslySetInnerHTML={{ __html: item.brandIcon }}
                          />
                        }
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default AIAssistant;
