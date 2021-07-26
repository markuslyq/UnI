import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

import RegNavigator from './RegistrationStack';
import BottomTab from './BottomTabNavigation';
import ChatScreen from '../src/screens/ChatScreen';
import EditProfileScreen from '../src/screens/EditProfile';
import PersonProfileScreen from '../src/screens/PersonProfile';
import MatchedProfileScreen from '../src/screens/MatchedProfileScreen';

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
                            headerShown: getHeaderTitle(route) == "Chats" ? true : false,
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
                            <HeaderBackButton
                                onPress={() => {
                                    navigation.navigate('Bottom Tab', {
                                        screen: 'Messages'
                                    });
                                    console.log("Go back to Messages Screen")
                                }
                                }
                            />
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(route.params.userEmail)
                                    navigation.navigate('Person Profile', { personEmail: route.params.userEmail });
                                }}>
                                <Avatar.Image
                                    size={35}
                                    style={{ marginRight: 10 }}
                                    source={route.params.profilePhotoUri} />
                            </TouchableOpacity>
                        )
                    })} />
                <Stack.Screen name="Edit Profile" component={EditProfileScreen}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="Person Profile" component={PersonProfileScreen}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="Matched Profiles" component={MatchedProfileScreen}
                    options={({ navigation, route }) => ({
                        headerShown: false,
                        title: "Matches",
                        headerLeft: () => (
                            <HeaderBackButton
                                onPress={() => {
                                    navigation.navigate('Bottom Tab', {
                                        screen: 'Match'
                                    });
                                    console.log("Go back to Match Screen")
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