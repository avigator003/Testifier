import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  BLOCK_USER,
  BLOCK_USER_SUCCESS,
  UNBLOCK_USER_SUCCESS,
  TOGGLE_TOASTER,
  SET_RESET_TOKEN
 } from "../ActionTypes";

import api from "../../resources/api";
import { notification } from "antd";

//Auth
export const setLoginSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

const setRegisterSuccess = (payload) => ({ type: LOGIN_USER_SUCCESS, payload });

//LoginUser
export const loginUser = (payload, cb) => {
  console.log("payload",payload)
  return (dispatch) => {
    api
      .post("/auth/login", payload)
      .then((res) => {
        console.log(res)
        let created_at = new Date(res.data.token.user.created_at)
        let now = new Date()
        let expiry_date = created_at
        expiry_date.setDate(created_at.getDate() + 15)
        if(res.data.token.user.registeredOn == undefined){
          res.data.token.user.registeredOn = {

          }
        }
        
        if (payload.type === "user") {
          if (res.data.token.user.admin) {
            return cb({
              message: "Only For Users",
            });
          }
          if (res.data.token.user.blocked) {
            return cb({
              message: "Blocked",
            });
          }
          if (!res.data.token.user.verified) {
            return cb({
              message: "E-Mail not Verified",
            });
          }
          if( res.data.token.user.registeredOn.requestGranted === "Declined" && (now > expiry_date && res.data.token.user.registeredOn.requestGranted !== "Yes")){
            window.localStorage.setItem('userId' , res.data.token.user._id)
            return cb({
              message: "You payment has been declined.",
            });
          }  
          if( res.data.token.user.registeredOn.requestGranted === "No" && (now > expiry_date && res.data.token.user.registeredOn.requestGranted !== "Yes")){
            window.localStorage.setItem('userId' , res.data.token.user._id)
            return cb({
              message: "Payment confirmation awaited.",
            });
          }  

          if(now > expiry_date && res.data.token.user.registeredOn.requestGranted !== "Yes"){
            window.localStorage.setItem('userId' , res.data.token.user._id)
            return cb({
              message: "Your trial period expired!",
            });
          }  
        } else {
          if (!res.data.token.user.admin) {
            return cb({
              message: "Only For Admin",
            });
          }
        }
          dispatch(setLoginSuccess(res.data));
          cb(null, {
            message: "Logged In",
          });
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

//Logout User
export const logoutUser = (payload) => ({ type: LOGOUT_USER, payload });

//Register User
export const register = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/auth/register", payload)
      .then((res) => {
        console.log(res?.data);
        cb(null, {
          message: "Registered Successfully",
        });
      })
      .catch((err) => {
        //Dispatch Toaster Notificaton
        console.log(err);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

//Email Verification
export const verifyEmail = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/user/verify", { userid: payload })
      .then((res) => {
        if (res.data.success) {
          cb(null, {
            message: res.data.message,
          });
        } else {
          throw Error("Try Again Later");
        }
      })
      .catch((err) => {
        cb({
          message: err.message,
        });
      });
  };
};

//Forgot
// const forgotPassSuccess = payload => ({type:FORGOT_PASS_SUCCESS,payload})
// const resetPassSuccess = payload => ({type:RESET_PASS_SUCCESS,payload})
export const setResetToken = (payload) => ({ type: SET_RESET_TOKEN, payload });
export const resetPass = (payload, cb) => {
  console.log(payload);
  return (dispatch) => {
    api
      .post("/user/resetpassword", payload)
      .then((res) => {
        cb(null, {
          message: "Check your email to reset your password",
        });
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

export const setNewPass = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/user/setpassword", payload)
      .then((res) => {
        if (!res.data.success) {
          throw Error("Invalid User");
        } else {
          cb(null, {
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.message,
        });
      });
  };
};


//Block/Unblock
const blockUserSuccess = (payload) => ({ type: BLOCK_USER_SUCCESS, payload });
const unblockUserSuccess = (payload) => ({
  type: UNBLOCK_USER_SUCCESS,
  payload,
});

export const blockUser = (payload, cb) => {
  return (dispatch) => {
    api
      .get(`/admin/block/${payload}`)
      .then((res) => {
        dispatch(blockUserSuccess(res.data.data));
        cb(null, {
          message: "Blocked Successfully",
        });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: "Try Again Later",
        });
      });
  };
};

export const unblockUser = (payload, cb) => {
  return (dispatch) => {
    api
      .get(`/admin/unblock/${payload}`)
      .then((res) => {
        dispatch(unblockUserSuccess(res.data.data));
        cb(null, {
          message: "Unblocked Successfully",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: "Try Again Later",
        });
      });
  };
};

//User List
export const getUsers = (cb) => {
  return (dispatch) => {
    api
      .get("/user/list")
      .then((res) => {
            return cb(null,{
              users: res.data.users,
            });
        })

             .catch((err) => {
        console.log(err);
        cb({
          message:"Fetching Failed",
        });
      });
  };
};


//Save Test
export const saveTest = (payload,cb) => {
  console.log(payload,"payload")
  return (dispatch) => {
    api
      .post("/tests/savetest",payload)
      .then((res) => {
        console.log("saved",res)
            return cb(null,{
              test: res.data,
            });
        })

             .catch((err) => {
        console.log(err);
        cb({
          message:"Saved Failed",
        });
      });
  };
};


