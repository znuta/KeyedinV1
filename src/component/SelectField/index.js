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
// import RNPickerSelect from 'react-native-picker-select';
import { Picker as SelectPicker } from '@react-native-picker/picker';
const SelectField = ({
  value='',
  placeholder = '',
  icon,
  onChangeText = () => {},
  additionalStyle = {},
  editable = true,
  multiline = false,
  items = [],
  label,
  ...otherProps
}) => {
  return (
    <InputGroup>
      {label && <InputLabel>{label}</InputLabel>}
      
        {/* <RNPickerSelect
          style={{
            color: colors.dark,
          }}
          value={value}
          onValueChange={(value, index) => {
            onChangeText(value);
            // setNewskill(value);
            // const itemIndex = selectedItems.filter(item => item === value);

            // if (!itemIndex.length > 0 && value !== '') {
            //   setSelectedItems([...selectedItems, value]);
            // }
          }}
          items={items}
        /> */}
        <SelectPicker
          style={[
             styles.selectField,
            {borderWidth: 0, backgroundColor: '#f2f3f4', width: '100%', overflow: 'hidden', borderRadius: 100},
          ]}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => {
           
            onChangeText(itemValue)
          }}
          {...otherProps}
      >
        <SelectPicker.Item label={`Select ${label}`}  />
          {
           items.length && items.map(item=> <SelectPicker.Item label={item.label} value={item.value} />)
          }
        </SelectPicker>
      
    </InputGroup>
  );
};
export default SelectField;

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
  margin-left: ${wp('4%')};
`;

export {TextAreaWrap, InputLabel, InputGroup, InputWrap};
