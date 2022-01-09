import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';
import {colors, wp} from 'src/config/variables';
import Feather from 'react-native-vector-icons/Feather'
import {Header} from 'react-native-elements';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import {BASEURL} from 'src/constants/Services';
import ExpertiseForm from 'src/screens/forms/ExpertiseForm';
import {
  styles as style,
  ContentWrap,
  styles,
  Container,
} from 'src/screens/modules/EditProfile/styles';
import axios from 'axios';
import { GetExpertiseFromApi, sendExpert, setLoading } from 'src/redux/actions/AuthActions';


function EditExpertise(props) {
  
    const navigation = useNavigation();
    const { auth, } = useSelector(state => state)
    const { expertise = {}} = auth
    const dispatch = useDispatch()
    const [value, setValue] = useState(expertise);
    
    const onChangeText = (key, data) => {
        setValue({...value, [key]: data});
    
    };
 


  useEffect(() => {
    const {userData} = auth
    dispatch(GetExpertiseFromApi(userData.id));
  }, []);

 
  const [newdrop, setnewdrop] = useState([]);
  const [newskill, setNewskill] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getCategorySkills(category);
  }, [category]);

  const getCategorySkills = category => {
    let uri = BASEURL + `/category/category/${category}`;
    setNewskill([]);
   
      axios.get(uri, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }) .then(res => {
          dispatch(setLoading(false));
          if (res.data != undefined) {
           
            const updated = res.data.skillsets.map(
              ({id: value, name: label}) => ({
                value,
                label,
              }),
            );
           
            setNewskill(updated);
          } else {
            setNewskill([]);
          }
        })
        .catch(error => {
          dispatch(setLoading(false));
          console.log(
            'An error occurred while fetching skills for category id: ' + id,
          );
        });
   
  };

  const UpdateExpertiseToApi = () => {
    dispatch(setLoading(true));
    let uri = BASEURL + `/profiles/expertise/${auth.userData.id}`;
    const { skills = "" } = value 
    
    const data = { bio: value.bio, category: value.category, role: value.role, level_of_experience: value.level_of_experience, skills: Array.isArray(skills) ? skills : skills.split(","), user_id: auth.userData.id }
    console.log("____EXPERT_Data_", data)
        axios.put(uri,data,{
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer' + ' ' + auth.token,
        },
        })
      .then(res => {
        console.log("___RES_EXPERT_DONE_", res)
        const { data = {} } = res.data
        dispatch(sendExpert(data))
        dispatch(setLoading(false));
        navigation.goBack()
      })
      .catch(error => {
        console.log("___ERROR EXPERT__", error.response)
        dispatch(setLoading(false));
        
      });
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container2}>
      <SafeAreaView style={styles.header_safearea}>
        <Header
          leftComponent={<HeaderLeft />}
          statusBarProps={{barStyle: 'dark-content'}}
          centerComponent={
            <Text
              style={{
                color: colors.white,
                fontSize: wp('4%'),
                fontWeight: 'bold',
              }}>
              Edit Expertise Information
            </Text>
          }
          //rightComponent={<HeaderRight />}
          containerStyle={{
            backgroundColor: colors.green,
            justifyContent: 'space-between',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingBottom: 30,
            borderBottomWidth: 0,
          }}
        />
      </SafeAreaView>
      <View style={styles.contentWrapper2}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{flex: 1}}>
            {/* Title */}

            <Container>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginHorizontal: 10, flex: 1}}>
                <View style={styles.subheader_container}>
                  <Text style={styles.description}>
                    Tell us about the work you do
                  </Text>
                </View>

                <ExpertiseForm value={value} onChangeText={onChangeText} />
                <View
                  style={{
                    bottom: 2,
                    marginTop: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    onPress={UpdateExpertiseToApi}
                    style={{
                      width: '50%',
                      height: 50,
                      backgroundColor: colors.green,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: 'bold',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Container>
            {/* Footer */}

            {/* End of Footer */}
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default EditExpertise;
