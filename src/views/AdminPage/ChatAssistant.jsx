// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import {
  createAssistantReq,
  getAssistantListReq,
  assistantDataUpdateReq,
} from "../../API/Api";
import { useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoInformationCircle } from "react-icons/io5";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editUser, editUser } from "../../constant/Form";

const ChatAssistant = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
    if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==editUser || getUser?.[0]?.email == editUser))
    {
      navigate("/homepage");
      return (<><span>"Error"</span></>);
    }
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [packageType, setPackageType] = useState("");
  const assistant_title = useRef();
  const prompt_description = useRef();
  const assistant_name = useRef();
  const assistant_icon = useRef();
  const brand_icon = useRef();
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(25);
  const [selectedModel, setSelectedModel] = useState("");
  const [token, setToken] = useState();
  const [randomness, setRandomness] = useState();
  const [frequencyPenalty, setFrequencyPenalty] = useState();
  const [presencePenalty, setPresencePenalty] = useState();
  const [editAssistantData, setEditAssistantData] = useState({});

  const allAssistant = useSelector(
    (state) => state.assistantStore.assistantTableAdmin
  );
  useEffect(() => {
    getAssistantListReq(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);

  useEffect(() => {
    const matchedAssistant = allAssistant.find((item) => item._id === id);
    if (matchedAssistant) {
      setEditAssistantData(matchedAssistant);
    }
  }, [allAssistant, id, setEditAssistantData]);

  const handleSubmitUpdateAssistantInfo = async (id) => {
    const title = assistant_title.current.value;
    const promptDescription = prompt_description.current.value;
    const assistantName = assistant_name.current.value;
    const assistantIcon = assistant_icon.current.value;
    const brandIcon = brand_icon.current.value;
    const data = {
      id,
      assistantIcon,
      assistantName,
      title,
      category,
      packageType,
      promptDescription,
      brandIcon,
      selectedModel,
      token,
      randomness,
      frequencyPenalty,
      presencePenalty,
    };
    try {
      const response = await assistantDataUpdateReq(data);
      if (response) {
        toast.success("Assistant updated successfully");
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleSubmitCreateAssistantInfo = async () => {
    const title = assistant_title.current.value;
    const promptDescription = prompt_description.current.value;
    const assistantName = assistant_name.current.value;
    const assistantIcon = assistant_icon.current.value;
    const brandIcon = brand_icon.current.value;
    try {
      if (
        !assistantName ||
        !packageType ||
        !title ||
        !assistantIcon ||
        !promptDescription ||
        !brandIcon ||
        !category ||
        !selectedModel
      ) {
        toast.error("All fields are required");
      } else {
        const data = {
          assistantIcon,
          assistantName,
          title,
          category,
          packageType,
          promptDescription,
          brandIcon,
          selectedModel,
          token,
          randomness,
          frequencyPenalty,
          presencePenalty,
        };

        const response = await createAssistantReq(data);
        if (response) {
          toast.success("Assistant created successfully");
          assistant_title.current.value = "";
          setPackageType("");
          setCategory("");
          await getAssistantListReq(1, perPage, searchKeyword);
        } else {
          toast.error("Failed to save data");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    if (editAssistantData) {
      setPackageType(editAssistantData.packageType);
      setCategory(editAssistantData.category);
    }
  }, [editAssistantData]);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  const handleRandomnessChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0.1 && newValue <= 2) {
      setRandomness(newValue);
    } else {
      console.error("Invalid input value:", e.target.value);
    }
  };
  const handleFrequencyPenalty = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0.1 && newValue <= 2) {
      setFrequencyPenalty(newValue);
    } else {
      console.error("Invalid input value:", e.target.value);
    }
  };
  const handlePresencePenalty = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0.1 && newValue <= 2) {
      setPresencePenalty(newValue);
    } else {
      console.error("Invalid input value:", e.target.value);
    }
  };
  const handleTokenChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (/^\d*$/.test(e.target.value) && newValue >= 0 && newValue <= 4094) {
      setToken(newValue);
    } else {
      console.error("Invalid input value:", e.target.value);
    }
  };
  const cancelHandle = () => {
    navigate("/defaultChatAssistant");
  };
  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Create AI Chat Assistant</h2>
        <p style={{color:"red"}}>
        This section isn't activated yet. Please don't create any Listing yet! 
        </p>
      </div>

      <form className="row pt-2 justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-8 blog-page-field mb-5">
          <div className="cancel-admin-button">
            <button onClick={cancelHandle}>Cancel</button>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="assistant_icon" className="form-label">
                Assistant Icon
              </label>
              <input
                type="text"
                ref={assistant_icon}
                className="form-control"
                placeholder='<i class="fa-brands fa-facebook"></i>'
                id="assistant_icon"
                defaultValue={editAssistantData.assistantIcon}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="assistant_name" className="form-label">
                Assistant Name
              </label>
              <input
                type="text"
                ref={assistant_name}
                className="form-control"
                id="assistant_name"
                defaultValue={editAssistantData.assistantName}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="assistant_title" className="form-label">
                Assistant Title
              </label>
              <input
                type="text"
                ref={assistant_title}
                className="form-control"
                id="assistant_title"
                defaultValue={editAssistantData.title}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4 pt-4">
              <label className="form-label">Model</label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={handleModelChange}
                defaultValue={editAssistantData.selectedModel}
              >
                <option selected disabled>
                  Select TXTVIEWS AI Model
                </option>
                <optgroup label="GPT-4o">
                  <option value="gpt-4o">gpt-4o</option>
                </optgroup>

                <optgroup label="GPT-4">
                  <option value="gpt-4-0125-preview">gpt-4-0125-preview</option>
                  <option value="gpt-4-turbo-preview">
                    gpt-4-turbo-preview
                  </option>
                  <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
                  <option value="gpt-4-vision-preview">
                    gpt-4-vision-preview
                  </option>
                  <option value="gpt-4-1106-vision-preview">
                    gpt-4-1106-vision-preview
                  </option>
                </optgroup>

                <optgroup label="GPT-3">
                  <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                  <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
                </optgroup>
                <optgroup label="DALL.E-3">
                  <option value="dall-e-3">dall-e-3</option>
                  <option value="dall-e-2">dall-e-2</option>
                </optgroup>
                <optgroup label="TTS Model">
                  <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                  <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
                </optgroup>
                <optgroup label="Vision Model">
                  <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                  <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
                </optgroup>
              </select>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2">
              <div className="chat-setting-input-field">
                <label className="form-label">Randomness</label>
                <input
                  className="number-input-field"
                  type="number"
                  defaultValue={editAssistantData.randomness}
                  value={randomness}
                  onChange={handleRandomnessChange}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-2">
              <div className="chat-setting-input-field">
                <label className="form-label">Frequency penalty</label>
                <input
                  className="number-input-field"
                  type="number"
                  defaultValue={editAssistantData.frequencyPenalty}
                  value={frequencyPenalty}
                  onChange={handleFrequencyPenalty}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-3">
              <div className="chat-setting-input-field">
                <label className="form-label">Presence penalty</label>

                <input
                  className="number-input-field"
                  type="number"
                  defaultValue={editAssistantData.presencePenalty}
                  value={presencePenalty}
                  onChange={handlePresencePenalty}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-3">
              <div className="chat-setting-input-field">
                <label className="form-label">Maximum length</label>
                <input
                  className="number-input-field"
                  type="number"
                  defaultValue={editAssistantData.token}
                  value={token}
                  onChange={handleTokenChange}
                  placeholder="300"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="inputGroupSelect01" className="form-label">
                Assistant Group
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={editAssistantData.category}
              >
                <option value="">Select Group</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Specialist">Specialist</option>
                <option value="Instructor">Instructor</option>
                <option value="other">others</option>
              </select>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="packageType" className="form-label">
                Select Package
              </label>
              <select
                className="form-select"
                id="packageType"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              >
                <option value="">Select Package</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="brand_icon" className="form-label">
                Brand Icon{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      The temperature parameter balances creativity Lower
                      temperatures yield predictable
                    </Tooltip>
                  }
                >
                  <span>
                    <IoInformationCircle />
                  </span>
                </OverlayTrigger>
              </label>
              <input
                type="text"
                ref={brand_icon}
                className="form-control"
                placeholder='<i class="fa-brands fa-facebook"></i>'
                id="brand_icon"
                defaultValue={editAssistantData.brandIcon}
              />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-4">
              <label htmlFor="prompt_description" className="form-label">
                Prompt Description
              </label>
              <textarea
                type="text"
                className="form-control"
                rows="8"
                id="prompt_description"
                ref={prompt_description}
                defaultValue={
                  editAssistantData ? editAssistantData.promptDescription : ""
                }
              />
            </div>
            <Button
              className="admin-plan-button mt-5 pt-3 pb-3"
              onClick={() => {
                if (editAssistantData && editAssistantData._id) {
                  handleSubmitUpdateAssistantInfo(editAssistantData._id);
                } else {
                  handleSubmitCreateAssistantInfo();
                }
              }}
            >
              {editAssistantData && editAssistantData._id
                ? "Update Assistant"
                : "Create Assistant "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatAssistant;
