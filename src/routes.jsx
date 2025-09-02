import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const AdminDashboard = React.lazy(() =>
  import("./views/AdminPage/AdminDashboard")
);
const EditorDashboard = React.lazy(() =>
  import("./views/AdminPage/EditorDashboard")
);
const AccountSetting = React.lazy(() =>
  import("./views/pages/PageAccountSetting/AccountSetting")
);
const UserFeature = React.lazy(() =>
  import("./views/pages/UserFeature/UserFeature")
);
const AllUserDataList = React.lazy(() =>
  import("./views/AdminPage/AllUserDataList")
);
const CreateFinanceData = React.lazy(() =>
  import("./views/AdminPage/CreateFinanceData")
);
const CreateProductsList = React.lazy(() =>
  import("./views/AdminPage/CreateProductsList")
);
const CreateProducts = React.lazy(() =>
  import("./views/AdminPage/CreateProducts")
);
const CreateBlogPage = React.lazy(() =>
  import("./views/AdminPage/CreateBlogPage")
);
const BloggingPage = React.lazy(() => import("./views/AdminPage/BloggingPage"));
const BloggingPageAddSM = React.lazy(() => import("./views/AdminPage/BloggingPageAddSM"));
const OrderListPage = React.lazy(() =>
  import("./views/AdminPage/OrderListPage")
);
const ConformOrder = React.lazy(() => import("./views/AdminPage/ConformOrder"));
const PaidUserPage = React.lazy(() => import("./views/AdminPage/PaidUserPage"));
const AdminAccount = React.lazy(() =>
  import("./views/AdminPage/AccountSetting")
);
const SmtpSettingPage = React.lazy(() =>
  import("./views/AdminPage/SmtpSetting")
);
const Success = React.lazy(() =>
  import("./views/pages/PaymentPage/PaymentSuccess")
);
const Cancel = React.lazy(() =>
  import("./views/pages/PaymentPage/PaymentCancel")
);

const routes = [
  { path: "/dashboard", name: "Dashboard", element: <Dashboard /> },
  {
    path: "/dashboard-admin",
    name: "Admin Dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/dashboard-editor",
    name: "Editor Dashboard",
    element: <EditorDashboard />,
  },
  { path: "/Payment/Cancel", name: "paymentCancel", element: <Cancel /> },
  { path: "/Payment/Success", name: "paymentSuccess", element: <Success /> },
  {
    path: "/AccountSetting",
    name: "Account Setting",
    element: <AccountSetting />,
  },
  {
    path: "/userOrders",
    name: "My Orders",
    element: <UserFeature />,
  },
  {
    path: "/Admin/AccountSetting",
    name: "Admin Account Setting",
    element: <AdminAccount />,
  },
  {
    path: "/AllUserDataList",
    name: "All User Data List",
    element: <AllUserDataList />,
  },
  {
    path: "/CreateFinanceData",
    name: "Finances",
    element: <CreateFinanceData />,
  },
  {
    path: "/CreateProducts",
    name: "Create Products",
    element: <CreateProductsList />,
  },
  {
    path: "/CreateNewProduct",
    name: "Create New Product",
    element: <CreateProducts />,
  },
  {
    path: "/CreateBlogPage",
    name: "Create Blog Page",
    element: <CreateBlogPage />,
  },
  {
    path: "/BloggingPage",
    name: "Create Blog Page",
    element: <BloggingPage />,
  },
  {
    path: "/BloggingPageAddSM",
    name: "Add SM Post",
    element: <BloggingPageAddSM />,
  },
  {
    path: "/OrderListPage",
    name: "Order List Page",
    element: <OrderListPage />,
  },
  {
    path: "/ConformOrder/:id",
    name: "Conform Order",
    element: <ConformOrder />,
  },
  { path: "/PaidUserPage", name: "Paid User Page", element: <PaidUserPage /> },
  {
    path: "/SmtpSettingPage",
    name: "SmtpSettingPage",
    element: <SmtpSettingPage />,
  },
];

export default routes;
