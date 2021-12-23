import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BottomTabs from "./BottomTabs";
import {
  getAllCategories,
  initUser,
  sendUserDetails,
  saveAvatar,
  saveBalance
} from "src/redux/actions/AuthActions";
import { BASEURL } from "src/constants/Services";
import {useSelector, useDispatch} from 'react-redux';


const Main = (props) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  

  const GetProfile = () => {
    let uri = BASEURL + "/auth/profile";
    axios.get(uri, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer" + " " + auth.token,
      },
    }) .then((res) => {
      const {data} = res.data
        dispatch(sendUserDetails(data));
      }).catch((error) => {
        
      });
  };

 

  // const UploadLocationToApi = async () => {
  //   // console.log(netInfo.isConnected, netInfo.isInternetReachable);
  //   let uri = BASEURL + "/location/user-pin-location";
  //   //let uri = BASEURL + "/auth/profile";

  //   let data = {
  //     lng: auth.location.lng,
  //     lat: auth.location.lat,
  //   };

  //   var encoded = [];
  //   for (var key in data) {
  //     var encodedKey = encodeURIComponent(key);
  //     var encodedValue = encodeURIComponent(data[key]);
  //     encoded.push(encodedKey + "=" + encodedValue);
  //   }
  //   encoded = encoded.join("&");

  //   try {
  //     const gen = await fetch(uri, {
  //       method: "POST",
  //       body: encoded,
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //         Authorization: "Bearer " + auth.token,
  //       },
  //     });

  //     const location = await gen.text();
  //     console.log({ encoded });

  //     console.log("one", location);
  //   } catch (error) {
  //     console.log("error");
  //   }
  //   //setLoading(true);
  // };

  

  return (
      <BottomTabs />
  );
}



export default Main;
