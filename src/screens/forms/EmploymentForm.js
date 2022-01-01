import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {InputLabel, InputGroup, styles as style, styles} from './styles';
import Button from 'src/component/Button/index';
import ListItemSeparator from 'src/component/ListItemSeparator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Loader from 'src/component/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {wp, hp, fonts, colors} from 'src/config/variables';
import TextField from 'src/component/TextField';
import TextArea from 'src/component/TextArea';
import SelectField from 'src/component/SelectField';
import DataTimeField from 'src/component/DataTimeField';


const Employment = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {onChangeText, value, documentPicker=()=>{}} = props;
  const {jobDescription, jobLinks, employerName, jobRole, startDate, stopDate} =
    value;
  const {auth} = useSelector(state => state);
  const todosa = useSelector(state => state.employ);

  const [profUpload, setprofUpload] = useState(false);
  
  
  return (
    <View>
     
      <TextField
        value={employerName}
        label="Company Name"
        onChangeText={value => onChangeText('employerName', value)}
        placeholder="Company Name"
      />

      <TextField
        value={jobRole}
        label="Job Role"
        onChangeText={value => onChangeText('jobRole', value)}
        placeholder="Job Role"
      />

     
      {auth.loading && <Loader />}

      <TextField
        value={jobDescription}
        label="Job Position"
        onChangeText={value => onChangeText('jobDescription', value)}
        placeholder="Describe your Responsibilities"
      />

      {/* <Text>Date</Text> */}

      {/* Date */}

      <View
        style={{
          // backgroundColor: "red",
          borderRadius: 12,
          flexDirection: 'row',
          width: '100%',
          //padding: 15,
          marginBottom: 0,
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

       
        <DataTimeField
          // style={{ width: 100 }}
          duration={150}
          date={stopDate}
          label="Stop Date"
          placeholder="select date"
          setDate={value => onChangeText('stopDate', value)}
        />

        
      </View>

      <TouchableOpacity
        style={{flexDirection: 'row', marginVertical: hp('1%')}}
        onPress={documentPicker}>
        <View style={styles.circle}>
          <MaterialCommunityIcons name="plus" style={styles.white_plus} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.portfolio_text}>
            <InputLabel>Portfolio</InputLabel> (upload photos of your work)
          </Text>
        </View>
      </TouchableOpacity>

      <InputGroup>
        <Text style={styles.plus_text}>Links to previous jobs</Text>
       
        <TextField
          value={jobLinks}
          onChangeText={value => onChangeText('jobLinks', value)}
          placeholder="Links to previous jobs"
        />
      </InputGroup>

      <ListItemSeparator style={{ marginTop: hp('2.5%') }} />
      
    
      <View>
        {profUpload && (
          <TouchableOpacity
            onPress={deleteVideo}
            style={{
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.green}}>Delete Video</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Employment;
