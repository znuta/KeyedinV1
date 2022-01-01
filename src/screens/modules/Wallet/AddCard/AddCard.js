import React, { useState } from "react";
import styled from "styled-components";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";

// import { ImageBackground, Button } from "react-native";

import Visa from "src/assets/icons/visa.svg";
import CheckMark from "src/assets/icons/checkmark1.svg";
import MasterCard from "src/assets/icons/mc_symbol.svg";

import KButton from "src/component/Buttons";

const AddCard = (props) => {
  const [cardReady, setCardReady] = useState(false);

  const _onChange = (form) => setCardReady(form.valid);

  return (
    <Container>
      <Wrapper>
        <Title>Add Your Card</Title>
        <SubTitle>
          Add your card for a seamless experience. We may charge a small fee and
          then return it to validate your card.
        </SubTitle>
      </Wrapper>
      <LiteCreditCardInput
        onChange={_onChange}
        inputStyle={{ fontSize: 20, color: "#142850" }}
        placeholderColor={"#dae1e7"}
        autoFocus={true}
        placeholders={{
          number: "Card Number",
          expiry: "MM/YY",
          cvc: "CVC",
          name: "Card Holder",
        }}
        additionalInputsProps={{
          name: {
            defaultValue: "my name",
            maxLength: 40,
            returnKeyType: 'go',
          },
          cvc: {
            returnKeyType: 'go',
          }
        }}
      />

      <Wrapper style={{ marginTop: 30 }}>
        <KButton
          text="Add Card"
          textColor="white"
          backgroundColor="#083E9E"
          textTransform="uppercase"
          disabled={!cardReady}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  ${"" /* background-color: green; */}
  width: 100%;
  padding: 50px 30px 30px;
`;

const Wrapper = styled.View`
  padding: 10px;
  margin-bottom: 25px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: #888888;
`;

export default AddCard;
