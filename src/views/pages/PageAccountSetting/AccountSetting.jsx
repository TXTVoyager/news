// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty, getBase64 } from "../../../helper/Validation";
import { DeleteAlert } from "../../../helper/PopupAlert";
import { toast } from "react-toastify";
import {
  getUserDetailsReq,
  userUpdate,
  deleteAccountReq,
} from "../../../API/Api";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { removeSessions } from "../../../helper/Session";

const AccountSetting = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  const [user, setUser] = useState(getUser[0] || {});
  const [id, setId] = useState("");

  useEffect(() => {
    setUser(getUser[0] || {});
  }, [getUser]);

  useEffect(() => {
    getUserDetailsReq().then(() => {
      const id = getUser?.[0]?._id;
      setId(id);
    });
  }, []);

  const previewImage = () => {
    const imageFile = user_image.current.files[0];
    getBase64(imageFile).then((base64Image) => {
      imageView.current.src = base64Image;
    });
  };

  const fistName = useRef();
  const user_email = useRef();
  const user_image = useRef();
  const imageView = useRef();
  const user_password = useRef();
  const current_password = useRef();
  const sendData = async () => {
    if (!id) {
      toast.error("User inaccessible!");
    } else {
      const n = fistName.current.value,
        e = user_email.current.value,
        r = imageView.current.src,
        p = user_password.current.value;
      try {
        isEmpty(n)
          ? toast.error("Name is Required")
          : isEmpty(e)
            ? toast.error("Email is Required")
            : isEmpty(p)
              ? toast.error("New password is Required")
              : (await userUpdate(n, e, r, p)) === !0
                ? (getUserDetailsReq(), toast.success("Data saved successfully"))
                : toast.error("Failed to save data. Please try again.");
      } catch (e) {
        toast.error("Request failed. Please try again."), console.error(e);
      }
    }
  };
  const sendAccountDeleteData = async () => {
    const currentPassword = current_password.current.value;
    try {
      if (isEmpty(currentPassword)) {
        toast.error("Current password is Required");
      } else {
        const Result = await DeleteAlert();
        if (Result.isConfirmed) {
          const result = await deleteAccountReq(currentPassword, id);
          if (result === true) {
            toast.success("Successfully deleted account");
            toast.error("Inaccesible! Marked for Deletion! Will be deleted in the next batch! Contact support for restoring the account!");
            removeSessions();
            navigate("/login/item");
          } else {
            toast.error("Failed to delete account. Please try again.");
          }
        }
      }
    } catch (error) {
      toast.error("Request failed. Please try again.");
      console.error(error);
    }
  };
  function formatDate(dateString) {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }
  return (
    <>
      <div className="container mb-5 user-account-setting-page">
        <div className="row" key={user._id}>
          <div className="col-md-12 col-lg-6 col-xl-6 account-setting-page-left-side blog-page-field">
            <div className="account-setting-image-upload-sectio">
              <div className="update-profile-image-user">
                <img ref={imageView} src={user.image} alt="User Avatar" />
              </div>
              <div className="upload-button">
                <input
                  type="file"
                  id="file-upload"
                  onChange={previewImage}
                  ref={user_image}
                />
                <label
                  htmlFor="file-upload"
                  className="account-setting-page-label"
                >
                  Upload Avatar <FiUpload />
                </label>
              </div>
            </div>

            <label className="form-label">Name</label>
            <div className="admin-account-input mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                ref={fistName}
                defaultValue={user.name}
              />
            </div>
            {/* <label className="form-label">User Name</label>
            <div className="admin-account-input mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                ref={user_Name}
                defaultValue={user.userName}
              />
            </div> */}
            <label className="form-label">Email Address</label>
            <div className="admin-account-input mb-3">
              <input
                type="email"
                readOnly
                className="form-control"
                placeholder="email"
                ref={user_email}
                defaultValue={user.email}
              />
            </div>
            <label className="form-label">New Password</label>
            <div className="admin-account-input mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                ref={user_password}
              />
            </div>
            <div className="profile-save-button">
              <button onClick={sendData}>Save change</button>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-6 col-xl-6 account-delete-button">
            <div className="row user-dashboard-plan-info">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 user-dashboard-plan-info-text">
                <h1>Package : {user.plan} Subscription</h1>
                <h1>Duration : {user.packageTime}</h1>
                <h1>Subscription Date : {formatDate(user.Date)}</h1>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                {/* <Link to="/post/Membership"> */}
                <button onClick={() => toast.error("Premium subscription not available presently!")}>update package</button>
                {/* </Link> */}
              </div>
            </div>
            <div className="account-setting-dashboard-delete-section ">
              <h2 className="col-form-label">Account Delete</h2>
              <label className="form-label">
                Permanently delete your account{" "}! 
                <span> You will not be able login into your account after this. Your account will be marked for deletion in the next batch after accounting reconciliation.
                  This will be automated after our tech is ready.
                </span>
              </label>
              <div className="delete-button input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Current Password"
                  ref={current_password}
                />
              </div>
              <button onClick={sendAccountDeleteData}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountSetting;
