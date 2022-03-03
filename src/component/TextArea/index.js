import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import styles from './styles';
import {colors, fonts, hp, wp} from '../../config/variables';

const TextArea = ({
  value,
  placeholder,
  icon,
  onChangeText,
  additionalStyle = {},
  editable = true,
  multiline = false,
  label,
}) => {
  return (
    <InputGroup>
      {label && <InputLabel>{label}</InputLabel>}
      <TextAreaWrap style={[additionalStyle.textArea]}>
        <TextInput
          placeholder={placeholder}
          onChangeText={input => onChangeText(input)}
          value={value}
          editable={editable}
          numberOfLines={Platform.OS === 'ios' ? null : 2}
          multiline={true}
          style={[styles.textArea]}
        />
      </TextAreaWrap>
    </InputGroup>
  );
};
export default TextArea;

const InputWrap = styled.View`
  margin-vertical: 10px;
  width: 100%;
  background-color: #f2f3f4;
  border-radius: 12px;
  flex-direction: row;
  padding-horizontal: 5px;
`;
const InputField = styled.View`
  margin-vertical: ${hp('1%')};
  width: 100%;
  background-color: #f2f3f4;
  border-radius: 50;
  flex-direction: row;
  padding-horizontal: ${wp('3%')};
  height: ${wp('12%')};
  align-items: center;
`;
const TextAreaWrap = styled.View`
  margin-vertical: 10px;
  width: 100%;
  background-color: #f2f3f4;
  border-radius: ${wp('5%')};
  flex-direction: row;
  padding-horizontal: 5px;
`;
const InputGroup = styled.View`
  margin-top: ${hp('1%')};
`;
const InputLabel = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 700;
  color: ${colors.header};
`;

export {TextAreaWrap, InputLabel, InputGroup, InputWrap};
