import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import RegNavigator from './RegistrationStack';
import BottomTab from './BottomTabNavigation';
import ChatScreen from '../src/screens/ChatScreen';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';

    switch (routeName) {
        case 'Profile':
            return 'Profile';
        case 'Messages':
            return 'Chats';
        case 'Match':
            return 'Match';
    }
}

function AppStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Registration"
            >
                <Stack.Screen name="Registration" component={RegNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Bottom Tab" component={BottomTab}
                    options={
                        ({ route }) => ({
                            headerShown: getHeaderTitle(route) == 'Profile' ? false : true,
                            headerTitle: getHeaderTitle(route),
                            headerLeft: () => null,
                        })
                    } />
                <Stack.Screen name="Chat" component={ChatScreen}
                    options={({ navigation, route }) => ({
                        title: route.params.userName,
                        headerShown: true,
                        headerTitleStyle: { color: 'black' },
                        // headerBackTitleVisible: false,
                        // headerTintColor: '#FD9E0F'
                        headerLeft: () => (
                            // <Image style={styles.backIcon}source={require('../assets/images/back-icon.png')} 
                            // />
                            <HeaderBackButton
                                onPress={() => {
                                    navigation.navigate('Bottom Tab', {
                                        screen: 'Messages'
                                    });
                                    console.log("Go back to Messages Screen")
                                }
                                }
                            />
                        )
                    })} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    backIcon: {
        marginRight: -7,
        width: 30,
        height: 30
    }
})


export default AppStack;