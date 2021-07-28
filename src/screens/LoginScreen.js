import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, Image, Animated, Keyboard, Alert } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import BackBtn from '../components/BackBtn';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";
import User from '../../User';

const LoginScreen = ({ navigation, route }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [data, setData] = React.useState({
        isValidEmail: true,
    });
    const [isLoginLoading, setIsLoginLoading] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleValidEmail = (val) => {
        if (val.toString().slice(-10) != '@u.nus.edu') {
            setData({
                isValidEmail: false
            });
        } else {
            setData({
                isValidEmail: true
            });
        }
    }

    const LogInPress = () => {
        Keyboard.dismiss();
        setIsLoginLoading(true);

        if (data.isValidEmail) {
            Authentication.signIn(
                { email, password },
                async (name) => {
                    const doc = await Database.db.collection(email).doc("Information").get();
                    console.log(doc.data());
                    const user = Authentication.auth.currentUser;
                    const docData = {
                        UserID: user.uid
                    }
                    Database.add(email, "Information", docData, true);
                    User.email = user.email;
                    User.name = user.displayName;
                    if (doc.data().FirstTimeLogin == true) {
                        navigation.navigate('First Time Login');
                        console.log("Go to First Time Login Screen");
                    } else {
                        navigation.navigate('Bottom Tab', {
                            screen: 'Profile',
                            params: { document: doc.data() },
                        });
                        console.log("Go to Profile Screen");
                    }
                },
                (error) => {
                    setIsLoginLoading(false);
                    if (error == "Verification Error") {
                        Alert.alert("Login Error", "Please verify your email.");
                    } else if (error == "auth/user-disabled") {
                        Alert.alert("Login Error", "Account has been disabled.");
                    } else if (error == "auth/too-many-requests") {
                        Alert.alert("Login Error", "Please try again later.");
                    } else {
                        setIsLoginLoading(false);
                        Alert.alert("Login Error", "Incorrect email or password");
                        console.log(error);
                    }
                }
            )
        } else {
            setIsLoginLoading(false);
            Alert.alert("Login Error", "Please key in a valid email address.");
        }
    }

    return (
        <SafeAreaView>

            {/* Back Button */}
            <BackBtn onPress={() => navigation.navigate('Home')} />

            {/* Main Body */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>
                    <View style={styles.container}>

                        {/* Logo */}
                        <Image source={require('../../assets/images/UnILogo.png')}
                            style={styles.Logo} />

                        {/* Description */}
                        <View style={styles.bottomContainer}>
                            <Text style={styles.logInText}>Log In</Text>
                            <Text style={styles.descriptionText}>Please log in to continue!</Text>
                        </View>

                        <View style={styles.inputContainer}>

                            {/* Email Input */}
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={email => setEmail(email.toLocaleLowerCase())}
                                onEndEditing={(err) => handleValidEmail(err.nativeEvent.text)} />
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
                                onChangeText={password => setPassword(password)} />
                            <Text
                                style={styles.forgetPassword}
                                onPress={() => {
                                    navigation.navigate('Registration', { screen: 'Forget Password' });
                                    console.log("Go to Forget Password Screen");
                                }}>Forget Password?</Text>

                            {/* Login Button */}
                            <Button style={styles.logInButton}
                                labelStyle={styles.logInButtonText}
                                mode="contained"
                                color="#FD9E0F"
                                uppercase={false}
                                onPress={LogInPress}
                                loading={isLoginLoading}
                                disabled={isLoginLoading}>
                                Log In
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
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Logo: {
        marginTop: -70,
        width: 200,
        height: 157
    },
    logInText: {
        marginTop: 50,
        fontFamily: 'GothamRoundedMedium',
        fontWeight: 'bold',
        fontSize: 40
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'SFPro',
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
        fontFamily: 'SFPro',
        fontSize: 12,
        color: 'red',
    },
    forgetPassword: {
        fontFamily: 'GothamRoundedMedium',
        fontSize: 14,
        position: 'relative',
        marginLeft: 200,
        marginTop: 10,
        color: '#FD9E0F',
        fontWeight: 'bold'
    },
    logInButton: {
        borderRadius: 20,
        marginTop: 40,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logInButtonText: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }

})

export default LoginScreen;