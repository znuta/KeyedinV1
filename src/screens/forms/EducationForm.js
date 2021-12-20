import React, {useState, useEffect} from 'react';
import {
 
  View,
  
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ListItemSeparator from 'src/component/ListItemSeparator';
import {BASEURL} from 'src/constants/Services';

import Loader from 'src/component/Loader';
import Button from 'src/component/Button/index';
import TextField from 'src/component/TextField';
import TextArea from 'src/component/TextArea';
import SelectField from 'src/component/SelectField';
import DataTimeField from 'src/component/DataTimeField';

import {useSelector, useDispatch} from 'react-redux';

import {wp, hp, fonts, colors} from 'src/config/variables';

const Education = props => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const todos = useSelector(state => state.todo);
  const {onChangeText, value} = props;
  const {schoolName, degree, course, startDate, stopDate} = value;
  const previousStep = () => {
    const {back, saveState} = props;
    back();
  };

  

  const todayA = new Date();
  const formattedToday =
    todayA.getDate() +
    '-0' +
    (todayA.getMonth() + 1) +
    '-' +
    todayA.getFullYear();


  return (
    <View>
      {auth.loading && <Loader />}
      <TextField
        value={schoolName}
        label="Name of School/Institution"
        onChangeText={value => onChangeText('schoolName', value)}
        placeholder="Name of School/Institution"
      />
     

      {true && (
        <View
          style={{
            borderRadius: 12,
            flexDirection: 'row',
            width: '100%',

            marginBottom: 20,
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <DataTimeField
            // style={{ width: 100 }}
            duration={150}
            date={startDate}
            label="Start Date"
            placeholder="select date"
            setDate={value => onChangeText('startDate', value)}
          />

          {/* ios stop date */}
          <DataTimeField
            // style={{ width: 100 }}
            duration={150}
            date={stopDate}
            label="Stop Date"
            placeholder="select date"
            setDate={value => onChangeText('stopDate', value)}
          />

        </View>
      )}

      <SelectField
        value={degree}
        label="Degree/Certificate earned"
        items={[
          {label: 'Junior WAEC', value: 'Junior WAEC'},
          {label: 'WAEC', value: 'WAEC'},
          {label: 'B.Sc', value: 'Bachelor of Science'},
          {label: 'Masters', value: 'Masters'},
          {label: 'PhD', value: 'Doctor of Philosophy'},
        ]}
        onChangeText={itemValue => onChangeText('degree', itemValue)}
      />
      
      <ListItemSeparator style={{marginTop: hp('2.5%')}} />
      
    </View>
  );
};

export default Education;
