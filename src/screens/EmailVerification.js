import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';

import { Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";

const EmailVerificationScreen = ({ route, navigation }) => {

    // const sendEmailVerification = () => {
    //     const { user } = route.params;

    //     Authentication.sendEmailVerification(
    //         user,
    //         (user) => {Alert.alert("Sent")},
    //         () => {Alert.alert("Error")})
    // }

    const logInPress = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView>

            <ScrollView>
                {/* Logo */}
                <Image source={require('../../assets/images/UnILogo(full).png')}
                    style={styles.uniLogo} />

                <View style={styles.bottomContainer}>

                    {/* Description */}
                    <Text style={styles.welcomeText}>Verify your{"\n"}email address</Text>
                    <Text style={styles.descriptionText}>Thank you for signing up but before we get{"\n"}started, a verification link has been sent to{"\n"}your email and we'll need to verify it.</Text>

                    {/* Getting Started Button */}
                    <Button style={styles.signUpButton}
                        labelStyle={styles.signUpButtonText}
                        mode="contained"
                        color="#FD9E0F"
                        uppercase={false}
                        onPress={logInPress}>
                        Log In
                    </Button>

                    {/* Send Verification Prompt */}
                    {/* <Text style={styles.descriptionText}>Did not receive a verification link?
                        <Text style={styles.logInText} onPress={sendEmailVerification}>  Send Again</Text>
                    </Text> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    uniLogo: {
        marginLeft: 30,
        width: 300
    },
    welcomeText: {
        marginTop: 0,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    signUpButton: {
        marginTop: 50,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButtonText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    },
    logInText: {
        color: '#FD9E0F',
        fontWeight: 'bold'
    }
})

export default EmailVerificationScreen;