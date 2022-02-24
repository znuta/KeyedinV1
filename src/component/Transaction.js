import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import colors from "../config/colors";
import Colors from "../constants/Colors";
import moment from "moment"

export default function Transaction({ item }) {
  const {sub_title, amount,createdAt} = item
  return (
    <TransactionItemWrap>
      <TransactionBody>
        <TransactionImage>
          <Image
            source={require("../config/images/ben.png")}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </TransactionImage>
        <TransactionDescription>
          <TransactionTitle>{sub_title}</TransactionTitle>
          <TransactionMeta>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</TransactionMeta>
        </TransactionDescription>
      </TransactionBody>
      <TransactionAmount>+ &#8358; {amount}</TransactionAmount>
    </TransactionItemWrap>
  );
}

const TransactionItemWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const TransactionBody = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const TransactionImage = styled.View`
  height: 50px;
  width: 50px;
  background-color: #f3f3f3;
  border-radius: 10px;
`;

const TransactionDescription = styled.View`
  flex: 1;
  margin-left: 10px;
  padding-right: 10px;
`;

const TransactionTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 3px;
`;

const TransactionMeta = styled.Text`
  font-size: 13px;
  color: ${Colors.mutedText};
  line-height: 18px;
`;

const TransactionAmount = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${colors.green};
`;
