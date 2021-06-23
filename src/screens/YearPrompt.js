import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import CustomPicker from '../components/CustomPicker';


import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const YearPromptScreen = ({ navigation }) => {

    const YearList = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7']

    const [year, setYear] = useState();

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        Year: year
    }

    const continuePress = () => {
        Database.add(email, "Information", docData, true);
        navigation.navigate('CCAs');
        console.log("Go to CCAs Screen");
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
                        <Text style={styles.headerText}>I am in </Text>
                    </View>

                </View>


                <View style={styles.inputContainer}>

                    <CustomPicker
                        textStyle={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 80,
                            paddingVertical: 12,
                            borderColor: '#949494',
                            borderWidth: 1
                        }}
                        defaultItem={YearList[0]}
                        items={YearList}
                        onItemChange={(Year) => {
                            console.log('Year:  ' + Year);
                            if (Year == 'Year 1') setYear(1);
                            else if (Year == 'Year 2') setYear(2);
                            else if (Year == 'Year 3') setYear(3);
                            else if (Year == 'Year 4') setYear(4);
                            else if (Year == 'Year 5') setYear(5);
                            else if (Year == 'Year 6') setYear(6);
                            else if (Year == 'Year 7') setYear(7);
                            else setYear(0);
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
export default YearPromptScreen;