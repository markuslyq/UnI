import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

import { Button } from 'react-native-paper';

const MatchScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text>MatchScreen</Text>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})
export default MatchScreen;