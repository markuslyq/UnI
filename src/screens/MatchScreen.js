import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, Animated } from 'react-native';
import { Modal, Portal, Provider, Appbar, Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";
import BackBtn from "../components/BackBtn";
import MultiSelect from "react-native-multiple-select";

const MatchScreen = ({ navigation, route }) => {

    let userID = "";
    let userEmail = "";

    const user = Authentication.auth.currentUser;
    if (user) {
        userID = user.uid;
        userEmail = user.email;
    }

    const genderList = [{
        id: 0,
        name: 'Male'
    }, {
        id: 1,
        name: 'Female'
    }];

    const majorList = [{
        id: 0,
        name: 'Architecture'
    }, {
        id: 1,
        name: 'Arts & Social Sciences'
    }, {
        id: 2,
        name: 'Arts & Social Sciences (MT related)'
    }, {
        id: 3,
        name: 'Arts & Social Sciences (Philosophy, Politics & Economics)'
    }, {
        id: 4,
        name: 'Biomedical Engineering'
    }, {
        id: 5,
        name: 'Business Administration'
    }, {
        id: 6,
        name: 'Business Administration (Accountancy)'
    }, {
        id: 7,
        name: 'Business Analytics'
    }, {
        id: 8,
        name: 'Chemical Engineering'
    }, {
        id: 9,
        name: 'Civil Engineering'
    }, {
        id: 10,
        name: 'Computer Engineering'
    }, {
        id: 11,
        name: 'Computer Science Courses'
    }, {
        id: 12,
        name: 'Data Science and Analytics'
    }, {
        id: 13,
        name: 'Dentistry'
    }, {
        id: 14,
        name: 'Electrical Engineering'
    }, {
        id: 15,
        name: 'Engineering'
    }, {
        id: 16,
        name: 'Engineering Science'
    }, {
        id: 17,
        name: 'Environmental Engineering'
    }, {
        id: 18,
        name: 'Environmental Studies'
    }, {
        id: 19,
        name: 'Industrial & Systems Engineering'
    }, {
        id: 20,
        name: 'Industrial Design'
    }, {
        id: 21,
        name: 'Information Security'
    }, {
        id: 22,
        name: 'Information Systems'
    }, {
        id: 23,
        name: 'Landscape Architecture'
    }, {
        id: 24,
        name: 'Law'
    }, {
        id: 25,
        name: 'Materials Science & Engineering'
    }, {
        id: 26,
        name: 'Mechanical Engineering'
    }, {
        id: 27,
        name: 'Mechanical Engineering (Aeronautical)'
    }, {
        id: 28,
        name: 'Medicine'
    }, {
        id: 29,
        name: 'Nursing'
    }, {
        id: 30,
        name: 'Pharmaceutical Science'
    }, {
        id: 31,
        name: 'Pharmacy'
    }, {
        id: 32,
        name: 'Project & Facilities Management'
    }, {
        id: 33,
        name: 'Real Estate'
    }, {
        id: 34,
        name: 'Science'
    }, {
        id: 35,
        name: 'Science (Food Science & Technology)'
    }
    ];

    const ccaList = [{
        id: 0,
        name: 'AIESEC in NUS'
    }, {
        id: 1,
        name: 'American Society of Mechanical Engineering Student Section'
    }, {
        id: 2,
        name: 'Arttero'
    }, {
        id: 3,
        name: 'Bachelor of Environmental Studies Student Committee'
    }, {
        id: 4,
        name: 'Bridging GAP'
    }, {
        id: 5,
        name: 'Building and Estate Management Society'
    }, {
        id: 6,
        name: 'Business Analytics Consulting Team'
    }, {
        id: 7,
        name: 'Case Consulting Group'
    }, {
        id: 8,
        name: 'Chemical Engineering Students\'s Society'
    }, {
        id: 9,
        name: 'Chemical Sciences Society'
    }, {
        id: 10,
        name: 'Computing for Voluntary Welfare Organisations'
    }, {
        id: 11,
        name: 'Electrical and Computer Engineering Club'
    }, {
        id: 12,
        name: 'Facilitators@NUS'
    }, {
        id: 13,
        name: 'Institution of Engineers Singapore NUS Student Chapter'
    }, {
        id: 14,
        name: 'Korean Cultural Interest Group'
    }, {
        id: 15,
        name: 'Malay Language Society'
    }, {
        id: 16,
        name: 'National University of Singapore Students\' Union'
    }, {
        id: 17,
        name: 'NUANSA Cultural Productions'
    }, {
        id: 18,
        name: 'NUS Aquathlon'
    }, {
        id: 19,
        name: 'NUS Archery'
    }, {
        id: 20,
        name: 'NUS Art of Living'
    }, {
        id: 21,
        name: 'NUS Badminton'
    }, {
        id: 22,
        name: 'NUS Basketball'
    }, {
        id: 23,
        name: 'NUS Board Games'
    }, {
        id: 24,
        name: 'NUS Bowling'
    }, {
        id: 25,
        name: 'NUS Buddhist Society'
    }, {
        id: 26,
        name: 'NUS Canoe Polo'
    }, {
        id: 27,
        name: 'NUS Canoeing'
    }, {
        id: 28,
        name: 'NUS Cheerleading'
    }, {
        id: 29,
        name: 'NUS Chinese Debate Team'
    }, {
        id: 30,
        name: 'NUS Climbing'
    }, {
        id: 31,
        name: 'NUS Comics and Animation Society'
    }, {
        id: 32,
        name: 'NUS Communication & New Media Society'
    }, {
        id: 33,
        name: 'NUS Cricket'
    }, {
        id: 34,
        name: 'NUS Cross-Country'
    }, {
        id: 35,
        name: 'NUS Dental Society'
    }, {
        id: 36,
        name: 'NUS Dive'
    }, {
        id: 37,
        name: 'NUS Dragon Boat'
    }, {
        id: 38,
        name: 'NUS Economics Society'
    }, {
        id: 39,
        name: 'NUS ENABLERS'
    }, {
        id: 40,
        name: 'NUS Entrepreneurship Society'
    }, {
        id: 41,
        name: 'NUS Esports @ NUS E-Gaming'
    }, {
        id: 42,
        name: 'NUS Fencing'
    }, {
        id: 43,
        name: 'NUS Floorball'
    }, {
        id: 44,
        name: 'NUS Food Science & Technology Society'
    }, {
        id: 45,
        name: 'NUS Football'
    }, {
        id: 46,
        name: 'NUS Games Development Group'
    }, {
        id: 47,
        name: 'NUS Geographical Society'
    }, {
        id: 48,
        name: 'NUS Global Studies Club'
    }, {
        id: 49,
        name: 'NUS Golf'
    }, {
        id: 50,
        name: 'NUS Graduate Students\' Society'
    }, {
        id: 51,
        name: 'NUS Hackers'
    }, {
        id: 52,
        name: 'NUS Handball'
    }, {
        id: 53,
        name: 'NUS History Society'
    }, {
        id: 54,
        name: 'NUS iCARE'
    }, {
        id: 55,
        name: 'NUS IEEE - Eta Kappa Nu (IEEE-HKN)'
    }, {
        id: 56,
        name: 'NUS Indian Cultural Society'
    }, {
        id: 57,
        name: 'NUS Interfaith'
    }, {
        id: 58,
        name: 'NUS Japanese Studies Society'
    }, {
        id: 59,
        name: 'NUS Judo'
    }, {
        id: 60,
        name: 'NUS Kayaking'
    }, {
        id: 61,
        name: 'NUS Legion of Mary'
    }, {
        id: 62,
        name: 'NUS Life Sciences Society'
    }, {
        id: 63,
        name: 'NUS Lifesaving'
    }, {
        id: 64,
        name: 'NUS Literary Society'
    }, {
        id: 65,
        name: 'NUS Makeup and Design'
    }, {
        id: 66,
        name: 'NUS Malay Studies Society'
    }, {
        id: 67,
        name: 'NUS Mathematics Society'
    }, {
        id: 68,
        name: 'NUS Medical Society'
    }, {
        id: 69,
        name: 'NUS Motoring Club'
    }, {
        id: 70,
        name: 'NUS Mountaineering (Make It Real)'
    }, {
        id: 71,
        name: 'NUS Muay Thai'
    }, {
        id: 72,
        name: 'NUS Muslim Society'
    }, {
        id: 73,
        name: 'NUS Navigators'
    }, {
        id: 74,
        name: 'NUS Netball'
    }, {
        id: 75,
        name: 'NUS Outdoor Activities Club'
    }, {
        id: 76,
        name: 'NUS People Ending Animal Cruelty and Exploitation'
    }, {
        id: 77,
        name: 'NUS Pharmaceutical Society'
    }, {
        id: 78,
        name: 'NUS Physics Society'
    }, {
        id: 79,
        name: 'NUS Political Science Society'
    }, {
        id: 80,
        name: 'NUS Powerlifting'
    }, {
        id: 81,
        name: 'NUS Psychology Society'
    }, {
        id: 82,
        name: 'NUS Public Health Society'
    }, {
        id: 83,
        name: 'NUS Rugby'
    }, {
        id: 84,
        name: 'NUS Sailing'
    }, {
        id: 85,
        name: 'NUS Science Computer-Based Learning Centre'
    }, {
        id: 86,
        name: 'NUS Shooting'
    }, {
        id: 87,
        name: 'NUS Sikh Cultural and Literary Society'
    }, {
        id: 88,
        name: 'NUS Silat'
    }, {
        id: 89,
        name: 'NUS Social Impact Catalyst'
    }, {
        id: 90,
        name: 'NUS Squash'
    }, {
        id: 91,
        name: 'NUS Statistics Society'
    }, {
        id: 92,
        name: 'NUS Students\' Business Club'
    }, {
        id: 93,
        name: 'NUS Students\' Community Service Club'
    }, {
        id: 94,
        name: 'NUS Students\' Cultural Activities Club'
    }, {
        id: 95,
        name: 'NUS Students\' Design and Environment Club'
    }, {
        id: 96,
        name: 'NUS Students\' Law Club'
    }, {
        id: 97,
        name: 'NUS Students\' Medical Club'
    }, {
        id: 98,
        name: 'NUS Students\' Political Association'
    }, {
        id: 99,
        name: 'NUS Students\' Science Club'
    }, {
        id: 100,
        name: 'NUS Students\' Sports Club'
    }, {
        id: 101,
        name: 'NUS Students\' University Scholars Club'
    }, {
        id: 102,
        name: 'NUS Swimming'
    }, {
        id: 103,
        name: 'NUS Table Tennis'
    }, {
        id: 104,
        name: 'NUS Taekwondo'
    }, {
        id: 105,
        name: 'NUS Tamil Language Society'
    }, {
        id: 106,
        name: 'NUS Tchoukball'
    }, {
        id: 107,
        name: 'NUS Tennis'
    }, {
        id: 108,
        name: 'NUS Touch Football'
    }, {
        id: 109,
        name: 'NUS Track & Field'
    }, {
        id: 110,
        name: 'NUS Ultimate Frisbee'
    }, {
        id: 111,
        name: 'NUS Volleyball'
    }, {
        id: 112,
        name: 'NUS Volunteer Action Committee'
    }, {
        id: 113,
        name: 'NUS Water Polo'
    }, {
        id: 114,
        name: 'NUS Weiqi'
    }, {
        id: 115,
        name: 'NUS Wushu'
    }, {
        id: 116,
        name: 'NUSSU Executive Committee'
    }, {
        id: 117,
        name: 'Red Cross Youth - NUS Chapter'
    }, {
        id: 118,
        name: 'Rovers Adventure Club'
    }, {
        id: 119,
        name: 'Society of Mechanical Engineering'
    }, {
        id: 120,
        name: 'Society of Social Work Students'
    }, {
        id: 121,
        name: 'Student Life @ LKYSPP'
    }, {
        id: 122,
        name: 'Student Wellness'
    }, {
        id: 123,
        name: 'Students Against Violation of the Earth'
    }];

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

    const initialGender = [
        'Male',
        'Female'
    ];

    const initialMajor = [
        'Architecture',
        'Arts & Social Sciences',
        'Business Administration',
        'Chemical Engineering',
        'Computer Science Courses',
        'Law',
        'Mechanical Engineering',
        'Medicine',
        'Real Estate',
        'Science',

    ];
    const initialCCA = [

        'Electrical and Computer Engineering Club',
        'Malay Language Society',
        'National University of Singapore Students\' Union',
        'NUS Hackers',
        'NUS Students\' Business Club',
        'NUS Students\' Cultural Activities Club',
        'NUS Students\' University Scholars Club',
        'NUS Tamil Language Society',
        'NUS Students\' Sports Club',
        'NUSSU Executive Committee',
    ];

    const intialInterest = [

        'Dancing',
        'Mahjong',
        'Movies',
        'Music',
        'Netlix',
        'Singing',
        'Socialising',
        'Sports',
        'Travelling',
        'Volunteer Work',

    ];

    const [ccas, setCCAs] = useState(initialCCA);
    const [interests, setInterests] = useState(intialInterest);
    const [courses, setMajor] = useState(initialMajor);
    const [genders, setGender] = useState(initialGender);
    const [selectedItems_interest, setSelectedItems_interest] = useState([]);
    const [selectedItems_cca, setSelectedItems_cca] = useState([]);
    const [selectedItems_major, setSelectedItems_major] = useState([]);
    const [selectedItems_gender, setSelectedItems_gender] = useState([]);

    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = [];
    let q5 = [];

    const [query5, setQuery5] = useState([]);

    useEffect(() => {

        const allUsersArray = [];

        usersCollection.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id != userEmail) {
                        allUsersArray.push(doc.id);
                    }
                })
                setQuery5([allUsersArray]);
            })
    }, []);

    function GFG_Fun() {
        if (query5.length != 0) {
            let arr4 = query5.slice();
            let mainQuery = arr4.shift().filter(function (v) {
                return arr4.every(function (a) {
                    return a.indexOf(v) !== -1;
                });
            });
            if (mainQuery.length != 0) {
                console.log('mainQuery: ', mainQuery);
                navigation.navigate('Matched Profiles', { Profiles: mainQuery });
            } else {
                Alert.alert("No Matches", "Sorry, there are no matches according to your current filter.\nPlease change your filter settings.");
            }
        } else {
            Alert.alert("No Matches", "Sorry, there are no matches according to your current filter.\nPlease change your filter settings.");
        }
    }

    const usersCollection = Database.db.collection('Users');

    const [isValidGender, setIsValidGender] = useState(true);
    const [isValidMajor, setIsValidMajor] = useState(true);
    const [isValidCCA, setIsValidCCA] = useState(true);
    const [isValidInterest, setIsValidInterest] = useState(true);

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#FFFFFF',
        padding: 0,
        borderRadius: 20,
    };

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                marginTop: 10,
                                fontFamily: 'GothamRoundedMedium',
                                fontSize: 24,
                                color: '#000000'
                            }}>
                                Filter
                            </Text>
                            <Text style={{
                                fontFamily: 'SFPro',
                                fontSize: 14,
                                color: 'gray',
                                textAlign: 'center'
                            }}>
                                Select a min. of 1 and {'\n'}a max. of 10 for each category
                            </Text>
                        </View>

                        <KeyboardAvoidingView style={styles.label}>
                            <Text style={styles.labelHeader}>Gender</Text>
                            <MultiSelect
                                hideTags
                                items={genderList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selected) => {
                                    if (selected.length <= 10) {
                                        setSelectedItems_gender(selected);
                                        setGender(selected);
                                    }
                                }}
                                onClearSelector={() => {
                                    if (selectedItems_gender.length > 0 && selectedItems_gender.length < 3) {
                                        setIsValidGender(true);
                                    } else {
                                        setIsValidGender(false);
                                    }
                                }}
                                selectedItems={selectedItems_gender}
                                selectText=""
                                searchInputPlaceholderText="Search Items..."
                                selectedItemTextColor="#007AFF"
                                selectedItemIconColor="#007AFF"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#8e8e93' }}
                                submitButtonColor="#FD9E0F"
                                submitButtonText="Submit"
                                styleInputGroup={{ paddingVertical: 5 }}
                                styleItemsContainer={{ backgroundColor: "#f2f2f7" }}
                                styleMainWrapper={{ marginHorizontal: 40 }}
                            />
                            {isValidGender ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginLeft: 15 }]}>Please select at least 1 Gender</Text>
                                </Animated.View>
                            }
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView style={styles.label}>
                            <Text style={styles.labelHeader}>Course</Text>
                            <MultiSelect
                                hideTags
                                items={majorList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selected) => {
                                    if (selected.length <= 10) {
                                        setSelectedItems_major(selected);
                                        setMajor(selected);
                                    }
                                }}
                                onClearSelector={() => {
                                    if (selectedItems_major.length > 0 && selectedItems_major.length < 11) {
                                        setIsValidMajor(true);
                                    } else {
                                        setIsValidMajor(false);
                                    }
                                }}
                                selectedItems={selectedItems_major}
                                selectText=""
                                searchInputPlaceholderText="Search Items..."
                                selectedItemTextColor="#007AFF"
                                selectedItemIconColor="#007AFF"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#8e8e93' }}
                                submitButtonColor="#FD9E0F"
                                submitButtonText="Submit"
                                styleInputGroup={{ paddingVertical: 5 }}
                                styleItemsContainer={{ backgroundColor: "#f2f2f7" }}
                                styleMainWrapper={{ marginHorizontal: 40 }}
                            />
                            {isValidMajor ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginLeft: 15 }]}>Please select 1 to 10 Major(s)</Text>
                                </Animated.View>
                            }
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView style={styles.label}>
                            <Text style={styles.labelHeader}>CCA(s)</Text>
                            <MultiSelect
                                hideTags
                                items={ccaList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selected) => {
                                    if (selected.length <= 10) {
                                        setSelectedItems_cca(selected);
                                        setCCAs(selected);
                                    }
                                }}
                                onClearSelector={() => {
                                    if (selectedItems_cca.length > 0 && selectedItems_cca.length < 11) {
                                        setIsValidCCA(true);
                                    } else {
                                        setIsValidCCA(false);
                                    }
                                }}
                                selectedItems={selectedItems_cca}
                                selectText=""
                                searchInputPlaceholderText="Search Items..."
                                selectedItemTextColor="#007AFF"
                                selectedItemIconColor="#007AFF"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#8e8e93' }}
                                submitButtonColor="#FD9E0F"
                                submitButtonText="Submit"
                                styleInputGroup={{ paddingVertical: 5 }}
                                styleItemsContainer={{ backgroundColor: "#f2f2f7" }}
                                styleMainWrapper={{ marginHorizontal: 40 }}
                            />
                            {isValidCCA ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginLeft: 15 }]}>Please select 1 to 10 CCA(s)</Text>
                                </Animated.View>
                            }
                        </KeyboardAvoidingView>

                        <KeyboardAvoidingView style={styles.label}>
                            <Text style={styles.labelHeader}>Interest(s)</Text>
                            <MultiSelect
                                hideTags
                                items={interestList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selected) => {
                                    if (selected.length <= 10) {
                                        setSelectedItems_interest(selected);
                                        setInterests(selected);
                                    }
                                }}
                                onClearSelector={() => {
                                    if (selectedItems_interest.length > 0 && selectedItems_interest.length < 11) {
                                        setIsValidInterest(true);
                                    } else {
                                        setIsValidInterest(false);
                                    }
                                }}
                                selectedItems={selectedItems_interest}
                                selectText=""
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
                            {isValidInterest ? null :
                                <Animated.View animation="fadeInLeft" duration={500}>
                                    <Text style={[styles.errorMsg, { marginLeft: 15 }]}>Please select 1 to 10 Interest(s)</Text>
                                </Animated.View>
                            }
                        </KeyboardAvoidingView>
                    </ScrollView>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button style={styles.chatButton}
                            labelStyle={styles.chatButtonText}
                            mode="contained"
                            color="#FD9E0F"
                            uppercase={false}
                            onPress={() => { hideModal() }}>
                            Cancel
                        </Button>
                        <Button style={styles.chatButton}
                            labelStyle={styles.chatButtonText}
                            mode="contained"
                            color="#FD9E0F"
                            uppercase={false}
                            disabled={isValidGender ?
                                isValidMajor ?
                                    isValidCCA ?
                                        isValidInterest ?
                                            selectedItems_gender.length != 0 ?
                                                selectedItems_major.length != 0 ?
                                                    selectedItems_cca.length != 0 ?
                                                        selectedItems_interest.length != 0 ?
                                                            false : true : true : true : true : true : true : true : true}
                            onPress={async () => {
                                console.log("genders: ", genders);
                                console.log("ccas: ", ccas);
                                usersCollection.where('Gender', 'in', genders)
                                    .get().then((querySnapshot) => {
                                        // console.log("QuerySnap: ", querySnapshot)
                                        querySnapshot.forEach((doc) => {
                                            // doc.data() is never undefined for query doc snapshots
                                            if (doc.id != userEmail) {
                                                q1.push(doc.id);
                                            }
                                        })

                                        console.log('q1: ', q1);
                                        q5.push(q1)
                                        q1 = [];
                                    });
                                usersCollection.where('Major', 'in', courses)
                                    .get().then((querySnapshot) => {
                                        // console.log("QuerySnap: ", querySnapshot)
                                        querySnapshot.forEach((doc) => {
                                            // doc.data() is never undefined for query doc snapshots
                                            if (doc.id != userEmail) {
                                                q2.push(doc.id);
                                            }
                                        })

                                        console.log('q2: ', q2);
                                        q5.push(q2)
                                        q2 = [];
                                    });

                                usersCollection.where('CCAs', 'array-contains-any', ccas)
                                    .get().then((querySnapshot) => {
                                        // console.log("QuerySnap: ", querySnapshot)
                                        querySnapshot.forEach((doc) => {
                                            // doc.data() is never undefined for query doc snapshots
                                            if (doc.id != userEmail) {
                                                q3.push(doc.id);
                                            }
                                        })

                                        console.log('q3: ', q3);
                                        q5.push(q3)
                                        q3 = [];
                                    });
                                usersCollection.where('Interest', 'array-contains-any', interests)
                                    .get().then((querySnapshot) => {
                                        // console.log("QuerySnap: ", querySnapshot)
                                        querySnapshot.forEach((doc) => {
                                            // doc.data() is never undefined for query doc snapshots
                                            if (doc.id != userEmail) {
                                                q4.push(doc.id);
                                            }
                                        })

                                        console.log('q4: ', q4);
                                        q5.push(q4)
                                        q4 = [];
                                    });
                                setQuery5(q5);
                                hideModal();
                            }}>
                            Done
                        </Button>
                    </View>
                </Modal>
            </Portal>

            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
            }}>

                <Appbar.Header style={styles.appBarHeader}>
                    <Appbar.Content title="" titleStyle={styles.headerText} />
                    <Appbar.Action
                        icon="filter-variant"
                        color="#000000"
                        style={{ marginRight: 0 }}
                        onPress={showModal}
                    />
                </Appbar.Header>

                <View>
                    <TouchableOpacity onPress={async () => {
                        console.log('Query5: ', query5);
                        GFG_Fun();
                        //insert navigation here
                    }} style={styles.roundButton}>
                        <Image source={require('../../assets/images/outline.png')}
                            style={styles.outlinestyle} />

                    </TouchableOpacity>
                </View>

            </SafeAreaView >
        </Provider>
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
    chatButton: {
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 10,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatButtonText: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    },
    label: {
        marginTop: 20,
        marginHorizontal: 30,
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#cccccc'
    },
    labelHeader: {
        marginLeft: 15,
        marginTop: 3,
        fontFamily: 'SFPro',
        color: '#adadad',
        fontSize: 18
    },
    appBarHeader: {
        backgroundColor: 'transparent',
        height: 80,
        width: 350,
        padding: 20
    },
    headerText: {
        color: '#000000',
        fontFamily: 'SFProMedium',
        fontSize: 18,
    },
    roundButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 300,
        backgroundColor: '#FD9E0F',
        marginTop: 160,
    },
    outlinestyle: {
        flex: 1,
        aspectRatio: 0.75,
        resizeMode: 'contain'
    },
    errorMsg: {
        marginRight: 125,
        fontFamily: 'SFPro',
        fontSize: 12,
        color: 'red',
    },
})
export default MatchScreen;
