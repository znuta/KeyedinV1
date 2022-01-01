import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Header, Icon, Divider } from 'react-native-elements';

import Colors from 'src/constants/Colors';
import Transaction from 'src/component/Transaction';
import { connect, useDispatch, useSelector } from 'react-redux';
import { BASEURL } from 'src/constants/Services';
import { colors, hp, wp } from 'src/config/variables';
import Empty from 'src/component/Empty';
import SettingsBtn from 'src/assets/icons/settingsbtn.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import Withdrawal from './Withdrawal';
import Deposite from './deposite'
import axios from 'axios';
import { saveBalance } from 'src/redux/actions/WalletActions';
import { setLoading } from 'src/redux/actions/AuthActions';

function Wallet(props) {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refDepositeSheet = useRef();
  const dispatch = useDispatch()
  const {auth, wallet} = useSelector(state=>state)
  useEffect(() => {
    StatusBar.setHidden(false);
    setBalance(auth.wallet_balance);
    
  }, []);

  useEffect(() => {
    StatusBar.setHidden(false);
    setBalance(auth.wallet_balance);
   
  }, [auth.wallet_balance]);

  const [balance, setBalance] = useState(0);
  const rotateValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(),
  );

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const GetBalance = () => {
    let uri = BASEURL + `/wallets/balance/${auth.userData.id}`;

    dispatch(setLoading(true));
    axios.get(uri, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: 'Bearer' + ' ' + auth.token,
      },
    })
     
      .then(res => {
       const {data} = res.data
        console.log("___WALLET__",res);
        setBalance(data.available_balance);
       dispatch(saveBalance(data.available_balance));
        setRefreshing(false);
        dispatch(setLoading(false));
        //setData(res.data);
        //setErrormessage(res.data);
      })
     
      .catch(error => {
        console.log("___ERROR__WALLET__", error.response)
        dispatch(setLoading(false));
        
      });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetBalance();
  }, []);

  useEffect(() => {
    setRefreshing(true);
    GetBalance();
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.secondary, Colors.primary]}
        />
      }>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={{paddingHorizontal: 10}}>
            <Image
              source={{
                uri: auth.avatar,
                // avatar,
                // "https://static.dribbble.com/users/1304678/screenshots/7301908/media/3f91189797dd514eb6446b21a4faa209.png",
              }}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderColor: colors.white,
                borderWidth: 1,
                position: 'relative',
                borderRadius: 50,
                width: 32,
                height: 32,
              }}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <Text
            style={{
              color: colors.white,
              fontWeight: '700',
              marginTop: hp('1%'),
              fontSize: wp('5%'),
            }}>
            Wallet
          </Text>
        }
        rightComponent={
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            // onPress={() => navigation.openDrawer()}
            onPress={() => {
              //navigation.openDrawer();

              navigation.navigate('Settings');
            }}>
            {/* <Feather name="menu" size={24} color="white" /> */}
            <SettingsBtn />
          </TouchableOpacity>
        }
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: colors.green,
        }}
        containerStyle={{
          backgroundColor: colors.green,
          justifyContent: 'space-between',
          borderBottomWidth: 0,
        }}
      />
     
      <BalanceContainer>
        <View style={{ paddingLeft: 15 }}>
          <WalletBalanceWrap>
            <WalletBalance>
              &#8358;{' '}
              {Number(balance)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </WalletBalance>
            <TouchableOpacity
              style={{
                marginLeft: 10,

                backgroundColor: '#00000030',
                borderRadius: 50,
              }}
              onPress={() => {
                GetBalance();
              }}>
              <Animated.View style={{ transform: [{ rotate: spin }], padding: 5 }}>
                <Feather name="refresh-cw" color="#FFF" size={14} />
              </Animated.View>
            </TouchableOpacity>
          </WalletBalanceWrap>
          <WalletBalanceLabel>Wallet Balance</WalletBalanceLabel>
          <WalletSpace />
          <WalletBalanceWrap>
            <EarningBalance font-size={8}>
              &#8358;{' '}
              {Number(balance)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </EarningBalance>
          </WalletBalanceWrap>
          <WalletBalanceLabel>Total earning</WalletBalanceLabel>
        </View>
        <View>
          <WalletActions>
            <WalletAction
              onPress={() => {
                navigation.navigate('Insight');
              }}>
              <WalletActionIcon>
                <MaterialCommunityIcons
                  name="chart-bar"
                  size={20}
                  color="white"
                  style={{ opacity: 0.8 }}
                />
              </WalletActionIcon>
              <WalletActionLabel>Insights</WalletActionLabel>
            </WalletAction>

            <WalletAction
              onPress={() => {
                refRBSheet.current.open();
                // navigation.navigate('Withdrawal');
              }}>
              <WalletActionIcon>
                <Feather
                  name="arrow-down"
                  size={20}
                  color="white"
                  style={{ opacity: 0.8 }}
                />
              </WalletActionIcon>
              <WalletActionLabel>Withdraw</WalletActionLabel>
            </WalletAction>
          </WalletActions>
          <WalletSpace />

          <WalletActions>
            <WalletAction
              onPress={() => {
                navigation.navigate('Withdrawal');
              }}>
              <WalletActionIcon>
                <Feather
                  name="filter"
                  size={20}
                  color="white"
                  style={{ opacity: 0.8 }}
                />
              </WalletActionIcon>
              <WalletActionLabel>Filter</WalletActionLabel>
            </WalletAction>
            <WalletAction
              onPress={() => {
                refDepositeSheet.current.open();
              }}>
              <WalletActionIcon>
                <Feather
                  name="arrow-up"
                  size={20}
                  color="white"
                  style={{ opacity: 0.8 }}
                />
              </WalletActionIcon>
              <WalletActionLabel>Deposit</WalletActionLabel>
            </WalletAction>
          </WalletActions>
        </View>
      </BalanceContainer>

      <ContentContainer>
        {/* <TitleRow>
          <Title>Recent Transactions</Title>
          <SearchIcon>
            <Feather name="search" size={20} color={Colors.mutedText} />
          </SearchIcon>
        </TitleRow> */}

        {/* <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Image
            source={require("../../config/images/Layer-12.png")}
            resizeMode={"contain"}
            style={{ height: 200, width: "100%" }}
          />
          <Text style={{ color: colors.medium, marginTop: 20 }}>
            No Transactions yet
          </Text>
        </View> */}

        {/* <Empty
          title={"No Recent Transactions"}
          subTitle={"Your recent wallet transactions show up here"}
        /> */}

        <TransactionsWrap showsVerticalScrollIndicator={false}>
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          {/* <TransactionsLink onPress={() => navigation.navigate('Transactions')}>
            <TransactionsLinkTitle>All Transactions</TransactionsLinkTitle>
            <Entypo name="chevron-right" size={16} color="black" />
          </TransactionsLink> */}
        </TransactionsWrap>

        <RBSheet
          ref={refRBSheet}
          height={hp('70%')}
          animationType="slide"
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              // backgroundColor: 'transparent',
              borderTopLeftRadius: 10,
            },
            draggableIcon: {
              backgroundColor: 'lightgrey',
              width: '30%',
              height: '11%',
            },
          }}>
          <Withdrawal />
        </RBSheet>

        <RBSheet
          ref={refDepositeSheet}
          height={hp('70%')}
          animationType="slide"
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              // backgroundColor: 'transparent',
              borderTopLeftRadius: 10,
            },
            draggableIcon: {
              backgroundColor: 'lightgrey',
              width: '30%',
              height: '11%',
            },
          }}>
          <Deposite />
        </RBSheet>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const BalanceContainer = styled.View`
  ${'' /* background-color: ${Colors.primary}; */}
  background-color: ${colors.green};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-vertical: ${hp('4%')};
  padding-horizontal: ${wp('2%')};
  border-bottom-left-radius: ${wp('8%')};
  border-bottom-right-radius: ${wp('8%')};
`;

