import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MatchScreen from './src/screens/MatchScreen';

import Navigator from './navigation/RegistrationStack'
import EmailVerificationScreen from './src/screens/EmailVerification';

export default function App() {
  return (
    <SafeAreaProvider >
      {/* <Navigation colorScheme={colorScheme} /> */}
      {/* <HomeScreen /> */}
      {/* <LoginScreen /> */}
      {/* <SignUpScreen/> */}
      {/* <MatchScreen /> */}
      {/* <EmailVerificationScreen /> */}
      <Navigator />
      <StatusBar />
    </SafeAreaProvider>
  );
}
