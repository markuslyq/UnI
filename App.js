import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MatchScreen from './src/screens/MatchScreen';

import EmailVerificationScreen from './src/screens/EmailVerification';
import BirthdayPromptScreen from './src/screens/BirthdayPrompt';
import GenderScreen from './src/screens/GenderScreen';
import TestScreen from './src/screens/Test';

import Navigator from './navigation/RegistrationStack'


export default function App() {
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
      <Navigator />
      <StatusBar />
    </SafeAreaProvider>
  );
}
