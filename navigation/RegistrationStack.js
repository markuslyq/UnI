import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import MatchScreen from '../src/screens/MatchScreen';
import EmailVerificationScreen from '../src/screens/EmailVerification';

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
                <Stack.Screen name="Match" component={MatchScreen} />
                <Stack.Screen name="Email Verification" component={EmailVerificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default RegNavigator;