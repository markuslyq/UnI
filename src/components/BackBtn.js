import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
// import { Directions } from 'react-native-gesture-handler';

const BackBtn = (props) => {
    return(
        <TouchableOpacity style={styles.backButton} onPress={props.onPress}>
            <Image style={styles.backIcon}source={require('../../assets/images/back-icon.png')}/>
            <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        marginTop: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    backIcon: {
        marginRight: -7,
        width: 30,
        height: 30
    },
    backText: {
        fontFamily: 'Avenir',
        fontSize: 18
    }
})

export default BackBtn;