import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { createSmtpInfoReq, getSmtpDataReq } from "../../API/Api";
import { useSelector } from "react-redux";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";

const SmtpSetting = () => {
  const navigate=useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || getUser?.[0]?.email!=editUser  || getUser?.[0]?.email != editUser)
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const editBlogData = useSelector((state) => state.profile.smtpDataAll);
  const [showPassword, setShowPassword] = useState(false);
  const SMTPHostRef = useRef();
  const SMTPPortRef = useRef();
  const SMTPUserNameRef = useRef();
  const SMTPSenderEmailRef = useRef();
  const SMTPSenderNameRef = useRef();
  const SMTPSenderPasswordRef = useRef();
  const SMTPEncryptionRef = useRef();

  useEffect(() => {
    const fetchSmtpData = async () => {
      try {
        const response = await getSmtpDataReq();
        if (response && response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching SMTP information:", error);
      }
    };

    fetchSmtpData();
  }, []);

  const handleSubmit = async () => {
    const smtpHost = SMTPHostRef.current.value;
    const smtpPort = SMTPPortRef.current.value;
    const smtpUserName = SMTPUserNameRef.current.value;
    const smtpSenderEmail = SMTPSenderEmailRef.current.value;
    const smtpPassword = SMTPSenderPasswordRef.current.value;
    const smtpEncryption = SMTPEncryptionRef.current.value;
    const formData = {
      smtpHost,
      smtpPort,
      smtpUserName,
      smtpSenderEmail,
      smtpPassword,
      smtpEncryption,
    };
    try {
      const response = await createSmtpInfoReq(formData);
      console.log('smtp',response)
      if (response) {
        toast.success("SMTP information updated successfully");
        getSmtpDataReq();
      } else {
        toast.error("Failed to update SMTP information");
        getSmtpDataReq();
      }
    } catch (error) {
      console.error("Error updating SMTP information:", error);
      toast.error("An error occurred while updating SMTP information");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Update SMTP Information</h2>
        <p style={{color:"red"}}>
        This section isn't activated yet. Please don't create any Listing yet! 
        </p>
      </div>
      <form className="row pt-3 mb-5 justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-6 blog-page-field">
          {/* SMTP Host */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpHost" className="form-label">
              SMTP Host
            </label>
            <input
              type="text"
              name="smtpHost"
              defaultValue={editBlogData.smtpHost}
              ref={SMTPHostRef}
              className="form-control"
              id="smtpHost"
            />
          </div>
          {/* SMTP Port */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpPort" className="form-label">
              SMTP Port
            </label>
            <input
              type="number"
              name="smtpPort"
              defaultValue={editBlogData.smtpPort}
              ref={SMTPPortRef}
              className="form-control"
              id="smtpPort"
            />
          </div>
          {/* SMTP Username */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpUserName" className="form-label">
              SMTP Username
            </label>
            <input
              type="text"
              name="smtpUserName"
              defaultValue={editBlogData.smtpUserName}
              ref={SMTPUserNameRef}
              className="form-control"
              id="smtpUserName"
            />
          </div>
          {/* SMTP Sender Email */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpSenderEmail" className="form-label">
              SMTP Sender Email
            </label>
            <input
              type="text"
              name="smtpSenderEmail"
              defaultValue={editBlogData.smtpSenderEmail}
              ref={SMTPSenderEmailRef}
              className="form-control"
              id="smtpSenderEmail"
            />
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpSenderPassword" className="form-label">
              SMTP Sender Password
            </label>
            <div className="input-group password-button">
              <input
                type={showPassword ? "text" : "password"}
                name="smtpSenderPassword"
                defaultValue={editBlogData.smtpPassword}
                ref={SMTPSenderPasswordRef}
                className="form-control"
                id="smtpSenderPassword"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOffSharp /> : <IoEye />}
              </button>
            </div>
          </div>

          {/* SMTP Sender Name */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpSenderName" className="form-label">
              SMTP Sender Name
            </label>
            <input
              type="text"
              name="smtpSenderName"
              defaultValue={editBlogData.smtpSenderName}
              ref={SMTPSenderNameRef}
              className="form-control"
              id="smtpSenderName"
            />
          </div>
          {/* SMTP Encryption */}
          <div className="col-sm-12 pt-4">
            <label htmlFor="smtpEncryption" className="form-label">
              SMTP Encryption
            </label>
            <input
              type="text"
              name="smtpEncryption"
              defaultValue={editBlogData.smtpEncryption}
              ref={SMTPEncryptionRef}
              className="form-control"
              id="smtpEncryption"
            />
          </div>
          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            className="admin-plan-button mt-5 pt-3 pb-3"
            type="submit"
          >
            Update SMTP Info
          </Button>
        </div>
      </form>
    </>
  );
};

export default SmtpSetting;
