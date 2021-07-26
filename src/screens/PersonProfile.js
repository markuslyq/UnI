import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert, TouchableOpacity, ScrollView, Dimensions, RefreshControl } from 'react-native';

import { Button, Appbar, Avatar, Card, Chip } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import moment from 'moment';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const PersonProfileScreen = ({ navigation, route }) => {

    console.log("At Person Profile Screen")

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [document, setDocument] = useState({});

    const personEmail = route.params.personEmail;

    const [birthday, setBirthday] = useState(new Date());

    const CCAchips = [];
    const [CCADisplay, setCCADisplay] = useState([]);

    const interestsChips = [];
    const [interestsDisplay, setInterestsDisplay] = useState([]);

    useEffect(() => {

        const unSubscribe = Database.db.collection(personEmail)
            .doc('Information')
            .onSnapshot((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log("Person Data: ", documentSnapshot.data());
                    setDocument(documentSnapshot.data());

                    setBirthday(documentSnapshot.data().Birthday.seconds*1000);

                    for (let i = 0; i < documentSnapshot.data().CCAs.length; i++) {
                        CCAchips.push(<Chip style={{ margin: 3 }}>{documentSnapshot.data().CCAs[i]}</Chip>);
                    }
                    setCCADisplay(CCAchips);

                    for (let i = 0; i < documentSnapshot.data().Interest.length; i++) {
                        interestsChips.push(<Chip style={{ margin: 3 }}>{documentSnapshot.data().Interest[i]}</Chip>)
                    }
                    setInterestsDisplay(interestsChips);
                }
            })

        return () => {
            unSubscribe();
        }


    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#FD9E0F' }}>

            <Appbar.Header style={styles.appBarHeader}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title={document.Name} titleStyle={styles.headerText} />
            </Appbar.Header>

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >

                <View style={styles.profileDP}>
                    <Avatar.Image
                        size={70}
                        source={{ uri: document.ProfilePhotoUri }}
                        style={{
                            marginLeft: 40,
                            marginRight: 20
                        }} />
                    <View style={styles.profileDisplay}>
                        <Text style={styles.helloNameText}>Hello, I am</Text>
                        <Text style={styles.profileName}>{document.Name}</Text>
                    </View>
                </View>

                <View style={styles.container}>

                    <View style={styles.firstLabel}>
                        <Text style={styles.labelHeader}>Age</Text>
                        <Text style={styles.labelText}>{document.Age}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Gender</Text>
                        <Text style={styles.labelText}>{document.Gender}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Birthday</Text>
                        <Text style={styles.labelText}>{moment(birthday).format("Do MMMM YYYY")}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Major</Text>
                        <Text style={styles.labelText}>{document.Major}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>Year</Text>
                        <Text style={styles.labelText}>Year {document.Year}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelHeader}>CCA(s)</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 7 }}>
                            {CCADisplay}
                        </View>
                    </View>
                    <View style={[styles.label, { marginBottom: 40 }]}>
                        <Text style={styles.labelHeader}>Interest(s)</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 7 }}>
                            {interestsDisplay}
                        </View>
                    </View>
                    <View style={styles.lastLabel}>
                        <Text style={styles.lastLabelHeader}></Text>
                        <Text style={styles.lastLabelText}></Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: 50,
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
        flexDirection: 'row',
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
        marginTop: 40,
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    label: {
        marginTop: 20,
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
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
        marginTop: 50,
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
export default PersonProfileScreen;