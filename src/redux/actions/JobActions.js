import { SEND_OTP, GET_ALL_JOBS } from "../action-types";
import { BASEURL } from "../../constants/Services";
import SweetAlert from "react-native-sweet-alert";
import { Toast } from "native-base";
import { setLoading } from "./AuthActions";

const sendOTP = (data) => {
  return {
    type: SEND_OTP,
    payload: data,
  };
};

const saveJobs = (data) => {
  return {
    type: GET_ALL_JOBS,
    payload: data,
  };
};

const GetJobs = (data) => (dispatch) => {
  let uri = BASEURL + "/jobs/nearby-jobs";

  dispatch(setLoading(true));
  fetch(uri, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer" + " " + props.auth.token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(setLoading(false));
      // console.log("Check Now", Object.keys(props.auth));
      dispatch(
        saveJobs(
          res.data.sort(function (a, b) {
            return b.id - a.id;
          })
        )
      );
      setsData(
        res.data.sort(function (a, b) {
          return b.id - a.id;
        })
      );
    })
    .then((rest) => {
      //console.log({ categories });
      //setCategoryList(categories);
    })
    .catch((error) => {
      setisFetching(false);
      dispatch(setLoading(false));
      //props.setLoading(false);
      // Toast.show({
      //   text: "Server Error",
      //   buttonText: "Okay",
      //   duration: 8000,
      //   type: "danger",
      // });
    });
};

const GetallJobs = () => {
  let uri = BASEURL + "/employer/jobs";

  props.setLoading(true);
  fetch(uri, {
    method: "GET",
    //body: JSON.stringify(data),
    headers: {
      //"Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer" + " " + props.auth.token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      props.setLoading(false);
      //console.log(res.data..name);
      //res.data.map((item) => categories.push(item.name));
      setErrormessage(res.data);
      setisFetching(false);
      // console.log("Check Now", Object.keys(props.auth));
      setData(
        res.data.sort(function (a, b) {
          return b.id - a.id;
        })
      );
      setsData(
        res.data.sort(function (a, b) {
          return b.id - a.id;
        })
      );
    })
    .catch((error) => {
      props.setLoading(false);
      setisFetching(false);
      // Toast.show({
      //   text: "Job Request Failed",
      //   buttonText: "Okay",
      //   duration: 8000,
      //   type: "danger",
      // });
    });
};

export const getJobs = (token) => (dispatch) => {
  let uri = BASEURL + "/auth/profile";

  try {
    fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ ...res });
        dispatch(setLoading(false));
        // console.log(res);
        if (res.data && !res.data.code) {
          var hour = new Date().getHours();
          var timeOfDay =
            hour < 12 ? "morning " : hour < 17 ? "afternoon " : "evening ";

          Toast.show({
            text: "Good " + timeOfDay + res.data.firstName + ".",
            buttonText: "Close",
            duration: 8000,
            type: "success",
          });
          //that means successful
          // console.log("Retrieved user profile: ", res.data);

          console.log("res", res.data);
          const inputs = {
            first_name: res.data.firstName,
            last_name: res.data.lastName,
            email: res.data.email,
            type: "Artisan",
            password: "password",
            password_confirmation: "password",
            city_id: 10,
            state_id: 15,
            country_id: 1,
            category:
              res.data.category == null
                ? "None Selected"
                : res.data.category.name,
            user_id: res.data.id,
            verified: res.data.verified,
          };
          dispatch(sendUserDetails({ ...inputs }));
          dispatch(sendEducationDetails(res.data.education));
          dispatch(sendWorkDetails(res.data.work));
          dispatch(
            saveAvatar(
              res.data.image ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            )
          );
          // dispatch(setUserDetails(res.data));
          // dispatch(saveAvatar({ url: res.data.image }));
          // dispatch(saveGovId({ url: res.data.government_id }));
        } else {
          console.log("You are not logged in...");
          dispatch(completeRegistration(false));
          dispatch(doLogout());
          Toast.show({
            text: "Looks like you're not logged in. Please log in again.",
            buttonText: "Okay",
            duration: 8000,
            type: "warning",
          });
        }
      })
      .catch((error) => {
        //=> Log user out and ask them to try again.
        // dispatch(setLoading(false));
        console.log("User profile initialization failed: ", error);
        dispatch(completeRegistration(false));
        dispatch(doLogout());
        Toast.show({
          text: "An error occurred, please log in again.",
          buttonText: "Okay",
          duration: 8000,
          type: "danger",
        });
      });
  } catch (error) {
    //=> Log user out and ask them to try again.
    dispatch(setLoading(false));
    console.log("User profile initialization failed: ", error);
    dispatch(completeRegistration(false));
    dispatch(doLogout());
    Toast.show({
      text: "An error occurred, please log in again.",
      buttonText: "Okay",
      duration: 8000,
      type: "danger",
    });
  }
};

export { sendOTP, saveJobs };
