import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const SkillBadgeComponent = (props) => {
  const SkillBadge = styled.View`
    margin-vertical: 5px;
    ${"" /* background-color: rgba(255, 255, 255, 0.4); */}
    background-color: ${ props.bg ? props.bg : "rgba(142, 135, 241, 0.1)" };
    padding: 10px;
    border-radius: 8px;
    margin-right: 10px;
  `;

  const SkillText = styled.Text`
    font-size: 11px;
    font-weight: bold;
    color: ${ props.textColor ? props.textColor : "#8E87F1" }
  `;

  return (
    <SkillBadge>
      <SkillText>{props.text}</SkillText>
    </SkillBadge>
  );
};

export default SkillBadgeComponent;
