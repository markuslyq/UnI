import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Platform, TouchableHighlight } from 'react-native';

import { Button, TextInput, Chip } from 'react-native-paper';
import BackBtn from '../components/BackBtn';
import MultiSelect from 'react-native-multiple-select';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const CCAPromptScreen = ({ navigation }) => {

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

    const [ccas, setCCAs] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const user = Authentication.auth.currentUser;
    let email = user.email;

    const docData = {
        CCAs: ccas
    }

    const continuePress = () => {
        Database.add(email, "Information", docData, true);
        navigation.navigate('Interests');
        console.log("Go to Interests Screen");
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
                        <Text style={styles.headerText}>My CCA(s) is/are</Text>
                    </View>

                </View>

                <MultiSelect
                    hideTags
                    items={ccaList}
                    uniqueKey="name"
                    onSelectedItemsChange={(selected) => {
                        setSelectedItems(selected);
                        setCCAs(selected);
                        console.log(selected);
                    }}
                    selectedItems={selectedItems}
                    selectText="Select your CCA(s)"
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
export default CCAPromptScreen;