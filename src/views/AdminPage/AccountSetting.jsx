// eslint-disable-next-line
import React, { useRef, useEffect, useState } from "react";
import { isEmpty, getBase64 } from "../../helper/Validation";
import { toast } from "react-toastify";
import { getUserDetailsReq, userUpdate, deleteAccountReq } from "../../API/Api";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { removeSessions } from "../../helper/Session";
import { Link, useNavigate } from "react-router-dom";
import { editUser } from "../../constant/Form";

const AccountSetting = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==editUser || getUser?.[0]?.email == editUser))
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(getUser[0] || {});
  }, []);

  useEffect(() => {
    getUserDetailsReq().then(() => {
      const id = getUser?.[0]?._id;
      console.log("users",id);
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
  const user_Name = useRef();
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
        t = user_Name.current.value,
        e = user_email.current.value,
        r = imageView.current.src,
        p = user_password.current.value;
      try {
        isEmpty(e)
          ? toast.error("Name is Required")
          : isEmpty(t)
          ? toast.error("Email is Required")
          : isEmpty(a)
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
        const result = await deleteAccountReq(currentPassword, id);
        if (result === true) {
          toast.success("Successfully deleted account");
          removeSessions();
          window.location.href = "/admin-login";
        } else {
          toast.error("Failed to delete account. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Request failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="row justify-content-md-center" key={user._id}>
          <div className="col-md-12 col-lg-12 col-xl-8 account-setting-page-left-side blog-page-field">
            <div className="account-setting-image-upload-sect">
              <div className=" update-profile-image-user">
                <img ref={imageView} src={user.image} alt="User Avatar" />
              </div>
              <div className="upload-button">
                <input
                  type="file"
                  id="file-upload"
                  onChange={previewImage}
                  ref={user_image}
                  className="form-control"
                />
                <label
                  htmlFor="file-upload"
                  className="account-setting-page-label form-label"
                >
                  Upload Avatar <FiUpload />
                </label>
              </div>
            </div>
            <div className="col-md-12 col-lg-12 pb-4 .blog-page-field">
              <label className="form-label">Name</label>
              <input
                type="text"
                id="Name"
                className="form-control "
                placeholder="Name"
                ref={fistName}
                defaultValue={user.name}
              />
            </div>
            <div className="col-md-12 col-lg-12 pb-4">
              <label className="form-label">User Name</label>

              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="Username"
                ref={user_Name}
                defaultValue={user.userName}
              />
            </div>
            <div className="col-md-12 col-lg-12 pb-4">
              <labe className="form-label" l>
                Email Address
              </labe>
              <input
                type="email"
                id="email"
                readOnly
                className="form-control "
                placeholder="email"
                ref={user_email}
                defaultValue={user.email}
              />
            </div>
            <div className="col-md-12 col-lg-12 pb-4">
              <label className="form-label">New Password</label>

              <input
                type="password"
                id="password"
                className="form-control "
                placeholder="password"
                ref={user_password}
              />
            </div>
            <div className="mt-3">
              <button
                onClick={sendData}
                className="admin-plan-button pt-2 pb-2"
              >
                Save Change
              </button>
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-xl-8 account-delete-button">
            <div className="account-setting-dashboard-delete-section ">
              <h2>Account Delete</h2>
              <label className="form-label">
                Permanently delete your account{" "}
              </label>
              <div className="delete-button input-group mb-3">
                <input
                  type="text"
                  id="deletePass"
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
