import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView, Dimensions, RefreshControl, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { Button, Appbar, Avatar, Card, Chip, Badge, TextInput } from 'react-native-paper';
import Animated, { set } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomPicker from '../components/CustomPicker';
import CustomDatePicker from '../components/CustomDatePicker';
import MultiSelect from 'react-native-multiple-select';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../api/firestore';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";
import firebase from '../../api/firebase';
import 'firebase/storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const EditProfileScreen = ({ navigation, route }) => {

    console.log("At Edit Profile Screen")

    const user = Authentication.auth.currentUser;
    const email = user.email;

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const sheetRef = React.useRef(null);

    const { document } = route.params;

    const [name, setName] = React.useState(document.Name);

    const [data, setData] = React.useState({
        isValidName: true,
    });

    let letters = /^[A-Za-z]+$/;

    const handleValidName = (val) => {
        if ((val.toString().trim() === '') || !((val.toString().replace(/\s+/g, '').match(letters)))) {
            setData({
                ...data,
                isValidName: false
            });
        } else {
            setData({
                ...data,
                isValidName: true
            });
        }
    }

    const GenderList = ['Male', 'Female']

    const [gender, setGender] = useState(document.Gender);

    const [birthday, setBirthday] = useState(new Date(document.Birthday.toMillis()));
    const [age, setAge] = useState(document.Age);
    let ageVar = 18;

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

    const [major, setMajor] = useState(document.Major);

    const YearList = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7']

    const [year, setYear] = useState(document.Year);

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

    const [ccas, setCCAs] = useState(document.CCAs);
    const [selectedCCAs, setSelectedCCAs] = useState(document.CCAs);

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

    const [interests, setInterests] = useState(document.Interest);
    const [selectedInterests, setSelectedInterests] = useState(document.Interest);

    const [image, setImage] = useState(null);

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                <Button style={styles.signOutButton}
                    labelStyle={styles.signOutButtonText}
                    mode="contained"
                    color="#FD9E0F"
                    uppercase={false}
                    onPress={takePhotoPress}>
                    Take Photo
                </Button>
                <Button style={styles.signOutButton}
                    labelStyle={styles.signOutButtonText}
                    mode="contained"
                    color="#FD9E0F"
                    uppercase={false}
                    onPress={libraryPress}>
                    Choose From Library
                </Button>
                <Button style={styles.signOutButton}
                    labelStyle={styles.signOutButtonText}
                    mode="contained"
                    color="#FD9E0F"
                    uppercase={false}
                    onPress={() => sheetRef.current.snapTo(1)}>
                    Cancel
                </Button>
            </View>

        </View>
    )

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = async (uri) => {
        setIsLoading(true);
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref(`ProfilePhotos/${filename}`);
        const task = storageRef.put(blob);

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            console.log('url: ' + url);
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };

    const takePhotoPress = async () => {
        console.log("Take Photo Pressed");
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Error", "Please allow access to your camera in order to capture a profile picture");
        } else {
            let image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(image.uri);
            setImage(image.uri);
            sheetRef.current.snapTo(1);
        }

    }

    const libraryPress = async () => {
        console.log("Choose From Library Pressed");
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Error", "Please allow access to your Photos Library in order to upload a profile picture");
        } else {
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(image.uri);
            setImage(image.uri);
            sheetRef.current.snapTo(1);
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: '#FD9E0F' }}>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[330, -100]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                enabledGestureInteraction={true}
            />

            <Appbar.Header style={styles.appBarHeader}>
                <Appbar.BackAction onPress={async () => {
                    const doc = await Database.db.collection(email).doc("Information").get();
                    console.log("Go Back");
                    navigation.navigate('Bottom Tab', {
                        screen: 'Profile',
                        params: { document: doc.data() },
                    });
                }} />
                <Appbar.Content title="Edit Profile" titleStyle={styles.headerText} />
                {
                    isLoading?
                    <Image style={{height: 20, width: 20, marginRight: 12, marginLeft: 16}} source={{uri: 'https://i.gifer.com/ZZ5H.gif'}}/>
                    :
                    <Appbar.Action
                    icon="check"
                    color="#000000"
                    onPress={async () => {
                        let Uri = await uploadImage(image);

                        if (Uri == null ){
                            Uri = document.ProfilePhotoUri;
                        }

                        console.log(Uri);

                        const docData = {
                            Name: name,
                            Age: age,
                            Birthday: birthday,
                            CCAs: selectedCCAs,
                            Gender: gender,
                            Interest: selectedInterests,
                            Major: major,
                            Year: year,
                            ProfilePhotoUri: Uri
                        }

                        console.log("Name: ", name);
                        console.log('Edited Gender: ' + gender);
                        console.log('Edited birthday: ' + birthday);
                        console.log('Edited age: ' + age);
                        console.log('Edited Major: ' + major);
                        console.log('Edited Year:  ' + year);
                        console.log('Edited CCAs: ' + selectedCCAs);
                        console.log('Edited Interests: ' + selectedInterests);
                        console.log(docData);
                        // await db.collection(email).doc("Information").set(docData, {merge: true});
                        // const doc = await Database.db.collection(email).doc("Information").get();
                        // navigation.navigate('Bottom Tab', {
                        //     screen: 'Profile',
                        //     params: {document: doc.data()},
                        // });
                        Database.add(email, "Information", docData, true);
                        Database.add("Users", email, docData, true);
                        setIsLoading(false);
                        Alert.alert("Profile updated", "Your profile has been updated!");
                    }}
                />
                }
                
                
            </Appbar.Header>

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >

                <View style={{
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{ uri: image ? image : document.ProfilePhotoUri }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 50 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>

                    <View style={styles.firstLabel}>
                        <Text style={styles.labelHeader}>Name</Text>
                        <TextInput
                            style={styles.input}
                            mode='flat'
                            theme={{ colors: { primary: '#FD9E0F', underlineColor: 'transparent', } }}
                            placeholder={name}
                            value={name}
                            onChangeText={name => setName(name)}
                            onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                        />
                        {data.isValidName ? null :
                            <Animated.View animation="fadeInLeft" duration={500}>
                                <Text style={[styles.errorMsg, { marginLeft: 10 }]}>Please enter a valid name.</Text>
                            </Animated.View>
                        }
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Gender</Text>
                        <CustomPicker
                            textStyle={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 80,
                                paddingVertical: 12,
                                borderColor: '#949494',
                                borderWidth: 1,
                                marginTop: 5
                            }}
                            defaultItem={gender}
                            items={GenderList}
                            onItemChange={(Gender) => {
                                console.log('Edited Gender: ' + Gender);
                                setGender(Gender);
                            }}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Birthday</Text>
                        <CustomDatePicker
                            textStyle={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 12,
                                borderColor: '#949494',
                                borderWidth: 1,
                                marginTop: 5
                            }}
                            defaultDate={birthday}
                            onDateChange={(birthday) => {
                                console.log('birthday ' + moment(birthday).format('Do MMMM YYYY'));
                                setBirthday(new Date(birthday));
                                let monthDiff = Date.now() - birthday;
                                let age_dt = new Date(monthDiff);
                                let year = age_dt.getUTCFullYear();
                                ageVar = Math.abs(year - 1970);
                                setAge(ageVar);
                                console.log('Edited birthday: ' + birthday);
                                console.log('Edited age: ' + ageVar);
                            }}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Major</Text>
                        <CustomPicker
                            textStyle={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 80,
                                paddingVertical: 12,
                                borderColor: '#949494',
                                borderWidth: 1,
                                marginTop: 5
                            }}
                            defaultItem={major}
                            items={MajorList}
                            onItemChange={(Major) => {
                                console.log('Edited Major: ' + Major);
                                setMajor(Major);
                            }}
                        />
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Year</Text>
                        <CustomPicker
                            textStyle={{
                                flexDirection: 'row',
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 80,
                                paddingVertical: 12,
                                borderColor: '#949494',
                                borderWidth: 1,
                                marginTop: 5
                            }}
                            defaultItem={"Year " + year}
                            items={YearList}
                            onItemChange={(Year) => {
                                console.log('Edited Year:  ' + Year);
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
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>CCA(s)</Text>
                        <KeyboardAvoidingView>
                            <MultiSelect
                                hideTags
                                items={ccaList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selectedCCAs) => {
                                    setSelectedCCAs(selectedCCAs);
                                    setCCAs(selectedCCAs);
                                    console.log(selectedCCAs);
                                }}
                                selectedItems={selectedCCAs}
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
                                styleMainWrapper={{
                                    marginHorizontal: 10,
                                    marginTop: 5
                                }}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <View style={[styles.label, { marginBottom: 40 }]}>
                        <Text style={styles.labelHeader}>Interest(s)</Text>
                        <KeyboardAvoidingView>
                            <MultiSelect
                                hideTags
                                items={interestList}
                                uniqueKey="name"
                                onSelectedItemsChange={(selectedInterests) => {
                                    setSelectedInterests(selectedInterests);
                                    setInterests(selectedInterests);
                                    console.log(selectedInterests);
                                }}
                                selectedItems={selectedInterests}
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
                                styleMainWrapper={{
                                    marginHorizontal: 10,
                                    marginTop: 5
                                }}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <View style={styles.lastLabel}>
                        <Text style={styles.lastLabelHeader}></Text>
                        <Text style={styles.lastLabelText}></Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    )

}

