/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  updateAssistantAdvanceSetting,
  getAssistAdvanceModelReq,
} from "../API/Api";
import { toast } from "react-toastify";
import { isEmpty } from "../helper/Validation";
import { useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
const SettingPopup = ({ isPopupOpen, onClose, selectedId, userEmail }) => {
  const [token, setToken] = useState();
  const [randomness, setRandomness] = useState();
  const [frequencyPenalty, setFrequencyPenalty] = useState();
  const [presencePenalty, setPresencePenalty] = useState();
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    getAssistAdvanceModelReq(selectedId);
  }, []);

  const editAssistantData = useSelector(
    (state) => state.assistantStore.getAssistantModelData
  );
  useEffect(() => {
    if (editAssistantData) {
      setSelectedModel(editAssistantData.selectedModel);
      setPromptText(editAssistantData.promptText);
      setToken(editAssistantData.token);
      setFrequencyPenalty(editAssistantData.frequencyPenalty);
      setPresencePenalty(editAssistantData.presencePenalty);
      setRandomness(editAssistantData.randomness);
    }
  }, [editAssistantData]);
  const keepLogin = () => {
    if (isEmpty(promptText)) {
      toast.error("Prompt is Required");
    } else {
      setLoading(true);
      const data = {
        userEmail,
        selectedId,
        randomness,
        frequencyPenalty,
        presencePenalty,
        promptText,
        token,
        selectedModel,
      };
      updateAssistantAdvanceSetting(data)
        .then((Result) => {
          if (Result === true) {
            getAssistAdvanceModelReq();
            setLoading(false);
            toast.success("update successfully");
          } else {
            setLoading(false);
            toast.error("Failed to Login. Please try again.");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Request failed. Please try again.");
          console.error(error);
        });
    }
  };
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
  const handlePromptText = (e) => {
    const promptText = e.target.value;
    setPromptText(promptText);
  };
  return (
    <>
      <div className={`popup-container ${isPopupOpen ? "active" : ""}`}>
        <section
          className="popup-login-section popup-setting-content"
          data-aos="zoom-in"
        >
          <div className="row">
            <div className="popup-close-button">
              <button onClick={onClose}>
                <FaWindowClose />
              </button>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4 popup-login-section">
              <label className="input-title">AI Model</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleModelChange}
                value={selectedModel}
              >
                <option selected>Select TXTVIEWS AI Model</option>
                <option value="gpt-4-0125-preview">gpt-4-0125-preview</option>
                <option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option>
                <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
                <option value="gpt-4-vision-preview">
                  gpt-4-vision-preview
                </option>
                <option value="gpt-4-1106-vision-preview">
                  gpt-4-1106-vision-preview
                </option>
                <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
              </select>
            </div>

            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 popup-login-section">
              <div className="chat-setting-input-field">
                <label className="input-title">Randomness</label>
                <input
                  className="number-input-field"
                  type="number"
                  value={randomness}
                  onChange={handleRandomnessChange}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 popup-login-section">
              <div className="chat-setting-input-field">
                <label className="input-title">Frequency penalty</label>
                <input
                  className="number-input-field"
                  type="number"
                  value={frequencyPenalty}
                  onChange={handleFrequencyPenalty}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 popup-login-section">
              <div className="chat-setting-input-field">
                <label className="input-title">Presence penalty</label>

                <input
                  className="number-input-field"
                  type="number"
                  value={presencePenalty}
                  onChange={handlePresencePenalty}
                  step={0.1}
                  min="0.1"
                  max="2"
                  placeholder="0.7"
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 popup-login-section">
              <div className="chat-setting-input-field">
                <label className="input-title">Maximum length</label>
                <input
                  className="number-input-field"
                  type="number"
                  value={token}
                  onChange={handleTokenChange}
                  placeholder="300"
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 popup-login-section">
              <div className="chat-setting-input-field">
                <label className="input-title">Train your agent</label>
                <textarea
                  value={promptText}
                  onChange={handlePromptText}
                ></textarea>
              </div>
            </div>
            <div className="login-button">
              <button onClick={keepLogin} disabled={loading}>
                {loading ? (
                  <>
                    <PulseLoader
                      color="#ffffff"
                      size={11}
                      speedMultiplier={1}
                    />
                    <span style={{ marginLeft: "5px" }}></span>
                  </>
                ) : (
                  "Update "
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SettingPopup;
