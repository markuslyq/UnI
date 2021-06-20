import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert } from 'react-native';

import { Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";

const ProfileScreen = ({ navigation }) => {

    const signOutPress = () => {
        Authentication.signOut(
            ()=>{navigation.navigate('Home')},
            (error) => {
                Alert.alert("Sign Out Error", error);
            }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>ProfileScreen</Text>
            {/* Signout Button */}
            <Button style={styles.signOutButton}
                labelStyle={styles.signOutButtonText}
                mode="contained"
                color="#FD9E0F"
                uppercase={false}
                onPress={signOutPress}>
                Sign Out
            </Button>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    signOutButton: {
        marginTop: 40,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signOutButtonText: {
        borderRadius: 20,
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default ProfileScreen;