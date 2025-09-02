import axios from "axios";
import store from "../redux/store/store";
import { toast } from "react-toastify";
import { setToken, getToken, getAffiliate } from "../helper/Session";
import {
  setEmail,
  setOTP,
  setUserDetails,
  setUserDetailsList,
  setAuthTotal,
  // free or new user count for admin dashboard
  setTotalFreeUser,
  setCountFreeUserCurrentMonth,
  setCountFreeUserLastMonth,
  setCountFreeUserDaily,
  setCountFreeUserYearly,
  // paid or Order count for admin dashboard
  setTotalPaidUser,
  setCountPaidCurrentMonth,
  setCountPaidUserLastMonth,
  setCountPaidUserDaily,
  setCountPaidUserYearly,
  //Income count for admin dashboard
  setCurrentMonthTotalPrice,
  setLastMonthTotalPrice,
  setTodayTotalPrice,
  setYearlyTotalPrice,
  setTotalTotalPrice,
  setUserPaidDetailsList,
  setPaidUserTotal,
  //total spend money count for marketing
  setCurrentMonthSpendTotalPrice,
  setLastMonthSpendTotalPrice,
  setYearlySpendTotalPrice,
  setTotalSpendTotalPrice,
  // SMTP
  setSmtpData,
} from "../redux/slice/authSlice";

import { setLimitList } from "../redux/slice/limitSlice";
import {
  setBlogList,
  setBlogListTable,
  setTotal,
  setEditBlogData,
  setSMData,
  setDeskData,
  setEditorData,
  setWebAdminData,
  setCurrentBlogData,
  setLatestNewsData,
  setTweetList,
} from "../redux/slice/blogSlice";
import {
  setProductList,
  setSearchProductList,
  setSearchProductTotal,
  setTotalProduct,
  setEditProductData,
  setProductFeaturedList,
  setProductTournamentList
} from "../redux/slice/productSlice";
import {
  setConformOrder,
  setTotalNewOrderNotify,
} from "../redux/slice/orderListSlice";
import {
  setCartPurchaseInitiated,
  setCartPlatformPricing,
} from "../redux/slice/cartOrderSlice";

import getBaseUrl from "../helper/BackendConnect";

//frontend & backend connect function
const BASE_URL = getBaseUrl();
const AxiosHeader = { headers: { token: getToken() } };


