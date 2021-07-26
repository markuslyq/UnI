import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { Button } from 'react-native-paper';

import * as Authentication from "../../api/auth";

const FirstTimeLoginScreen = ({ navigation }) => {

    console.log("At First Time Login Screen");

    const user = Authentication.auth.currentUser;
    let name = '';
    
    if (user != null) {
        name = user.displayName;
    }

    const continuePress = () => {
        navigation.navigate('Gender');
        console.log("Go to Gender Screen");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Logo */}
                <Image source={require('../../assets/images/UnILogo(full).png')}
                    style={styles.uniLogo} />

                <View style={styles.bottomContainer}>

                    {/* Description */}
                    <Text style={styles.welcomeText}>Welcome {name},</Text>
                    <Text style={styles.descriptionText}>Since it’s your first login, we’ll need a{"\n"}self-introduction in order for others to{"\n"}know you better.</Text>

                    {/* Getting Started Button */}
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
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    uniLogo: {
        marginRight: 13,
        width: 300
    },
    welcomeText: {
        marginTop: 50,
        fontFamily: 'GothamRoundedMedium',
        fontWeight: 'bold',
        fontSize: 34
    },
    descriptionText: {
        textAlign: 'center',
        fontFamily: 'SFPro',
        fontSize: 16,
        color: '#858585',
        lineHeight: 23
    },
    continueButton: {
        borderRadius: 20,
        marginTop: 100,
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
export default FirstTimeLoginScreen;