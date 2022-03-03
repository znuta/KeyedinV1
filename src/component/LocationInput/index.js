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
import { colors, fonts, hp, wp } from '../../config/variables';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationInput = ({
  value,
  placeholder="",
  icon=null,
  handleLocationAddress,
  additionalStyle = {},
  editable = true,
  multiline = false,
  label,
}) => {

    const autocomplete = {
        container: {
          flex: 1,
          
          
        },
        textInputContainer: {
          flexDirection: "row",
        
        },
        textInput: {
          // backgroundColor: colors.green,
          height: wp('12%'),
          borderRadius: wp('50%'),
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 1,
          backgroundColor: '#f2f3f4',
         
        },
        poweredContainer: {
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: "#c8c7cc",
          borderTopWidth: 0.5,
        
          
        },
        powered: {},
      listView: {
       
        },
        row: {
          backgroundColor: "#FFFFFF",
          padding: 13,
          height: 44,
          flexDirection: "row",
        },
        separator: {
          height: 0.5,
          backgroundColor: "#c8c7cc",
        },
        description: {},
        loader: {
          flexDirection: "row",
          justifyContent: "flex-end",
          height: 20,
        },
    };
    

  return (
    <InputGroup style={[additionalStyle.inputGroup]}>
       {label && <InputLabel>{label}</InputLabel>}
    
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            
              minLength={2}
              autoFocus={false}
              returnKeyType={"default"}
              fetchDetails={true}
              listViewDisplayed={false}
              // enablePoweredByContainer={true}
              styles={{ ...autocomplete }}
              onPress={(data, details = null) => {
                console.log("___LOCATION__", details)
                handleLocationAddress(data, details);
              }}
              fetchDetails={true}
                  
              query={{
                key: "AIzaSyD2kRP3CxmIxUvxf_E2BFUeBgQlGsVsJY0",
                language: "en",
                // type: "geocode",
              }}
              currentLocation={true}
              currentLocationLabel="Current location"
              autoFocus={true}
      />
     
      
    </InputGroup>
  );
};
export default LocationInput;

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
  zindex: 1000000;
`;
const InputLabel = styled.Text`
  font-size: ${wp('3.5%')};
  font-weight: 700;
  color: ${colors.header};
`;

export {TextAreaWrap, InputLabel, InputGroup, InputWrap};
