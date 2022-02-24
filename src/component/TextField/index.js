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

const TextField = ({
  value,
  placeholder,
  icon=null,
  onChangeText,
  additionalStyle = {},
  editable = true,
  multiline = false,
  label,
  ...otherProps
}) => {
  return (
    <InputGroup style={[additionalStyle.inputGroup]}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputField style={additionalStyle.inputField}>
        {icon}
        <TextInput
          placeholder={placeholder}
          onChangeText={input => onChangeText(input)}
          placeholderTextColor="#C9CFD2"
          value={value}
          editable={editable}
          style={[styles.inputField, additionalStyle.inputField]}
          {...otherProps}
        />
      </InputField>
    </InputGroup>
  );
};
export default TextField;

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
  border-radius: ${wp('7%')};
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
