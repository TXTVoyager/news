import React, { useState } from "react";
import {topLogo} from "../assets/index";
const HomeTabsSection = () => {
  const [activeTab, setActiveTab] = useState("Text To Image");
  const renderContent = () => {
    switch (activeTab) {
      case "Text To Image":
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xx-6 home-table-image">
                  <img src={topLogo} />
                  <p className="pt-2">
                    Ideate, create, and publish powered by TXTVIEWS AI
                  </p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xx-6 home-table-image-body">
                  <p>Unleash your imagination!. AI </p>
                  <h2>Generate striking images and drawings. </h2>
                  <p>
                    Transform your words into stunning visuals with our
                    cutting-edge "Text to Image" feature powered by DALL·E 3.
                    This advanced AI interprets descriptive text to render
                    detailed, high-quality images, making it a powerful tool for
                    artists, designers, and content creators. Experience
                    unparalleled precision and artistry, and discover endless
                    possibilities for visual creation with DALL·E 3.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case "AI Article generate":
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image">
                  <img src={serviceImageArticle} />
                  <p className="pt-2">
                    {" "}
                    Select, Text input , publish. powered by TXTVIEWS AI
                  </p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image-body">
                  <p>Text To Article!. AI </p>
                  <h2>Text-to-Article Feature</h2>
                  <p>
                    Introducing our text-to-article feature, powered by GPT-4
                    and GPT-4o. This tool converts brief prompts into
                    high-quality articles, perfect for bloggers, marketers,
                    researchers, and businesses. Customize tone, style, and
                    length for blogs, reports, and more. Save time and boost
                    productivity with precise and relevant content using our
                    advanced technology.
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "AI speech to Text":
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image">
                  <img src={serviceImageAudio} />

                  <p className="pt-2"> Speech-to-Text Powered by TXTVIEWS AI</p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image-body">
                  <p>Speech-to-Text!. AI </p>
                  <h2>Speech-to-Text Converter with GPT Model TTS</h2>
                  <p>
                    Introducing the SmartSpeech Converter, powered by GPT-TTS.
                    Convert speech to text with pinpoint accuracy and enhance
                    interactions using GPT intelligence. Perfect for
                    professionals and creatives, streamline your workflow with
                    ease.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case "AI Chatbot":
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image">
                  <img src={serviceImageChat} />
                  <p className="pt-2"> AI Chatbot Powered by TXTVIEWS AI</p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image-body">
                  <p>AI chatbot!. AI </p>
                  <h2>Introducing your latest virtual assistant.</h2>
                  <p>
                    The AI Chatbot powered by TXTVIEWS AI, using GPT-4, engages in
                    human-like interactions with remarkable fluency. It answers
                    questions, provides recommendations, and assists with
                    various tasks, making it ideal for customer service,
                    personal assistance, and educational support. This versatile
                    tool enhances communication and productivity across numerous
                    fields.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      case "AI Code Generate":
        return (
          <>
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image">
                  <img src={serviceImageCode} />
                  <p className="pt-2">
                    {" "}
                    generate, fix, improve Powered by TXTVIEWS AI
                  </p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 home-table-image-body">
                  <p>AI Code Generate.</p>
                  <h2>Quickly generate high-quality code.</h2>
                  <p>
                    TXTVIEWS AI's AI code generation tool understands natural
                    language prompts to help developers write code efficiently.
                    It generates snippets, completes functions, and debugs
                    across languages and frameworks, streamlining coding and
                    boosting productivity. Continuous improvements make it
                    indispensable in programming.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-buttons">
        <button
          className={`tab-button ${
            activeTab === "Text To Image" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Text To Image")}
        >
          Text To Image
        </button>
        <button
          className={`tab-button ${
            activeTab === "AI Article generate" ? "active" : ""
          }`}
          onClick={() => setActiveTab("AI Article generate")}
        >
          AI Article generate
        </button>

        <button
          className={`tab-button ${
            activeTab === "AI speech to Text" ? "active" : ""
          }`}
          onClick={() => setActiveTab("AI speech to Text")}
        >
          AI speech to Text
        </button>
        <button
          className={`tab-button ${activeTab === "AI Chatbot" ? "active" : ""}`}
          onClick={() => setActiveTab("AI Chatbot")}
        >
          AI Chatbot
        </button>
        <button
          className={`tab-button ${
            activeTab === "AI Code Generate" ? "active" : ""
          }`}
          onClick={() => setActiveTab("AI Code Generate")}
        >
          AI Code Generate
        </button>
      </div>
      <div className="tabs-content">{renderContent()}</div>
    </div>
  );
};

export default HomeTabsSection;
