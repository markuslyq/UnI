import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import CustomDatePicker from '../components/CustomDatePicker';

import moment from 'moment';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const BirthdayPromptScreen = ({ navigation }) => {

    console.log("@Birthday Prompt Screen")

    const [birthday, setBirthday] = useState(new Date(moment().subtract(18, 'years')));
    const [age, setAge] = useState(18);
    let ageVar = 18;

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        Age: age,
        Birthday: birthday
    }

    const continuePress = () => {
        Database.add(email, "Information", docData, true);
        Database.add("Users", email, docData, true);
        navigation.navigate('Major');
        console.log("Go to Major Screen");
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
                        <Text style={styles.headerText}>My birthday is on</Text>
                    </View>

                </View>



                <View style={styles.inputContainer}>

                    <CustomDatePicker
                        textStyle={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            borderColor: '#949494',
                            borderWidth: 1
                        }}
                        defaultDate={new Date(moment().subtract(18, 'years'))}
                        onDateChange={(birthday) => {
                            console.log('birthday ' + moment(birthday).format('Do MMMM YYYY'));
                            setBirthday(new Date(birthday));
                            let monthDiff = Date.now() - birthday;
                            let age_dt = new Date(monthDiff);
                            let year = age_dt.getUTCFullYear();
                            ageVar = Math.abs(year - 1970);
                            setAge(ageVar);
                            console.log('birthday: ' + birthday);
                            console.log('age: ' + ageVar);
                        }}
                    />

                    {/* Continue Button */}
                    <Button style={styles.continueButton}
                        labelStyle={styles.continueButtonText}
                        mode="contained"
                        color="#FD9E0F"
                        uppercase={false}
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
        fontFamily: 'GothamRoundedMedium',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'GothamRoundedMedium',
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
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default BirthdayPromptScreen;