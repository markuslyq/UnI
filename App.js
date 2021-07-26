import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MatchScreen from './src/screens/MatchScreen';

import EmailVerificationScreen from './src/screens/EmailVerification';
import BirthdayPromptScreen from './src/screens/BirthdayPrompt';
import GenderScreen from './src/screens/GenderScreen';
import TestScreen from './src/screens/Test';
import BottomTab from './navigation/BottomTabNavigation';
import ProfileScreen from './src/screens/Profile';
import MessagesScreen from './src/screens/Messages';
import EditProfileScreen from './src/screens/EditProfile';

import Navigator from './navigation/RegistrationStack'
import AppStack from './navigation/Route';

export default function App() {

  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    MontserratExtraLight: require('./assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    SFPro: require('./assets/fonts/SFPro/SFPro-Regular.ttf'),
    SFProMedium: require('./assets/fonts/SFPro/SFPro-Medium.ttf'),
    SFProBold: require('./assets/fonts/SFPro/SFPro-Bold.ttf'),
    GothamRoundedMedium: require('./assets/fonts/gotham-rounded/GothamRoundedMedium_21022.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider >
      {/* <Navigation colorScheme={colorScheme} /> */}
      {/* <HomeScreen /> */}
      {/* <LoginScreen /> */}
      {/* <SignUpScreen/> */}
      {/* <MatchScreen /> */}
      {/* <EmailVerificationScreen /> */}
      {/* <BirthdayPromptScreen /> */}
      {/* <GenderScreen /> */}
      {/* <TestScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <MessagesScreen /> */}
      {/* <EditProfileScreen /> */}
      {/* <Navigator /> */}
      <AppStack />
      {/* <MsgStack /> */}
      {/* <BottomTab /> */}
      <StatusBar />
    </SafeAreaProvider>
  );
}
