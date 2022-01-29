import {
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
  SET_USER_DETAILS,
  SAVE_TOKEN,
  SAVE_AVATAR,
  SAVE_GOVID,
  COMPLETE_REGISTRATION,
  SET_SHOW_TOAST,
  SET_LOADING,
  IS_AUTHENTICATED,
  LOGOUT,
  SET_ALL_CATEGORIES,
  PRIVACY_MODAL_ACTIVE,
  TERMS_MODAL_ACTIVE,
  SET_EXPERT_DETAILS,
  LOGGED_IN,
  SET_LOCATION,
  SET_EDUCATION_DETAILS,
  SET_EXPERIENCE_DETAILS,
} from 'src/redux/action-types';
import {BASEURL} from 'src/constants/Services';
import {CometChat} from '@cometchat-pro/react-native-chat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


 export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token")
    console.log("__TOKEN__", token)
    return token
  } catch (error) {
    console.log("___TOKEN__ERROR__", error)
    
  }
}
const toggleTodo = id => {
  return {type: 'DELETE_SCHOOL', id};
};
const addSchools = data => {
  return {type: 'ADD_SCHOOL', data};
};

// const sendEducationDetails= data =>{
//   return{
//     type: 'API_SCHOOL_DATA',
//     data: data,
//   }
// }

const sendRate = data => {
  return {type: SET_RATE_DETAILS, data};
};

const addCompanys = data => {
  return {type: 'ADD_COMPANY', data};
};
const addLinks = data => {
  return {type: 'ADD_LINK', data};
};
const removeLinks = id => {
  return {type: 'TOGGLE_LINK', id};
};
// const sendWorkDetails = data => {
//   return {
//     type: 'API_WORK_DATA',
//     data: data,
//   };
// };

const termsModalActive = state => {
  return {type: TERMS_MODAL_ACTIVE, state: state};
};

const privacyModalActive = state => {
  return {type: PRIVACY_MODAL_ACTIVE, state: state};
};
const removeSkill = id => {
  return {type: 'TOGGLE_SKILL', id};
};
const addSkill = data => {
  return {type: 'ADD_SKILL', data};
};
const sendExpert = data => {
  return {type: SET_EXPERT_DETAILS, data};
};
const sendOTP = data => {
  return {
    type: SEND_OTP,
    payload: data,
  };
};

const sendOTPSuccess = phone => {
  return {
    type: SEND_OTP_SUCCESS,
    phone: phone,
  };
};

const sendOTPError = error => {
  return {
    type: SEND_OTP_ERROR,
    error: error,
  };
};

// const completeRegistration = (status) => {
//   return {
//     type: COMPLETE_REGISTRATION,
//     status: status,
//   };
// };

const sendUserDetails = data => {
  return {
    type: SET_USER_DETAILS,
    data: data,
  };
};

const setLoading = status => {
  return {
    type: SET_LOADING,
    status: status,
  };
};
const saveId = (_id) => {return { type: SAVE_ID, _id: _id }}
const  setLocation= (data) =>{
return{
  type: SET_LOCATION,
  data,
}
}
const saveBalance = (data) =>{ 
  return{ type: SAVE_BALANCE, data: data }
}
const saveToken = token => {
  return {
    type: SAVE_TOKEN,
    token: token,
  };
};
const saveSkill = data => {
  return { type: 'SAVE_SKILL', data }
};


const saveGovId = path => {
  return {
    type: SAVE_GOVID,
    filepath: path,
  };
};

const completeRegistration = status => {
  return {
    type: COMPLETE_REGISTRATION,
    status: status,
  };
};
const newAccount = status => {
  return {
    type: LOGGED_IN,
    status: status,
  };
};
const setIsAuthenticated = status => {
  return {
    type: IS_AUTHENTICATED,
    status: status,
  };
};

const doLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const sendWorkDetails = data => {
  return {
    type: SET_EXPERIENCE_DETAILS,
    data: data,
  };
};
export const sendEducationDetails = data => {
  return {
    type: SET_EDUCATION_DETAILS,
    data: data,
  };
};