const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontFamily: 'SFPro',
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontFamily: 'SFPro',
        fontSize: 14,
        color: 'gray',
        height: 30,
    },
    appBarHeader: {
        backgroundColor: 'transparent',
        height: 45
    },
    headerText: {
        color: '#000000',
        fontFamily: 'SFProMedium',
        fontSize: 18,
    },
    container: {
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    settingsButton: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        marginTop: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    settingsIcon: {
        marginLeft: 10,
        width: 30,
        height: 30
    },
    profileDP: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    profileDisplay: {
        flexDirection: 'column'
    },
    profileName: {
        marginTop: 0,
        fontFamily: 'Montserrat',
        fontSize: 24,
        color: '#2e2e2e'
    },
    helloNameText: {
        marginTop: 10,
        fontFamily: 'MontserratExtraLight',
        fontSize: 16,
        fontWeight: '400',
        color: '#2e2e2e'
    },
    firstLabel: {
        flexDirection: 'column',
        marginTop: 20,
        marginHorizontal: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        marginLeft: 0,
        height: 30,
        width: 310,
    },
    errorMsg: {
        marginRight: 125,
        fontFamily: 'SFPro',
        fontSize: 12,
        color: 'red',
    },
    label: {
        marginTop: 15,
        marginHorizontal: 30,
    },
    labelHeader: {
        marginLeft: 10,
        fontFamily: 'Montserrat',
        color: '#adadad',
        fontSize: 16
    },
    labelText: {
        marginLeft: 10,
        marginTop: 7,
        marginBottom: 7,
        fontFamily: 'MontserratSemiBold',
        fontSize: 16,
        color: '#2e2e2e'
    },
    lastLabel: {
        marginTop: 0,
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    },
    lastLabelHeader: {
        marginLeft: 10,
    },
    lastLabelText: {
        marginLeft: 10,
        marginTop: 7,
        marginBottom: 7,
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButton: {
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signOutButtonText: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default EditProfileScreen;