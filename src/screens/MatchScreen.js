import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

import { Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const MatchScreen = ({ navigation }) => {

    let userID = "";
    let userEmail = "";

    const user = Authentication.auth.currentUser;
    if (user) {
        userID = user.uid;
        userEmail = user.email;
    }

    // useEffect(() => {

    //     const unSubscribe = Database.db.onSnapshot((querySnap) => {
    //         querySnap.docs.map(docSnap => {
    //             const data = docSnap.data();
    //         })
    //         return () => {
    //             unSubscribe()
    //         }
    //     })

    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>MatchScreen</Text>

            <Button style={styles.chatButton}
                labelStyle={styles.chatButtonText}
                mode="contained"
                color="#FD9E0F"
                uppercase={false}
                onPress={() => navigation.navigate('Chat', { userName: 'Markus', userEmail: 'e0556359@u.nus.edu', userID: 'lKYjJHBfR7ZM7wisBoLhe2qa6if2', email: userEmail })}>
                Chat with Markus
            </Button>

            <Button style={styles.chatButton}
                labelStyle={styles.chatButtonText}
                mode="contained"
                color="#FD9E0F"
                uppercase={false}
                onPress={() => navigation.navigate('Chat', { userName: 'Lee', userEmail: 'e0238558@u.nus.edu', userID: 'hjhgY06VWcMBeEupm7VwOLi75Zv2', email: userEmail })}>
                Chat with Lee
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
    chatButton: {
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatButtonText: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default MatchScreen;