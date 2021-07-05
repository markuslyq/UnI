import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

    const signUpPress = () => {
        navigation.navigate('SignUp');
        console.log("Go to Sign Up Screen");
    }

    const logInPress = () => {
        navigation.navigate('Login');
        console.log("Go to Login Screen");
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {/* Logo */}
                    <Image source={require('../../assets/images/UnILogo(full).png')}
                        style={styles.uniLogo} />

                    <View style={styles.bottomContainer}>

                        {/* Description */}
                        <Text style={styles.welcomeText}>Welcome</Text>
                        <Text style={styles.descriptionText}>Create an account and start{"\n"}making new UNI friends</Text>

                        {/* Getting Started Button */}
                        <Button style={styles.signUpButton}
                            labelStyle={styles.signUpButtonText}
                            mode="contained"
                            color="#FD9E0F"
                            uppercase={false}
                            onPress={signUpPress}>
                            Get Started
                        </Button>

                        {/* Login Prompt */}
                        <Text style={styles.descriptionText}>Already have an account?
                            <Text style={styles.logInText} onPress={logInPress}>  Log In</Text>
                        </Text>

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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    uniLogo: {
        marginRight: 13,
        marginTop: 40,
        width: 300
    },
    welcomeText: {
        marginTop: 50,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 40
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    signUpButton: {
        borderRadius: 20,
        marginTop: 100,
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

export default HomeScreen;