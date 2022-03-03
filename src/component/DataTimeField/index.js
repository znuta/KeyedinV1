import React, {useState, useEffect} from 'react';
import {
  View,
} from 'react-native';
import styled from 'styled-components/native';
import styles from './styles';
import {colors, fonts, hp, wp} from 'src/config/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
const DataTimeField = ({
  value,
  placeholder,
  icon,
  date = new Date(),
  setDate = () => {},
  additionalStyle = {},
  disabled = false,
  multiline = false,
  label,
}) => {


  return (
    <InputGroup style={[additionalStyle.inputGroup]}>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrap style={[additionalStyle.inputField]}>
        <View>
          <DatePicker
            // style={{ width: 100 }}
            duration={150}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            disabled={disabled}
            //maxDate="31-12-2049"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            allowFontScaling={false}
            showIcon={true}
            // iconComponent={
            //   <MaterialCommunityIcons
            //     name="calendar-outline"
            //     size={20}
            //     color={colors.medium}
            //     style={{marginLeft: -10}}
            //   />
            // }
            customStyles={{
              dateIcon: {height: 25, width: 25},
              
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
                padding: 0,
              },
              dateText: styles.dateText,
              dateTouchBody: {
                marginLeft: -10,
                // backgroundColor: "blue",
                width: '100%',
                height: 40,
              },
            }}
            onDateChange={date => {
              setDate(date);
            }}
          />
        </View>
      </InputWrap>
    </InputGroup>
  );
};
export default DataTimeField;

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
