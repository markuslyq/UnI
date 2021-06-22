import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import EmailVerificationScreen from '../src/screens/EmailVerification';
import FirstTimeLoginScreen from '../src/screens/FirstTimeLogin';
import GenderScreen from '../src/screens/GenderScreen';
import BirthdayPromptScreen from '../src/screens/BirthdayPrompt';
import MajorScreen from '../src/screens/MajorPrompt';
import CCAPromptScreen from '../src/screens/CCAPrompt';
import InterestPromptScreen from '../src/screens/InterestPrompt';
import ProfileScreen from '../src/screens/Profile';
import MatchScreen from '../src/screens/MatchScreen';

const Stack = createStackNavigator();

function RegNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
              }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Email Verification" component={EmailVerificationScreen} />
                <Stack.Screen name="First Time Login" component={FirstTimeLoginScreen} />
                <Stack.Screen name="Gender" component={GenderScreen} />
                <Stack.Screen name="Birthday" component={BirthdayPromptScreen} />
                <Stack.Screen name="Major" component={MajorScreen} />
                <Stack.Screen name="CCAs" component={CCAPromptScreen} />
                <Stack.Screen name="Interests" component={InterestPromptScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Match" component={MatchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RegNavigator;