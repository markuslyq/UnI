import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput, Chip } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import MultiSelect from 'react-native-multiple-select';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const InterestPromptScreen = ({ navigation, route }) => {

    const interestList = [{
        id: 0,
        name: 'Badminton'
    }, {
        id: 1,
        name: 'Baseball'
    }, {
        id: 2,
        name: 'Basketball'
    }, {
        id: 3,
        name: 'Callisthenics'
    }, {
        id: 4,
        name: 'Coding'
    }, {
        id: 5,
        name: 'Cooking'
    }, {
        id: 6,
        name: 'Cue Sports'
    }, {
        id: 7,
        name: 'Cycling'
    }, {
        id: 8,
        name: 'Dancing'
    }, {
        id: 9,
        name: 'Drawing'
    }, {
        id: 10,
        name: 'Fishing'
    }, {
        id: 11,
        name: 'Floorball'
    }, {
        id: 12,
        name: 'Food'
    }, {
        id: 13,
        name: 'Football'
    }, {
        id: 14,
        name: 'Frisbee'
    }, {
        id: 15,
        name: 'Gardening'
    }, {
        id: 16,
        name: 'Golf'
    }, {
        id: 17,
        name: 'Gymming'
    }, {
        id: 18,
        name: 'Ice Skating'
    }, {
        id: 19,
        name: 'Inline Skating'
    }, {
        id: 20,
        name: 'Mahjong'
    }, {
        id: 21,
        name: 'Makeup'
    }, {
        id: 22,
        name: 'Martial Arts'
    }, {
        id: 23,
        name: 'Movies'
    }, {
        id: 24,
        name: 'Music'
    }, {
        id: 25,
        name: 'Netlix'
    }, {
        id: 26,
        name: 'Painting'
    }, {
        id: 27,
        name: 'Parkour'
    }, {
        id: 28,
        name: 'Pets'
    }, {
        id: 29,
        name: 'Photography'
    }, {
        id: 30,
        name: 'Poker'
    }, {
        id: 31,
        name: 'Reading'
    }, {
        id: 32,
        name: 'Road Trips'
    }, {
        id: 33,
        name: 'Rock Climbing'
    }, {
        id: 34,
        name: 'Rugby'
    }, {
        id: 35,
        name: 'Running'
    }, {
        id: 36,
        name: 'Scuba Diving'
    }, {
        id: 37,
        name: 'Shopping'
    }, {
        id: 38,
        name: 'Singing'
    }, {
        id: 39,
        name: 'Skateboarding'
    }, {
        id: 40,
        name: 'Socialising'
    }, {
        id: 41,
        name: 'Sports'
    }, {
        id: 42,
        name: 'Studying'
    }, {
        id: 43,
        name: 'Surfing'
    }, {
        id: 44,
        name: 'Swimming'
    }, {
        id: 45,
        name: 'Tennis'
    }, {
        id: 46,
        name: 'Travelling'
    }, {
        id: 47,
        name: 'Video Games'
    }, {
        id: 48,
        name: 'Volleyball'
    }, {
        id: 49,
        name: 'Volunteer Work'
    }, {
        id: 50,
        name: 'Water Sports'
    }, {
        id: 51,
        name: 'Yoga'
    }];

    const [interests, setInterests] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        Interest: interests,
        FirstTimeLogin: false
    }

    const continuePress = async () => {
        const doc = await Database.db.collection(email).doc("Information").get();
        console.log(doc.data());
        navigation.navigate('Bottom Tab', {
            screen: 'Profile',
            params: { document: doc.data() },
        });
        console.log("Go to Profile Screen");
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
                        <Text style={styles.headerText}>My interest(s) is/are</Text>
                    </View>

                </View>


                <MultiSelect
                    hideTags
                    items={interestList}
                    uniqueKey="name"
                    onSelectedItemsChange={(selected) => {
                        setSelectedItems(selected);
                        setInterests(selected);
                        console.log(selected);
                        Database.add(email, "Information", docData, true);
                    }}
                    selectedItems={selectedItems}
                    selectText="Select your interest(s)"
                    searchInputPlaceholderText="Search Items..."
                    selectedItemTextColor="#007AFF"
                    selectedItemIconColor="#007AFF"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#FD9E0F"
                    submitButtonText="Submit"
                    styleInputGroup={{ paddingVertical: 5 }}
                    styleItemsContainer={{ backgroundColor: "#f2f2f7" }}
                    styleMainWrapper={{ marginHorizontal: 40 }}
                />
            </ScrollView>
            <View style={styles.inputContainer}>


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
export default InterestPromptScreen;