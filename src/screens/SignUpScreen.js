import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { ScrollView, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, Image, Animated, Keyboard, Alert } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import BackBtn from '../components/BackBtn';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const SignUpScreen = ({ navigation }) => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [data, setData] = React.useState({
        isValidEmail: true,
        isValidPassWord: true,
        confirmPasswordMatch: true,
    });
    const [isSignUpLoading, setSignUpLoading] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);


    const docData = {
        Name: name,
        FirstTimeLogin: true,
        Gender: '',
        Major: '',
        CCAs: '',
        Interest: ''
    }

    const handleValidEmail = (val) => {
        if ((val.toString().slice(-10) != '@u.nus.edu') || (val.toString().length <= 10)) {
            setData({
                ...data,
                isValidEmail: false
            });
        } else {
            setData({
                ...data,
                isValidEmail: true
            });
        }
    }

    const handleValidPassword = (val) => {
        if (val.toString().length < 6) {
            setData({
                ...data,
                isValidPassWord: false
            });
        } else {
            setData({
                ...data,
                isValidPassWord: true
            })
        }
    }

    const handleConfirmPassword = () => {
        if (confirmPassword == password) {
            setData({
                ...data,
                confirmPasswordMatch: true
            });
        } else {
            setData({
                ...data,
                confirmPasswordMatch: false
            });
        }
    }

    const signUpPress = () => {
        Keyboard.dismiss();

        if (data.confirmPasswordMatch && data.isValidEmail && data.isValidPassWord) {
            Authentication.createAccount(
                { email, password, name},
                (user) => { 
                    Database.add(email, "Information", docData, false);
                    navigation.navigate('Email Verification');
                    console.log("Go to Email Verification Screen");
                },
                (error) => {
                    if (error == 'auth/email-already-in-use') {
                        Alert.alert("Sign Up Error", "Email is already in use.")
                    } else if (error == 'auth/weak-password') {
                        Alert.alert("Weak Password", "Please use a stronger password.")
                    } else {
                        Alert.alert("Sign Up Error", "Please try again later.");
                        console.log(error);
                    }
                }

            )
        } else if (!data.confirmPasswordMatch) {
            Alert.alert("Sign Up Error", "Please confirm your password.");
        } else if (!data.isValidEmail) {
            Alert.alert("Sign Up Error", "Please enter a valid email address.");
        } else if (!data.isValidPassWord) {
            Alert.alert("Weak Password", "Please use a stronger password.");
        } else {
            Alert.alert("Sign Up Error", "Please key in a valid email address and confirm your password.");
        }
    }

    return (
        <SafeAreaView>

            {/* Back Button  */}
            <BackBtn onPress={() => navigation.goBack()} />

            {/* Main Body */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>
                    <View style={styles.container}>
                        {/* Logo */}
                        <Image source={require('../../assets/images/UnILogo.png')}
                            style={styles.Logo} />

                        {/* Description */}
                        <View style={styles.bottomContainer}>
                            <Text style={styles.signUpText}>Create Account</Text>
                            <Text style={styles.descriptionText}>Sign up to get started!</Text>
                        </View>

                        <View style={styles.inputContainer}>

                            {/* Name Input */}
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                                label="Name"
                                placeholder="Enter your name"
                                value={name}
                                onChangeText={name => setName(name)} />

                            {/* Email Input */}
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={email => setEmail(email.toLocaleLowerCase())}
                                onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
                            {data.isValidEmail ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Please enter a valid NUS email.</Text>
                                </Animated.View>
                            }

                            {/* Password Input */}
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                                label="Password"
                                placeholder="Enter your password"
                                right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
                                secureTextEntry={!isPasswordVisible}
                                value={password}
                                onChangeText={password => setPassword(password)}
                                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)} />
                            {data.isValidPassWord ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginRight: 55 }]}>Password has to be more than 6 characters.</Text>
                                </Animated.View>
                            }

                            {/* Confirm Password Input */}
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                right={<TextInput.Icon name={isConfirmPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsConfirmPasswordVisible((state) => !state)} />}
                                secureTextEntry={!isConfirmPasswordVisible}
                                value={confirmPassword}
                                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                                onEndEditing={() => handleConfirmPassword()} />
                            {data.confirmPasswordMatch ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginRight: 150 }]}>Passwords do not match.</Text>
                                </Animated.View>
                            }

                            {/* Sign Up Button */}
                            <Button style={styles.signUpButton}
                                labelStyle={styles.signUpButtonText}
                                mode="contained"
                                color="#FD9E0F"
                                uppercase={false}
                                onPress={signUpPress}
                                loading={isSignUpLoading}
                                disabled={isSignUpLoading}>
                                Sign Up
                            </Button>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Logo: {
        marginTop: -70,
        width: 200,
        height: 157
    },
    signUpText: {
        marginTop: 50,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 30
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    input: {
        width: 320,
        paddingTop: 10
    },
    errorMsg: {
        marginRight: 125,
        fontFamily: 'Avenir',
        fontSize: 12,
        color: 'red',
    },
    signUpButton: {
        borderRadius: 20,
        marginTop: 30,
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
    }

})

export default SignUpScreen;