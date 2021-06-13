import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MatchScreen from '../src/screens/MatchScreen';

const Stack = createStackNavigator();

function AppNavigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Match"
            screenOptions={{
                headerShown: false
              }}>
                <Stack.Screen name="Match" component={MatchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigator;