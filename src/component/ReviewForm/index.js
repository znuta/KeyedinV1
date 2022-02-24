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
import StarRating from 'react-native-star-rating';
import Button from 'src/component/Button';
import { BASEURL } from 'src/constants/Services';
import axios from 'axios';
import { setLoading } from 'src/redux/actions/AuthActions';


const ReviewForm = props => {

  const dispatch = useDispatch()
  const {auth, expert} = useSelector(state => state);
  const [value, setValue] = useState({});
  const {comment = "",  rating=0} = value;

  const onChangeText = (key, data) => {
    setValue({...value, [key]: data});
    
  };
  
  const submitReview = () => {
    let uri = BASEURL + `/ratings/add`;

    let data = {
      ...value,
      user_id: props.protisan_id,
      artisan_id: auth.userData.id,
      protisan_id: props.protisan_id,
      
    };

    console.log("___PAYLOAD___", data)
    dispatch(setLoading(true));
    axios.post(uri, data,{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    }).then(res => {

        console.log("__RES__REVIEW",res);
        dispatch(setLoading(false));
        props.close()
        
      }) .catch(error => {

       
        console.log("__RES__REVIEW_ERROR!",error);
        dispatch(setLoading(false));
       
      });
   
  };

  return (
    <View style={styles.container2}>
        <Text style={styles.walletHeader}> Review User</Text>
      <View style={{marginVertical: hp('2%'),  alignItems: 'center', justifyContent: 'center' }}>
    
          <StarRating
          starStyle={{marginHorizontal: wp('3%')}}
             selectedStar={(rating) => {
              onChangeText('rating', rating)
             }}
            maxStars={5}
            rating={
              !rating 
                ? 0
                : parseInt(Number(rating))
            }
            emptyStar={"star-o"}
            // fullStar={require('src/assets/icons/gold_key.png')}
            // halfStar={require('src/assets/icons/gray_key.png')}
            // emptyStar={require('src/assets/icons/gray_key.png')}
            fullStarColor={'orange'}
            // emptyStarColor={'#FFFFFF'}
            starSize={wp('7%')}
          />
        </View>
      <TextArea
        label="Comment"
        value={comment}
        onChangeText={value => onChangeText('comment', value)}
        placeholder="(Tell us about your user review?)"
      />

      <Button text="Submit" onPress={()=>{
        submitReview()
      }} />

      {auth.loading && <Loader />}
    </View>
  );
};

export default ReviewForm;
