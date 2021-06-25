import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Button, Appbar, Avatar, Card } from 'react-native-paper';

import * as Authentication from "../../api/auth";

const TestScreen = ({ navigation }) => {

    const Tab = createBottomTabNavigator();

    const signOutPress = () => {
        Authentication.signOut(
            () => { navigation.navigate('Home') },
            (error) => {
                Alert.alert("Sign Out Error", error);
            }
        )
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <SafeAreaView style={{ backgroundColor: '#FD9E0F' }}>

            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Profile" titleStyle={styles.headerText} />
                <Appbar.Action icon="cog" color="#2e2e2e" onPress={() => console.log("settings pressed")} />
            </Appbar.Header>

            <View style={styles.profileDP}>
                <Avatar.Image
                    size={70}
                    source={require('../../assets/images/blankProfilePic.png')}
                    style={{
                        marginLeft: 40,
                        marginRight: 20
                    }} />
                <View style={styles.profileDisplay}>
                    <Text style={styles.helloNameText}>Hello</Text>
                    <Text style={styles.profileName}>Markus</Text>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.firstLabel}>
                    <Text style={styles.labelHeader}>Age</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelHeader}>Gender</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelHeader}>Birthday</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelHeader}>Major</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelHeader}>CCA(s)</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelHeader}>Interest(s)</Text>
                    <Text style={styles.labelText}>22</Text>
                </View>
                <View style={styles.button}>
                    <Button style={styles.signOutButton}
                        labelStyle={styles.signOutButtonText}
                        mode="contained"
                        color="#FD9E0F"
                        uppercase={false}
                        onPress={signOutPress}>
                        Sign Out
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent'
    },
    headerText: {
        color: '#2e2e2e',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
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
        fontFamily: 'MontserratSemiBold',
        fontSize: 16,
        color: '#2e2e2e'
    },
    button:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButton: {
        marginTop: 40,
        marginBottom: 10,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signOutButtonText: {
        borderRadius: 20,
        fontFamily: 'Avenir',
        fontSize: 18,
        color: '#5C5C5C',
        fontWeight: 'normal'
    }
})
export default TestScreen;