export const initUser = (token,id) => dispatch => {
  let uri = BASEURL + `/users/profile?user_id=${id}`;
  
  try {
    axios.get(uri, {
     
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    })
     
      .then(res => {
        console.log({...res});
        dispatch(setLoading(false));
        // console.log(res);
        const {data} = res.data
        if (data ) {
          var hour = new Date().getHours();
          var timeOfDay =
            hour < 12 ? 'morning ' : hour < 17 ? 'afternoon ' : 'evening ';

         

          console.log('res', res.data);
          
          dispatch(sendUserDetails(data));
          // dispatch(sendEducationDetails(res.data.education));
          // dispatch(sendWorkDetails(res.data.work));
          dispatch(
            saveAvatar(
              data.image ??
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            ),
          );
          // dispatch(setUserDetails(res.data));
          // dispatch(saveAvatar({ url: res.data.image }));
          // dispatch(saveGovId({ url: res.data.government_id }));
        } else {
          console.log('You are not logged in...');
          dispatch(completeRegistration(false));
          dispatch(doLogout());
         
        }
      })
      .catch(error => {
        //=> Log user out and ask them to try again.
        // dispatch(setLoading(false));
        console.log('User profile initialization failed: ', error);
        dispatch(completeRegistration(false));
        dispatch(doLogout());
       
      });
  } catch (error) {
    //=> Log user out and ask them to try again.
    dispatch(setLoading(false));
    console.log('User profile initialization failed: ', error);
    dispatch(completeRegistration(false));
    dispatch(doLogout());
   
  }
};

const doCometRegistration = (uid, username) => {
  // Start Comet Chat Integration
  // let appSettings = new CometChat.AppSettingsBuilder()
  //   .subscribePresenceForAllUsers()
  //   .setRegion(CometCredentials.appRegion)
  //   .build();

  // CometChat.init(CometCredentials.appID, appSettings).then(() => {
  //   // const username = "testAcc1";
  //   let username = uid;
  //   const user = new CometChat.User(username);
  //   user.setName(username); //consider changing to Firstname and Lastname

  //   CometChat.createUser(user, CometCredentials.apiKey).then((res) => {
  //     console.log(res);
  //     if (!res.code) {
  //       return true;
  //     } else {
  //       // username most likely taken
  //       return false;
  //     }
  //   });
  // });
  let retVal = false;
  var user = new CometChat.User(uid);
  user.setName(username);
  CometChat.createUser(user, CometCredentials.apiKey).then(
    user => {
      console.log('Chat account created: ', user);
      retVal = true;
    },
    error => {
      console.log('Error creating chat account: ', error);
      retVal = false;
    },
  );

  return retVal;
};

const doCometLogin = uid => {
  let retVal = false;
  // CometChat.login(uid, CometCredentials.apiKey).then((res) => {
  //   console.log(res);
  //   retVal = true;
  // }).catch((err) => {
  //   console.log("CometChat Login Error: ", err);
  //   retVal = false
  // })
  CometChat.login(uid, CometCredentials.apiKey).then(
    user => {
      console.log('Chat login successful: ', {user});
      retVal = true;
    },
    error => {
      console.log('Chat login failed with exception: ', {error});
      retVal = false;
    },
  );

  return retVal;
};

/* SEND OTP ACTION */

export const doSendOTP = (data, next) => dispatch => {
  console.log('OTP Sending Data ' + JSON.stringify(data));
  let uri = BASEURL + '/otp/new-phone-number';
  dispatch(setLoading(true));

  var encoded = [];

  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    encoded.push(encodedKey + '=' + encodedValue);
  }
  encoded = encoded.join('&');

  try {
    console.log('Sending to server now...');
    fetch(uri, {
      method: 'POST',
      body: encoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setLoading(false));
        console.log(res);
        if (!res.data.code) {
          //that means there's no error
          console.log('Successfully sent');
        
          dispatch(sendOTPSuccess(data.phone));
          next();
        } else {
          //there was an error
          if (res.data.code === 405) {
            // Number already verified
        
          } else {
            // OTP already sent
         
            next();
          }
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        console.log('Fetch Exception Caught...', error);
      
      });
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  
  }
};

/* VERIFY OTP ACTION */

export const verifyOtp = (data, next) => dispatch => {
  let uri = BASEURL + '/otp/verify-otp';
  dispatch(setLoading(true));

  var encoded = [];

  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    encoded.push(encodedKey + '=' + encodedValue);
  }
  encoded = encoded.join('&');

  try {
    console.log('Trying to send API request...');

    fetch(uri, {
      method: 'POST',
      body: encoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setLoading(false));
        console.log(res);
        if (!res.data.code) {
          //that means success
        
          dispatch(sendOTPSuccess(data.phone));
          next();
        } else {
          console.log(res.data);
          if (res.data.code === 422) {
          
          } else if (res.data.code === 405) {
          
          } else if (res.data.code === 400) {
          
            dispatch(sendOTPSuccess(data.phone));
            next();
          } else {
         
          }
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        console.log('Fetch Exception Caught...', error);
     
      });
  } catch (error) {
    dispatch(setLoading(false));
  
    console.log('Caught exception: ', error);
  }
};

