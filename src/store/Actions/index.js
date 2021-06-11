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
  SET_RESET_TOKEN,
  SET_TIMER,
  RESET_TIMER,
  UPDATE_TIMER,
  SUBMIT_TEST
 
 } from "../ActionTypes";

import api from "../../resources/api";
import { notification } from "antd";



/************************   Authentication Block    ********************************/


//Auth
export const setLoginSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

const setRegisterSuccess = (payload) => ({ type: LOGIN_USER_SUCCESS, payload });

//LoginUser
export const loginUser = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/auth/login", payload)
      .then((res) => {
        let created_at = new Date(res.data.token.user.created_at)
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
        }
         else {
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



/************************   User Block    ********************************/

//Block User
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

//Unblock User
export const unblockUser = (payload, cb) => {
  return (dispatch) => {
    api
      .get(`/admin/unblock/${payload}`)
      .then((res) => {
        dispatch(unblockUserSuccess(res.data.data));
        cb(null, {
          message: "Unblocked Successfully",
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



// User by Id
export const getUserById = (payload,cb) => {
  return (dispatch) => {
    api
      .get(`/user/view/${payload}`)
      .then((res) => {
        return cb(null,{res
        });

      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
      });
  };
};
 
// Update User
export const updateUser = (payload, cb) => {
  var { id, body } = payload;
  return (dispatch) => {
    api
      .post(`/user/update/${id}`, body)
      .then((res) => {
        cb(null, {
          message: "User Updated",
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


/************************   Test Block    ********************************/

//Save Test
export const saveTest = (payload,cb) => {
  return (dispatch) => {
    api
      .post("/tests/savetest",payload)
      .then((res) => {
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




//Tests List
export const getTests = (cb) => {
  return (dispatch) => {
    api
      .get("/tests/showall")
      .then((res) => {
            return cb(null,{
              tests: res.data.data,
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




// Test by Id
export const getTestById = (payload,cb) => {
  return (dispatch) => {
    api
      .get(`/tests/view/${payload}`)
      .then((res) => {
        return cb(null,{res
        });

      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
      });
  };
};
 

// Update Test
export const updateTest = (payload, cb) => {
  var { id, body } = payload;
  return (dispatch) => {
    api
      .post(`/tests/edit/${id}`, body)
      .then((res) => {
        cb(null, {
          message: "Tests Updated",
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


// Delete Test
export const deleteTest = (payload,cb) => {
  var {id} = payload;
  return (dispatch) => {
    api
      .get(`/tests/delete/${id}`)
      .then((res) => {
        cb(null, {
          message: "Test Deleted",
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



/************************   Give  Test Block    ********************************/

//Save Test
export const saveGivenTest = (payload,cb) => {
  console.log("payload",payload)
  return (dispatch) => {
    api
      .post("/testgiven/savetest",payload)
      .then((res) => {
            return cb(null,{
              testGiven: res.data,
            });
        })

             .catch((err) => {
        console.log(err);
        cb({
          message:"Submit Test Failed",
        });
      });
  };
};


// Get Test Given
export const getGivenTest = (payload,cb) => {
  var {id}=payload
  return (dispatch) => {
    api
      .get(`/testgiven/show/${id}`)
      .then((res) => {
            return cb(null,{
              testGiven: res.data,
            });
        })

             .catch((err) => {
        console.log(err);
        cb({
          message:"Fetched Fail",
        });
      });
  };
};


// Get Test Given By Id
export const getGivenTestById = (payload, cb) => {
  var { id} = payload;
  return (dispatch) => {
    api
      .get(`/testgiven/view/${id}`)
      .then((res) => {
        cb(null, {
          testAnalysis: res.data,
        });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: err,
        });
      });
  };
};



//Tests List
export const getAllTestsGiven = (cb) => {
  return (dispatch) => {
    api
      .get("/testgiven/showall")
      .then((res) => {
            return cb(null,{
              testsGiven: res.data.data,
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


/************************   Test Approval Block    ********************************/

//Save Test
export const saveTestApproval = (payload,cb) => {
 
  return (dispatch) => {
    api
      .post("/testapproval/saveapproval",payload)
      .then((res) => {
            return cb(null,{
              testApproval: res.data,
            });
        })

             .catch((err) => {
        console.log(err);
        cb({
          message:"Submit Test Failed",
        });
      });
  };
};



//Approvals List
export const getTestApprovals = (cb) => {
  return (dispatch) => {
    api
      .get("/testapproval/showall")
      .then((res) => {
        console.log("fethcin",res)
            return cb(null,{
              approvals: res.data.data,
            });
        })

             .catch((err) => {
      
        cb({
          message:"Fetching Failed",
        });
      });
  };
};



// Approve Test by Id
export const getApproveTestById = (payload,cb) => {
  return (dispatch) => {
    api
      .get(`/testapproval/view/${payload}`)
      .then((res) => {
        return cb(null,{res
        });

      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
      });
  };
};



// Delete Approve Test
export const deleteApproveTest = (payload,cb) => {
  var {id} = payload;
  return (dispatch) => {
    api
      .get(`/testapproval/deleteapproval/${id}`)
      .then((res) => {
        cb(null, {
          message: "Test Approval Deleted",
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

