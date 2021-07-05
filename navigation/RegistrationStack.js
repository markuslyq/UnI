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
import YearPromptScreen from '../src/screens/YearPrompt';
import CCAPromptScreen from '../src/screens/CCAPrompt';
import InterestPromptScreen from '../src/screens/InterestPrompt';
import BottomTab from './BottomTabNavigation';

const Stack = createStackNavigator();

function RegNavigator() {
    return (

        <Stack.Navigator
            initialRouteName="Home"
            >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Email Verification" component={EmailVerificationScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="First Time Login" component={FirstTimeLoginScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Gender" component={GenderScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Birthday" component={BirthdayPromptScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Major" component={MajorScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Year" component={YearPromptScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="CCAs" component={CCAPromptScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Interests" component={InterestPromptScreen} options={{ headerShown: false}}/>
            {/* <Stack.Screen name="Bottom Tab" component={BottomTab} /> */}
        </Stack.Navigator>
    )
}


export default RegNavigator;