import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { toast } from "react-toastify";
import { Button, Nav } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { downloadTextFile } from "../../helper/ConvertText";
import { useSelector } from "react-redux";
import { downloadPdfFile } from "../../helper/DownloadFile";
import { AiOutlineCloseSquare, AiOutlineCopyright } from "react-icons/ai";
import {
  paraphraseTextReq,
  getUserDetailsReq,
  getTotalLimitReq,
} from "../../API/Api";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";

const Paraphraser = () => {
  const navigate = useNavigate();
  let editor = useRef(null);
  const [socialContent, setSocialContent] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const packageValue = useSelector((state) => state.packageLimit.list);
  const getUser = useSelector((state) => state.profile.userData);
  const [originalText, setOriginalText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");

  useEffect(() => {
    getTotalLimitReq();
  }, []);
  // Copy function
  const handelCopy = (message) => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      })
      .catch(() => {
        toast.error("Copy failed!");
      });
  };

  //download text
  const handleText = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = socialContent;
    const text = tempDiv.textContent || tempDiv.innerText;
    downloadTextFile("chat.txt", text);
  };
  const handelPDF = () => {
    const textPdf = socialContent;
    downloadPdfFile(textPdf);
  };
  //handle main request
  const handelRequest = async () => {
    try {
      setLoading(true);

      const response = await paraphraseTextReq({ originalText });
      if (response && response.data) {
        setParaphrasedText(response.data.data);
        getUserDetailsReq();
        setLoading(false);
        toast.success("generated successfully");
        setLoading(false);
      } else if (response === 402) {
        toast.error("Please Update Your Package");
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error: No data in the response");
        toast.error("No data in the response");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error paraphrasing text:", error);
    }
  };
  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Text Paraphraser</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="pt-4 mb-5 article-generate-section">
        <div className="row" id="content">
          <div className="col-md-12 col-lg-5 input-body">
            <div className="">
              <div className="code-credit-limit-section">
                {getUser.map((item, id) => (
                  <div key={id}>
                    <div className="credit-title">
                      <h2>
                        Credit of Paraphraser :{" "}
                        {packageValue.textToParaphraserLimit}
                      </h2>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                            (item.apiUseTextToParaphraserLimit /
                              packageValue.textToParaphraserLimit) *
                            100
                          }%`,
                        }}
                        aria-valuenow={item.apiUseTextToParaphraserLimit}
                        aria-valuemin="0"
                        aria-valuemax={packageValue.textToParaphraserLimit}
                      >
                        {Math.round(
                          (item.apiUseTextToParaphraserLimit /
                            packageValue.textToParaphraserLimit) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form>
                <div className="mb-3">
                  <label className="form-label pb-1">
                    Input Paraphraser Text
                  </label>

                  <br />
                  <textarea
                    className="Paraphraser-textarea"
                    placeholder="Input your text what you want rewrite"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                  />
                </div>
                <button
                  onClick={handelRequest}
                  disabled={loading}
                  className="form-btn"
                >
                  {loading ? (
                    <>
                      <ScaleLoader
                        color="#FFF"
                        height={15}
                        radius={10}
                        width={3}
                      />
                      <span style={{ marginLeft: "5px" }}></span>
                    </>
                  ) : (
                    "Text Paraphraser"
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-12 col-lg-7 ">
            <div className="editor-head mb-2">
              <h5>Result</h5>
              <div className="Chat-header">
                <Nav className="chat">
                  <Nav.Link
                    eventKey="1"
                    className="copy-btn article-tooltip-icon"
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{"Copy"}</Tooltip>}
                    >
                      <div className="copy-button-article">
                        {isCopy ? (
                          <LuCopyCheck />
                        ) : (
                          <AiOutlineCopyright
                            onClick={() =>
                              handelCopy(socialContent.replace(/<[^>]+>/g, ""))
                            }
                          />
                        )}
                      </div>
                    </OverlayTrigger>
                  </Nav.Link>

                  <Nav.Link
                    eventKey="2"
                    className=" article-tooltip-icon"
                    onClick={() => handleText(socialContent)}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{"Download Text"}</Tooltip>}
                    >
                      <Button>
                        <BsFillFileEarmarkTextFill />
                      </Button>
                    </OverlayTrigger>
                  </Nav.Link>

                  <Nav.Link
                    eventKey="3"
                    className=" article-tooltip-icon"
                    onClick={handelPDF}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{"Download PDF"}</Tooltip>}
                    >
                      <Button>
                        <FaFilePdf />
                      </Button>
                    </OverlayTrigger>
                  </Nav.Link>
                  <Nav.Link
                    eventKey="1"
                    className=" article-tooltip-icon"
                    onClick={() => navigate("/")}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{"Close"}</Tooltip>}
                    >
                      <Button>
                        <AiOutlineCloseSquare />
                      </Button>
                    </OverlayTrigger>
                  </Nav.Link>
                </Nav>
              </div>
            </div>
            <div>
              <JoditEditor
                ref={editor}
                value={paraphrasedText}
                tabIndex={1}
                onChange={(newContent) => setSocialContent(newContent)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paraphraser;
