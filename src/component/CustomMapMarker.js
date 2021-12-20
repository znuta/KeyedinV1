import React from "react";
import { View } from "react-native";

import styled from "styled-components/native";

const CustomMapMarker = ({ item }) => {
  return (
    <OuterCircle>
      {/* <InnerCircle></InnerCircle> */}
    </OuterCircle>
  );
};

const OuterCircle = styled.View`
    ${'' /* height: 32px;
    width: 32px;
    border-radius: 16px;
    background-color: rgba(77, 71, 173, 0.2);
    padding-vertical: auto;
    padding-horizontal: auto; */}
    height: 28px;
    width: 28px;
    border-radius: 25px;
    background-color: #30C57B;
    border-width: 5px;
    border-color: #ffffff;
    box-shadow: 2px 5px 40px rgba(0, 0, 0, 0.1);
`;

const InnerCircle = styled.View`
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: #30C57B;
    border-width: 3px;
    border-color: #ffffff;
`;

export default CustomMapMarker;
