import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';

import { Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";

const EmailVerificationScreen = ({ route, navigation }) => {

    const logInPress = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView>

            <ScrollView>
                <View>
                    {/* Logo */}
                    <Image source={require('../../assets/images/UnILogo(full).png')}
                        style={styles.uniLogo} />

                    <View style={styles.bottomContainer}>

                        {/* Description */}
                        <Text style={styles.welcomeText}>Verify your{"\n"}email address</Text>
                        <Text style={styles.descriptionText}>Thank you for signing up but before we get{"\n"}started, a verification link has been sent to{"\n"}your email and we'll need to verify it.</Text>

                        {/* Login Button */}
                        <Button style={styles.signInButton}
                            labelStyle={styles.signInButtonText}
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
        marginTop: 50,
        marginLeft: 30,
        width: 300
    },
    welcomeText: {
        marginTop: 0,
        fontFamily: 'GothamRoundedMedium',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'SFPro',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    signInButton: {
        borderRadius: 20,
        marginTop: 50,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInButtonText: {
        fontFamily: 'SFPro',
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