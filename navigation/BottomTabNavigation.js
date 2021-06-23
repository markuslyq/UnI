import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import ProfileScreen from '../src/screens/Profile';
import MatchScreen from '../src/screens/MatchScreen';
import ChatScreen from '../src/screens/Chats';

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            tabBarOptions={{
                activeTintColor: '#FD9E0F',
                inactiveTintColor: '#8e8e93',
                style: {
                    position: 'absolute'
                }
            }}>
            <Tab.Screen name="Match" component={MatchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/Icons/MatchIcon.png')}
                                resizeMode='contain'
                                style={{
                                    height: 30,
                                    width: 30,
                                    tintColor: focused ? '#FD9E0F' : '#8e8e93'
                                }} />
                        </View>
                    ),
                }} />
            <Tab.Screen name="Chat" component={ChatScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/Icons/ChatIcon.png')}
                                resizeMode='contain'
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: focused ? '#FD9E0F' : '#8e8e93'
                                }} />
                        </View>
                    ),
                }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/Icons/ProfileIcon.png')}
                                resizeMode='contain'
                                style={{
                                    height: 30,
                                    width: 30,
                                    tintColor: focused ? '#FD9E0F' : '#8e8e93'
                                }} />
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}


export default BottomTab;