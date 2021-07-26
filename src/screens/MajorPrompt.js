import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import CustomPicker from '../components/CustomPicker';


import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const MajorScreen = ({ navigation }) => {

    const MajorList = [
        'Architecture',
        'Arts & Social Sciences',
        'Arts & Social Sciences (MT related)',
        'Arts & Social Sciences (Philosophy, Politics & Economics)',
        'Biomedical Engineering',
        'Business Administration',
        'Business Administration (Accountancy)',
        'Business Analytics',
        'Chemical Engineering',
        'Civil Engineering',
        'Computer Engineering',
        'Computer Science Courses',
        'Data Science and Analytics',
        'Dentistry',
        'Electrical Engineering',
        'Engineering',
        'Engineering Science',
        'Environmental Engineering',
        'Environmental Studies',
        'Industrial & Systems Engineering',
        'Industrial Design',
        'Information Security',
        'Information Systems',
        'Landscape Architecture',
        'Law',
        'Materials Science & Engineering',
        'Mechanical Engineering',
        'Mechanical Engineering (Aeronautical)',
        'Medicine',
        'Nursing',
        'Pharmaceutical Science',
        'Pharmacy',
        'Project & Facilities Management',
        'Real Estate',
        'Science',
        'Science (Food Science & Technology)'
    ];

    const [major, setMajor] = useState('Architecture');

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        Major: major
    }

    const continuePress = () => {
        Database.add(email, "Information", docData, true);
        Database.add("Users", email, docData, true);
        navigation.navigate('Year');
        console.log("Go to Year Screen");
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
                        <Text style={styles.headerText}>My major is</Text>
                    </View>

                </View>


                <View style={styles.inputContainer}>

                    <CustomPicker
                        textStyle={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 90,
                            paddingVertical: 12,
                            borderColor: '#949494',
                            borderWidth: 1
                        }}
                        defaultItem={MajorList[0]}
                        items={MajorList}
                        onItemChange={(Major) => {
                            console.log('Major:  ' + Major);
                            setMajor(Major);
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
        marginHorizontal: 28
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
        fontFamily: 'SFPro',
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
export default MajorScreen;