//user Reg api
export async function RegisterApi(name, email, auth, password) {
  const URL = BASE_URL + "AuthRegistration";
  const refId = getAffiliate("");
  try {
    const postBody = { name, email, auth, password, refId };
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response.status === 400) {
      return 400;
    } else {
      console.error(error);
      return false;
    }
  }
}
//user login api
export async function LoginApi(email, password, type) {
  const URL = BASE_URL + "AuthLogin";
  const postBody = { email, password, type };
  try {
    const response = await axios.post(URL, postBody);
    if (response?.status === 200) {
      setToken(response.data.token);
      store.dispatch(setEmail(response.data?.data?.email));
      return true;
    } else {
      console.log('response failed', response);
      toast.error("Failed to login");
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
//email verify api
export async function verifyEmail(email) {
  const URL = BASE_URL + "VerifyEmail";
  try {
    const response = await axios.post(URL, email);
    if (response.status === 200) {
      const emailData = email.email;
      store.dispatch(setEmail(emailData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//OTP verify api
export async function OTPVerify(email, OTP) {
  const URL = BASE_URL + "RecoverVerifyOtp/" + email + "/" + OTP;
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      store.dispatch(setOTP(OTP));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//update account information API
export async function userUpdate(name, email, image, password) {
  const URL = BASE_URL + "AuthUpdate";
  const reqBody = { name, email, image, password };
  try {
    const res = await axios.post(URL, reqBody, AxiosHeader);
    if (res.status === 200) {
      store.dispatch(setUserDetails(res.data["data"]));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//delete account api
export async function deleteAccountReq(currentPassword, id) {
  const URL = BASE_URL + "deleteAccount";
  const reqBody = { currentPassword, id };
  try {
    const response = await axios.post(URL, reqBody, AxiosHeader);
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      toast.error("Password not match. Please try again.");
      return false;
    } else if (response.status === 404) {
      toast.error("User not found. Please try again.");
      return false;
    } else {
      toast.error("Something wrong. Please try again.");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//password rest api
export async function PasswordReset(email, OTP, password) {
  const URL = BASE_URL + "RecoverRestPassword";
  const postBody = { email, OTP, password };
  try {
    const response = await axios.post(URL, postBody);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//contact api
export async function massageApi(email, name, massage) {
  const URL = BASE_URL + "sendMassage";
  const postBody = { email, name, massage };
  try {
    const res = await axios.post(URL, postBody);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
//admin All user api
export async function getAllUserList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "getAllUser/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.users;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setUserDetailsList(data));
      store.dispatch(setAuthTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}
//admin paid user api
export async function getAllPaidUserList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL +
    "totalPaidUserList/" +
    pageNo +
    "/" +
    perPage +
    "/" +
    searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.users;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setUserPaidDetailsList(data));
      store.dispatch(setPaidUserTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}
//admin user api
export async function getTotalFreeUserCount() {
  const URL = BASE_URL + "freeUserAdmin";
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      store.dispatch(setTotalFreeUser(response.data.totalCount));
      store.dispatch(
        setCountFreeUserCurrentMonth(response.data.currentMonthCount)
      );
      store.dispatch(setCountFreeUserLastMonth(response.data.lastMonthCount));
      store.dispatch(setCountFreeUserDaily(response.data.todayCount));
      store.dispatch(setCountFreeUserYearly(response.data.yearlyCount));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
//admin user api
export async function getTotalPaidUserCount() {
  const URL = BASE_URL + "paidUserAdmin";
  try {
    const response = await axios.get(URL);
    if (response.status === 200) {
      store.dispatch(setTotalPaidUser(response.data.totalCount));
      store.dispatch(setCountPaidCurrentMonth(response.data.currentMonthCount));
      store.dispatch(setCountPaidUserLastMonth(response.data.lastMonthCount));
      store.dispatch(setCountPaidUserDaily(response.data.todayCount));
      store.dispatch(setCountPaidUserYearly(response.data.yearlyCount));
      store.dispatch(
        setCurrentMonthTotalPrice(response.data.currentMonthTotalPrice)
      );
      store.dispatch(setLastMonthTotalPrice(response.data.lastMonthTotalPrice));
      store.dispatch(setTodayTotalPrice(response.data.todayTotalPrice));
      store.dispatch(setYearlyTotalPrice(response.data.yearlyTotalPrice));
      store.dispatch(setTotalTotalPrice(response.data.totalTotalPrice));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

export async function spendMonyCountForMarketingAdminReq() {
  const URL = BASE_URL + "/spendMonyCountForMarketing";
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      store.dispatch(
        setCurrentMonthSpendTotalPrice(response.data.currentMonthPercentage)
      );
      store.dispatch(
        setLastMonthSpendTotalPrice(response.data.lastMonthPercentage)
      );
      store.dispatch(setYearlySpendTotalPrice(response.data.yearlyPercentage));
      store.dispatch(setTotalSpendTotalPrice(response.data.totalPercentage));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

//admin user api
export async function getUserDetailsReq() {
  const URL = BASE_URL + "getUserDetails";
  try {
    const response = await axios.get(URL, AxiosHeader);
    if (response.status === 200) {
      store.dispatch(setUserDetails(response.data["data"]));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

//user Dashboard Api-limit api
export async function getTotalLimitReq() {
  const URL = BASE_URL + "totalLimit";
  try {
    const packageMatch = await axios.get(URL, AxiosHeader);

    if (packageMatch.status === 200) {
      store.dispatch(setLimitList(packageMatch.data["data"]));
    }
  } catch (error) {
    console.log(error);
  }
}
//admin delete user info API
export async function DeleteUserReq(id) {
  const URL = BASE_URL + "deleteUser/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

//user billing api
export async function createBillingReq(allBilling) {
  try {
    const URL = BASE_URL + "createBling";
    const response = await axios.post(URL, allBilling);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//admin  SMTP data get api
export async function getSmtpDataReq() {
  const URL = BASE_URL + "getSmtpData";
  try {
    const packageMatch = await axios.get(URL);
    if (packageMatch.status === 200) {
      store.dispatch(setSmtpData(packageMatch.data["data"]));
    }
  } catch (error) {
    console.error(error);
  }
}
//admin create SMTP api
export async function createSmtpInfoReq(formData) {
  try {
    const URL = BASE_URL + "createSmtpInfo";
    const response = await axios.post(URL, formData);
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

//admin create blog api
export async function createBlogReq(formData) {
  try {
    const URL = BASE_URL + "crateBlog";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
//admin update blog data api
export async function blogDataUpdateReq(formData) {
  try {
    const URL = BASE_URL + "updateBlogData";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
//show blog in frontend
export async function readBlogReq() {
  try {
    const URL = BASE_URL + "readBlog";
    const response = await axios.post(URL);
    if (response.status === 200) {
      const BlogData = response.data.data;
      store.dispatch(setBlogList(BlogData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//add a new news item
export async function addNewsItemReq(data) {
  try {
    const URL = BASE_URL + "addNewsItem";
    const response = await axios.post(URL, data);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//show blog in getpostbyid
export async function getPostbyID(id) {
  try {
    const URL = BASE_URL + "getPostbyID";
    const response = await axios.post(URL, id);
    if (response.status === 200) {
      const BlogData = response.data.data?.[0];
      store.dispatch(setCurrentBlogData(BlogData));

      // const res = await axios.post(BASE_URL + "fetchNewsDataReq");
      // console.log(res);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}



//show blog in getpostbyid
export async function getLatestNewsReq(id) {
  try {
    const URL = BASE_URL + "fetchNewsDataReq";
    const response = await axios.post(URL, id);
    if (response.status === 200) {
      const BlogData = response.data.data;
      store.dispatch(setLatestNewsData(BlogData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}


//admin blog delete api
export async function DeleteBlogReq(id) {
  const URL = BASE_URL + "deleteBlog/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
//frontend show blog single page api
export async function getBlogListReq(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "blogList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {

    const res = await axios.get(URL);
    if (res.status === 200) {
      const blogList = res.data.data.all;
      const totalCount = res.data.data.totalCount;
      const wa = res.data.data.wa;
      const desk = res.data.data.desk;
      const ed = res.data.data.ed;
      const smData = res.data.data.smData;
      const tweets = res.data.data.tweets;
      store.dispatch(setBlogListTable(blogList));
      store.dispatch(setDeskData(desk));
      store.dispatch(setWebAdminData(wa));
      store.dispatch(setEditorData(ed));
      store.dispatch(setSMData(smData));
      store.dispatch(setTweetList(tweets));
      store.dispatch(setTotal(smData));
    }
  } catch (error) {
    console.error(error);
  }
}


//admin onOff req api
export async function onOffBlogReq(id, bullionData) {
  const URL = BASE_URL + "showHideBlog";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function editBlogDataReq(id) {
  const URL = BASE_URL + "editBlog";
  try {
    const res = await axios.post(URL, id);
    if (res.status === 200) {
      const editData = res.data.data;
      store.dispatch(setEditBlogData(editData));
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//get order by id
export async function getOrderByIDReq(params) {
  const URL =
    BASE_URL + "getOrderByID";
  const URL2 =
    BASE_URL + "getPlatformData";
  try {
    const res = await axios.post(URL, params);
    const plat = await axios.post(URL2);
    if (res.status === 200) {
      const set = { order: res.data.data?.[0], apiSet: true }
      store.dispatch(setCartPurchaseInitiated(set));
    }
    if (plat.status === 200) {
      const set = { price: plat?.data?.data?.[0], apiSet: true }
      store.dispatch(setCartPlatformPricing(set));
    }
  } catch (error) {
    console.error("error getOrder || platformData", error);
  }
}

//get order by id
export async function getPlatformDataReq(params) {
  const URL =
    BASE_URL + "getPlatformData";
  try {
    const res = await axios.post(URL);
    if (res.status === 200) {
      const set = { price: res?.data?.data?.[0], apiSet: true }
      store.dispatch(setCartPlatformPricing(set));
    }
  } catch (error) {
    console.error("error", error);
  }
}

export async function updateOrderItemReq(data) {
  const URL =
    BASE_URL + "updateOrder/";
  try {
    const res = await axios.post(URL, data);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function sentOrderIdReq() {
  const URL = BASE_URL + "sentOrderId";
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const orderList = res.data.data || [];
      store.dispatch(setConformOrder(orderList));
    }
  } catch (error) {
    console.error(error);
  }
}

//products APIs
//show products in frontend
export async function readProductReq() {
  try {
    const URL = BASE_URL + "readProducts";
    console.log("connecting to the server..")
    const response = await axios.post(URL);
    if (response.status === 200) {
      const ProductDatas = response.data.data;
      const ProductData = ProductDatas.filter((item) => item.tournament != true || (item.tournament && item.tournamentDetailsObject.tournamentProducts != true));
      const FeaturedData = ProductData.filter((item) => item.featured);
      const TournamentData = ProductDatas.filter((item) => item.tournament);
      const total = ProductData.length;
      store.dispatch(setProductList(ProductData));
      store.dispatch(setProductFeaturedList(FeaturedData.slice(0, 3)));
      store.dispatch(setProductTournamentList(TournamentData.slice(0, 3)));
      store.dispatch(setTotalProduct(total));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//admin create new product
export async function createProductReq(formData) {
  try {
    const URL = BASE_URL + "createProduct";
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.message === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating new product - API Message:", error);
    return false;
  }
}

//products by params pageno, perpage and as per search term
export async function getProductsList(pageNo, perPage, searchKeyword) {
  const URL =
    BASE_URL + "productList/" + pageNo + "/" + perPage + "/" + searchKeyword;
  try {
    const res = await axios.get(URL);
    if (res.status === 200) {
      const data = res.data.data.products;
      const TotalUser = res.data.data.totalCount;
      store.dispatch(setSearchProductList(data));
      store.dispatch(setSearchProductTotal(TotalUser));
    } else {
      toast.error("Cannot find data.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("An error occurred while fetching data.");
  }
}

//activate or deactivate product
export async function onOffProductReq(id, bullionData) {
  const URL = BASE_URL + "showHideProduct";
  try {
    const res = await axios.post(URL, id, bullionData);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//update a product data
export async function updateProductData(updateData) {
  const URL = BASE_URL + "updateProductData";
  try {
    const res = await axios.post(URL, updateData
    );
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// no call to server made for edit data setting
export async function editProductDataReq(editData) {
  try {
    store.dispatch(setEditProductData(editData));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//admin delete order id
export async function DeleteOrderReq(id) {
  const URL = BASE_URL + "deleteOrder/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
// admin notify route
export async function getOrderNotifyReq(email) {
  const URL = BASE_URL + "getOrderNotify/" + email;
  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        const totalNewOrder = res.data.totalNewNotify;
        store.dispatch(setTotalNewOrderNotify(totalNewOrder));
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function updatedOrderStatusReq(status) {
  const URL = BASE_URL + "updatedOrderStatus";
  try {
    const res = await axios.post(URL, status);
    if (res.status === 200) {
      const orderList = res.data.data || [];
      store.dispatch(setConformOrder(orderList));
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
//user dashboard delete audio
export async function DeleteAudioReq(id) {
  const URL = BASE_URL + "deleteAudio/" + id;
  return axios
    .post(URL)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Delete data successfully");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

// payment request api
export async function postPaymentReq(paymentData) {
  const URL = BASE_URL + "pay";
  try {
    const res = await axios.post(URL, paymentData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
}
//admin create stripe payment setting api
export async function createStripeSettingDataReq(formData) {
  try {
    const URL = BASE_URL + "createStripeData";
    const response = await axios.post(URL, formData);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}