/* CREATE USER ACCOUNT ACTION */
export const createAccount = (data, next) => dispatch => {
  console.log('At create account action ', data);
  let uri = BASEURL + '/auth/signup';
  dispatch(setLoading(true));

  var encoded = [];
  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    encoded.push(encodedKey + '=' + encodedValue);
  }
  encoded = encoded.join('&');

  try {
    console.log('About to send data...');
    //console.log(data);
    fetch(uri, {
      method: 'POST',
      body: encoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // dispatch(setLoading(false));
        if (!res.data.code) {
          let fullname = data.first_name + ' ' + data.last_name;
          let uid = res.id;
          console.log('Registration successful; creating chat account for: ', {
            uid,
            fullname,
          });
          var user = new CometChat.User(uid.toString());
          user.setName(fullname);
          CometChat.createUser(user, CometCredentials.apiKey).then(
            user => {
              console.log('Chat account created: ', user);
              dispatch(setLoading(false));
            
              dispatch(saveToken(res.token));
              next();
            },
            error => {
              console.log('Error creating chat account: ', error);
              dispatch(setLoading(false));
             
            },
          );
        } else {
          dispatch(setLoading(false));
          if (res.data.code === 422) {
            //one or more fields is missing or invalid
            let dirtyFields = [];
            Object.keys(res.data.error).forEach(field => {
              var item = field.replace('_', ' ');
              //.replace(/^./, field[0].toUpperCase()); --> convert first alphabet of each error to upper case
              if (item != 'password confirmation') {
                dirtyFields.push(item);
              }
              console.log(item);
            });
            console.log('The dirty fields are ', dirtyFields);
          
          } else {
          
          }
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        console.log('Fetch Exception Caught...', error);
        
      });
  } catch (error) {
    dispatch(setLoading(false));
  
  }
};

/* USER LOGIN ACTION */
export const login = (data, next) => dispatch => {
  let uri = BASEURL + '/auth/login';
  var encoded = [];

  dispatch(setLoading(true));

  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    encoded.push(encodedKey + '=' + encodedValue);
  }
  encoded = encoded.join('&');

  try {
    //console.log("Sending Login Data: ", data);
    fetch(uri, {
      method: 'POST',
      body: encoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        // dispatch(setLoading(false));
        console.log(res);
        if (res.data) {
          dispatch(setLoading(false));
          if (res.data.code === 401) {
          
          } else {
            //one or more fields is missing or invalid
            let dirtyFields = [];
            Object.keys(res.data.error).forEach(field => {
              var item = field.replace('_', ' ');
              //.replace(/^./, field[0].toUpperCase()); --> convert first alphabet of each error to upper case
              if (item != 'password confirmation') {
                dirtyFields.push(item);
              }
              console.log(item);
            });
           
          }
        } else {
          // if (doCometLogin(res.id)) {
         
          // } else {
         
          // }
          CometChat.login(res.id, CometCredentials.apiKey).then(
            user => {
              console.log('Chat login successful: ', {user});
              dispatch(setLoading(false));
             
              dispatch(saveToken(res.token));
              dispatch(setIsAuthenticated(true));
            },
            error => {
              console.log('Chat login failed with exception: ', {error});
              dispatch(setLoading(false));
              
            },
          );
          // next;
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        console.log('Fetch Exception Caught...', error);
       
      });
  } catch (error) {
    console.log('Caught exception: ', error);
    dispatch(setLoading(false));
   
  }
};

/* USER LOGOUT ACTION */
export const logout = token => dispatch => {
  let uri = BASEURL + '/auth/logout';
  console.log('Logging user out');
  dispatch(setLoading(true));

  try {
    axios.post(uri, {
     
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    })
     
      .then(res => {
        dispatch(setLoading(false));
        console.log('Logout should be successful: ', res);
       
        dispatch(doLogout());
      })
      .catch(error => {
        dispatch(setLoading(false));
       
      });
  } catch (error) {
    dispatch(setLoading(false));
  
    console.log('Caught Exception: ', error);
  }
};

/* UPDATE PROFILE ACTION */
export const updateProfile = (data, token) => dispatch => {
  let uri = BASEURL + '/auth/profile/';

  dispatch(setLoading(true));

  var encoded = [];

  for (var key in data) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(data[key]);
    encoded.push(encodedKey + '=' + encodedValue);
  }
  encoded = encoded.join('&');

  try {
    fetch(uri, {
      method: 'POST',
      body: encoded,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        dispatch(setLoading(false));

        if (res.data.code) {
          //that means error
        
        } else {
          //successful
        
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        console.log('At catch...', error);
      });
  } catch (error) {
    dispatch(setLoading(false));
 
  }
};
const setAllCategories = payload => {
  return {
    type: SET_ALL_CATEGORIES,
    payload: payload,
  };
};

