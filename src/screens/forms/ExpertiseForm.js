import React, {useState, useEffect, useRef, Fragment} from 'react';
import {wp, hp, fonts, colors} from 'src/config/variables';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  
} from 'react-native';
import Loader from 'src/component/Loader';
import TextField from 'src/component/TextField';
import TextArea from 'src/component/TextArea';
import {
  ShadowBtn,
  styles as style,
  ContentWrap,
  styles,
  Container,
  InputGroup,
  InputLabel,
  InputWrap,
  TextAreaWrap,
} from './styles';
import {useSelector, useDispatch} from 'react-redux';


const Expertise = props => {
  let multiSelect = props.multiSelect;
  const {onChangeText, value} = props;
  const {bio,  skills, category = "", level_of_experience} = value;
  const {auth, expert} = useSelector(state => state);
  

  return (
    <View style={styles.container2}>
      <TextArea
        label="Bio"
        value={bio}
        onChangeText={value => onChangeText('bio', value)}
        placeholder="(Tell us about yourself, why are you unique?)"
      />

      <TextField
        value={category}
        label="Service Category"
        onChangeText={value => onChangeText('category', value)}
        placeholder="Service Category"
      />

      {auth.loading && <Loader />}

      <TextField
        value={skills && skills.length && skills.toString()}
        label="Skills"
        onChangeText={value => onChangeText('skills', value)}
        placeholder="Enter Skills, separeted by comma"
      />


      <InputGroup>
        <InputLabel>Level of Experience</InputLabel>

        <View style={[styles.experience_level, {marginTop: hp('2%')}]}>
          <TouchableOpacity
            style={styles.dot}
            onPress={value => onChangeText('level_of_experience', 'Beginner')}>
            <View
              style={
                level_of_experience == 'Beginner'
                  ? styles.activeDot
                  : styles.inactiveDot
              }
            />
          </TouchableOpacity>
          <View style={styles.cover}>
            <Text style={styles.statusText}>Beginner</Text>
          </View>
        </View>
        <View style={styles.experience_level}>
          <TouchableOpacity
            style={styles.dot}
            onPress={() => onChangeText('level_of_experience', 'Average')}>
            <View
              style={
                level_of_experience == 'Average'
                  ? styles.activeDot
                  : styles.inactiveDot
              }
            />
          </TouchableOpacity>
          <View style={styles.cover}>
            <Text style={styles.statusText}>Average</Text>
          </View>
        </View>
        <View style={styles.experience_level}>
          <TouchableOpacity
            style={styles.dot}
            onPress={() => onChangeText('level_of_experience', 'Expert')}>
            <View
              style={
                level_of_experience == 'Expert'
                  ? styles.activeDot
                  : styles.inactiveDot
              }
            />
          </TouchableOpacity>
          <View style={styles.cover}>
            <Text style={styles.statusText}>Expert</Text>
          </View>
        </View>
      </InputGroup>
    </View>
  );
};

export default Expertise;
