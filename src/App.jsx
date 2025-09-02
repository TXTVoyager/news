import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { getToken } from "./helper/Session";
import { useSelector } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

const HomePage2 = React.lazy(() =>
  import("./views/pages/HomePage/HomeComponent2")
);
const Login = React.lazy(() => import("./views/pages/login/Login"));
const ContactPage = React.lazy(() =>
  import("./views/pages/ContactPage/ContactPage")
);
const Register = React.lazy(() => import("./views/pages/register/Register"));
const RegisterAdmin = React.lazy(() =>
  import("./views/AdminPage/AdminRegelation")
);
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const PageForget = React.lazy(() =>
  import("./views/pages/PageForget/PageForget")
);
const BlogPage = React.lazy(() => import("./views/pages/BlogPage/BlogPage"));

const VerifyOtp = React.lazy(() =>
  import("./views/pages/OtpVerifyPage/OtpVerifyPage")
);
const RestPassword = React.lazy(() =>
  import("./views/pages/RestPasswordPage/RestPasswordPage")
);
const AdminLoginPage = React.lazy(() =>
  import("./views/AdminPage/AdminLoginPage")
);
const EditorLoginPage = React.lazy(() =>
  import("./views/AdminPage/EditorLoginPage")
);
const UserFeature = React.lazy(() =>
  import("./views/pages/UserFeature/UserFeature")
);

const DetailsPayment = React.lazy(() =>
  import("./views/pages/UserFeature/DetailsPayment")
);

const BlogListPage = React.lazy(() =>
  import("./views/pages/BlogPage/BlogListPage")
);
const TnC = React.lazy(() =>
  import("./views/pages/TnC/TAndC")
);
const PrivacyPolicy = React.lazy(() =>
  import("./views/pages/PrivacyPolice/PrivacyPolicy")
);
const RefundPolicy = React.lazy(() =>
  import("./views/pages/PrivacyPolice/RefundPolicy")
);
const AboutDetails = React.lazy(() =>
  import("./views/pages/PrivacyPolice/AboutDetails")
);

const App = () => {
  const getUser = useSelector((state) => state.profile.userData);
  if (getToken()) {
    if (getUser?.[0]?.auth === "user") {
      return (
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                exact
                path="/homepage"
                name="Home"
                element={<HomePage2 />}
              />
              <Route
                exact
                path="/Contact"
                name="Contact"
                element={<ContactPage />}
              />
              <Route
                exact
                path="/DetailsPayment/:id"
                name="Details Payment"
                element={<DetailsPayment />}
              />
              <Route
                exact
                path="/blogListPage"
                name="Blog List Page"
                element={<BlogListPage />}
              />
              <Route
                exact
                path="/article/:id"
                name="Blog Page"
                element={<BlogPage />}
              />
              <Route
                exact
                path="/TnC"
                name="AI Assistant"
                element={<TnC />}
              />
              <Route
                exact
                path="/PrivacyPolicy"
                name="AI Assistant"
                element={<PrivacyPolicy />}
              />
              <Route
                exact
                path="/RefundPolicy"
                name="AI Assistant"
                element={<RefundPolicy />}
              />
              <Route
                exact
                path="/AboutDetails"
                name="AI Assistant"
                element={<AboutDetails />}
              />
              <Route path="*" name="Default" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </HashRouter>
      );
    } else {
      return (
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                exact
                path="/homepage"
                name="Home"
                element={<HomePage2 />}
              />
              <Route
                exact
                path="/blogListPage"
                name="Blog List Page"
                element={<BlogListPage />}
              />
              <Route path="*" name="Default" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </HashRouter>
      );
    }
  } else {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Home Page" element={<HomePage2 />} />
            <Route
              exact
              path="/login/item"
              name="Login Page"
              element={<Login />}
            />
            <Route
              exact
              path="/admin-login"
              name="Admin Login Page"
              element={<AdminLoginPage />}
            />
            <Route
              exact
              path="/editor-login"
              name="Editor Login Page"
              element={<EditorLoginPage />}
            />
            <Route
              exact
              path="/userOrders"
              name="Order Page"
              element={<UserFeature />}
            />
            <Route
              exact
              path="/register/user"
              name="User Register Page"
              element={<Register />}
            />
            <Route
              exact
              path="/register/admin"
              name="Admin Register Page"
              element={<RegisterAdmin />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              exact
              path="/blogListPage"
              name="Blog List Page"
              element={<BlogListPage />}
            />
            <Route
              exact
              path="/article/:id"
              name="Blog Page"
              element={<BlogPage />}
            />
            <Route
              exact
              path="/PageForget"
              name="Forget Page"
              element={<PageForget />}
            />
            <Route
              exact
              path="/VerifyOtp"
              name="Verify Otp Page"
              element={<VerifyOtp />}
            />
            <Route
              exact
              path="/RestPassword"
              name="Reset Password Page"
              element={<RestPassword />}
            />
            <Route
              exact
              path="/Contact"
              name="Contact"
              element={<ContactPage />}
            />
            <Route
              exact
              path="/TnC"
              name="AI Assistant"
              element={<TnC />}
            />
            <Route
              exact
              path="/PrivacyPolicy"
              name="AI Assistant"
              element={<PrivacyPolicy />}
            />
            <Route
              exact
              path="/RefundPolicy"
              name="AI Assistant"
              element={<RefundPolicy />}
            />
            <Route
              exact
              path="/AboutDetails"
              name="AI Assistant"
              element={<AboutDetails />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
};

export default App;
