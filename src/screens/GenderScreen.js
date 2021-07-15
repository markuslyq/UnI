import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import BackBtn from '../components/BackBtn';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const GenderScreen = ({ navigation }) => {

    const [isMaleChecked, setIsMaleChecked] = useState(false);
    const [isFemaleChecked, setIsFemaleChecked] = useState(false);
    const [isGenderChecked, setIsGenderChecked] = useState(false);
    const [gender, setGender] = useState("Male");

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        Gender: gender
    }

    const handleMalePress = () => {
        setGender("Male");
        setIsMaleChecked(true);
        setIsFemaleChecked(false);
        setIsGenderChecked(true);
    }

    const handleFemalePress = () => {
        setGender("Female");
        setIsFemaleChecked(true);
        setIsMaleChecked(false);
        setIsGenderChecked(true);
    }

    const continuePress = () => {
            Database.add(email, "Information", docData, true);
            Database.add("Users", email, docData, true);
            navigation.navigate('Birthday');
            console.log("Go to Birthday Screen");
    }

    return (
        <SafeAreaView>

            {/* Back Button  */}
            <BackBtn onPress={() => navigation.goBack()} />

            <ScrollView>
                <View style={styles.container}>
                    {/* Logo */}
                    <Image source={require('../../assets/images/UnILogo(full).png')}
                        style={styles.uniLogo} />

                    <View style={styles.bottomContainer}>
                        {/* Description */}
                        <Text style={styles.headerText}>I am a</Text>
                    </View>

                </View>

                <View style={styles.inputContainer}>

                    {/* Male Option */}
                    <TouchableHighlight
                        style={{
                            borderWidth: 1,
                            borderRadius: 30,
                            marginBottom: 10,
                            backgroundColor: isMaleChecked ? '#FD9E0F' : '#FFFFFF',
                            borderColor: isMaleChecked ? '#FFFFFF' : '#5C5C5C',
                        }}
                        onPress={handleMalePress}
                    >
                        <Text style={{
                            paddingHorizontal: 97,
                            paddingVertical: 10,
                            fontSize: 18,
                            fontFamily: 'Avenir',
                            color: isMaleChecked ? '#FFFFFF' : '#5C5C5C'
                        }}>
                            MAN
                        </Text>
                    </TouchableHighlight>

                    {/* Female Option */}
                    <TouchableHighlight
                        style={{
                            borderWidth: 1,
                            borderRadius: 30,
                            backgroundColor: isFemaleChecked ? '#FD9E0F' : '#FFFFFF',
                            borderColor: isFemaleChecked ? '#FFFFFF' : '#5C5C5C',
                        }}
                        onPress={handleFemalePress}
                    >
                        <Text style={{
                            paddingHorizontal: 80,
                            paddingVertical: 10,
                            fontSize: 18,
                            fontFamily: 'Avenir',
                            color: isFemaleChecked ? '#FFFFFF' : '#5C5C5C'
                        }}>
                            WOMAN
                        </Text>
                    </TouchableHighlight>

                    {/* Continue Button */}
                    <Button style={styles.continueButton}
                        labelStyle={styles.continueButtonText}
                        mode="contained"
                        color="#FD9E0F"
                        uppercase={false}
                        disabled={!isGenderChecked}
                        onPress={continuePress}>
                        Continue
                    </Button>
                </View>

            </ScrollView>
        </SafeAreaView >
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
    uniLogo: {
        marginTop: -70,
        marginRight: 13,
        width: 300
    },
    headerText: {
        marginTop: 0,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    date: {
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: '#949494',
        borderWidth: 1
    },
    input: {
        width: 320,
        height: 50,
        paddingTop: 0,
    },
    continueButton: {
        borderRadius: 20,
        marginTop: 40,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueButtonText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default GenderScreen;