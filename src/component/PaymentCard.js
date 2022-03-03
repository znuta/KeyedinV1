import { wp } from "src/config/variables";
import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import colors from "../config/colors";
import Colors from "../constants/Colors";

export default function PaymentCard({item={}}) {
  const {card_number="",expire_month="",expire_year="",last_four_digits="",bank_name="",card_brand=""} = item
  return (
    <CardItemWrap>
      <CardBody>
        <CardDescription>
          <CardNumber>**** **** **** {last_four_digits}</CardNumber>
          <CardMeta><CardExp>EXP: {expire_month}/{expire_year} </CardExp> -  &bull; {card_brand}</CardMeta>
        </CardDescription>
      </CardBody>
      <CardSelect 
      onPress={()=>{
      console.log("___CARD__FLO")
    }}>
      <Text style={{color: colors.green, fontWeight: '600'}}>
      Select
      </Text>
      
      </CardSelect>
    </CardItemWrap>
  );
}

const CardItemWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
  border-style: dashed;
  border-width: 1;
  border-radius: 10;
  padding: 20px;
`;

const CardBody = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const CardImage = styled.View`
  height: 50px;
  width: 50px;
  background-color: #f3f3f3;
  border-radius: 10px;
`;

const CardDescription = styled.View`
  flex: 1;
  margin-left: 10px;
  padding-right: 10px;
`;

const CardNumber = styled.Text`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 3px;
`;

const CardMeta = styled.Text`
  font-size: 13px;
  color: ${Colors.mutedText};
  line-height: 18px;
`;

const CardExp = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${Colors.mutedText};
`;

const CardSelect = styled.TouchableOpacity`
  font-size: 15px;
  font-weight: 500;
  color: ${colors.green};
`;

// addPayment: {
//   borderStyle: 'dashed',
//   borderRadius: 50,
//   borderWidth: StyleSheet.hairlineWidth + 0.5,
//   height: 50,
//   width: 200,
//   justifyContent: 'center',
//   alignItems: 'center',
// },