const WalletBalanceWrap = styled.View`
  align-items: center;

  flex-direction: row;
`;

const WalletBalance = styled.Text`
  font-size: ${wp('10%')};
  font-weight: 900;
  color: white;
`;

const EarningBalance = styled.Text`
  font-size: ${wp('5.5%')};
  font-weight: 900;
  color: white;
`;

const WalletSpace = styled.View`
  margin-vertical: ${hp('1.5%')};
`;
const WalletBalanceLabel = styled.Text`
  color: white;
  margin-top: 0px;

  font-weight: 500;
  opacity: 0.7;
`;

const WalletActions = styled.View`
  flex-direction: row;
  ${'' /* align-items: center; */}

  flex-wrap: wrap;
  padding-right: 15px;
  justify-content: flex-end;
  ${'' /* max-width: ${Layout.window.width * 0.75}px; */}
`;

const WalletAction = styled.TouchableOpacity`
  padding-horizontal: 5px;
  align-items: center;
  ${'' /* flex: 1; */}
`;

const WalletActionIcon = styled.View`
  justify-content: center;
  align-items: center;
  ${'' /* background-color: #00000010; */}
  background-color: #00000015;
  width: ${wp('10%')};
  height: ${wp('10%')};
  border-radius: 10px;
  margin-bottom: ${hp('0.5%')};
`;

const WalletActionLabel = styled.Text`
  text-align: center;
  font-size: ${wp('2.5%')};
  font-weight: 400;
  color: white;
`;

const ContentContainer = styled.View`
  flex: 2;
  background-color: white;
  padding-vertical: 30px;
  padding-horizontal: 30px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  flex: 1;
`;

const SearchIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const TransactionsWrap = styled.ScrollView`
  margin-top: 25px;
  flex: 1;
`;

const TransactionsLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TransactionsLinkTitle = styled.Text`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 12px;
  margin-right: 5px;
`;

export default Wallet;