export const getAllCategories = () => dispatch => {
  let uri = BASEURL + '/category/all';
  try {
    fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          dispatch(setAllCategories(res.data));
          // console.log("thunk", res.data);
          //FORMAT CATEGORIES for picker use
          // let allCat = [];
          // res.data.forEach((cat) => {
          //   allCat.push({
          //     value: cat.id,
          //     label: cat.name,
          //   });
          // });
          // dispatch(setFormattedCategories(allCat));
        } else {
          console.log('Something is wrong with the categories response: ', res);
        }
      })
      .catch(error => {
        console.log('An error occurred while fetching categories: ', error);
      });
  } catch (error) {
    console.log('An exception was caught while fetching categories... ', error);
  }
};


export const getUser = async (id,callback) => {
  let uri = BASEURL + `/users/profile/${id}`;
  const token = await getToken()
  axios.get(uri, {
   
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  }).then(res => {
      //GetPortfolio();
      console.log("__USER__", res)
      const { data = {} } = res.data
     callback(data)
     
    })
    .catch(error => {
      //setLoading(false);
      console.log('Profile__ERROR__', error);
     
    });
};

const GetExperience =  (id) => async  dispatch =>  {
  let uri = BASEURL + `/profiles/employment/${id}`;
const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
   
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  })
    
    .then(res => {
      console.log("___EMPLOYMENT__DETAILS___", res)
      const {data} = res.data
     dispatch(sendWorkDetails(data.organizations));
      //console.log({ res });
    })
    .catch(error => {
      console.log("___EMPLOYMENT__ERROR___", error.response)
      //props.setLoading(false);
    
    });
};

const GetExpertiseFromApi = (id) => async dispatch => {
  console.log("___ID__++", id)
  let uri = BASEURL + `/profiles/expertise/${id}`;
  const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  }).then(res => {
      console.log('__RES_EXPERTISE__', res);
    
    const {data = {}} = res.data
    dispatch(sendExpert(data))
    
    // setValue({ ...data[1] })
    // setBio({ ...data[1] });
      // setOther(res.data.core_skill);
      // setLevel(res.data.level);
      // setCategory(res.data.skillSet[0].category_id);

      // props.saveSkill(res.data.skillSet);
      // setSkills(res.data.skills);
    })
    .catch(error => {
      console.log("___ERROR__EX", error)
     
    });
};

const GetEducation =  (id) => async dispatch => {
  let uri = BASEURL + `/profiles/education/${id}`;
  const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  })
    .then(res => {
      
      const { data = {}} = res.data
      dispatch(sendEducationDetails(data.institutions));
      //props.sendUserDetails(inputs);
      // dispatch(sendEducationDetails(res.data));
     
      //props.saveAvatar(res.data.image);
      //setArtisanImg(res.data.image);
     
      //console.log(res.data.category.name);
      //res.data.map((item) => categories.push(item.name));
    })
    .catch(error => {
      console.log("__USER_EDUCATION_ERROR_",error);
     
    });
};



const GetArtisanExperience = async (id, callback) =>   {
  let uri = BASEURL + `/profiles/employment/${id}`;
const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
   
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  })
    
    .then(res => {
      console.log("___EMPLOYMENT__DETAILS___", res)
      const { data } = res.data
      callback(data.organizations)
    
      //console.log({ res });
    })
    .catch(error => {
      console.log("___EMPLOYMENT__ERROR___", error.response)
      //props.setLoading(false);
    
    });
};

const getArtisanExpertise = async(id, callback) => {
  console.log("___ID__++", id)
  let uri = BASEURL + `/profiles/expertise/${id}`;
  const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  }).then(res => {

    console.log('__RES_EXPERTISE__', res);
    const { data = {} } = res.data
    callback(data)
  
    })
    .catch(error => {
      console.log("___ERROR__EX@", error.response)
     
    });
};

const getArtisanEducation = async (id, callback) => async dispatch => {
  console.log("___ID+++", id)
  let uri = BASEURL + `/profiles/education/${id}`;
  const token = await getToken()
  //props.setLoading(true);
  axios.get(uri, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer' + ' ' + token,
    },
  })
    .then(res => {
      
      const { data = {} } = res.data
      callback(data.institutions)
     
      
    })
    .catch(error => {
      console.log("__USER_EDUCATION_ERROR_",error);
     
    });
};
const saveAvatar= path => async dispatch =>{
      dispatch({
        type: SAVE_AVATAR,
        filepath: path,
      })}

export {
  GetArtisanExperience,
getArtisanExpertise,
getArtisanEducation,
  saveSkill,
  sendOTP,
  sendOTPSuccess,
  sendOTPError,
  setLoading,
  saveToken,
  saveAvatar,
  saveGovId,
  sendUserDetails,
  completeRegistration,
  setAllCategories,
  termsModalActive,
  privacyModalActive,
  removeSkill,
  addSkill,
  sendExpert,
  toggleTodo,
  addSchools,
  addCompanys,
  addLinks,
  removeLinks,
  sendRate,
  newAccount,
  GetExperience,
  setLocation,
GetExpertiseFromApi,
GetEducation
};
