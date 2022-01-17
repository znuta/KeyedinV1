/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import SplashScreen from './src/screens/intro/SplashScreen/SplashScreen';
 import rootReducer from './src/redux/reducers';
 import {persistStore, persistReducer} from 'redux-persist';
 import {createLogger} from 'redux-logger';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {createStore, applyMiddleware} from 'redux';
 import {Provider} from 'react-redux';
 import {PersistGate} from 'redux-persist/es/integration/react';
 import thunk from 'redux-thunk';
 import {CometChat} from '@cometchat-pro/react-native-chat';
 
 let appID = '2008518ba66d45e4';
 let region = 'us';
 let appSetting = new CometChat.AppSettingsBuilder()
   .subscribePresenceForAllUsers()
   .setRegion(region)
   .build();
 CometChat.init(appID, appSetting).then(
   () => {
     console.log('Initialization completed successfully');
   },
   error => {
     console.log('Initialization failed with error:', error);
   },
 );
 
 const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: ['intro', 'auth', 'demo'],
   //whitelist: ["demo"],
 };
 
 const reduxMiddlewares = [thunk, createLogger()];
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);
 
 const store = createStore(
   persistedReducer,
   applyMiddleware(...reduxMiddlewares),
   // applyMiddleware(createLogger())
 );
 
 const persistedStore = persistStore(store);
 
 const App = () => {
   const STYLES = ['default', 'dark-content', 'light-content'];
   const TRANSITIONS = ['fade', 'slide', 'none'];
 
   const [hidden, setHidden] = useState(false);
   const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
   const [statusBarTransition, setStatusBarTransition] = useState(
     TRANSITIONS[0],
   );
 
 
   return (
     <Provider store={store}>
       <PersistGate persistor={persistedStore} loading={false}>
         <StatusBar
           animated={true}
           backgroundColor="green"
           barStyle={statusBarStyle}
           showHideTransition={statusBarTransition}
           hidden={hidden}
         />
 
         <SplashScreen />
       </PersistGate>
     </Provider>
   );
 };
 
 
 export default App;
 