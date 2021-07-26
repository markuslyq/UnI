import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Appbar, Button } from 'react-native-paper';
import { UserName } from '../../styles/MessageStyles';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const ChatScreen = ({ navigation, route }) => {

    const user = Authentication.auth.currentUser;
    const userID = user.uid;
    let userName = user.displayName;
    const userEmail = route.params.email;
    let personName = route.params.userName;
    const personEmail = route.params.userEmail;
    const personID = route.params.userID;
    let personProfilePic = "";
    let userProfilePic = "";

    console.log("At", personName, "Chat Screen")
    console.log(route.params.profilePhotoUri);

    const [messages, setMessages] = useState([]);
    const dummy = {};

    const getPersonData = async () => {
        const personData = await Database.db.collection(personEmail)
            .doc('Information')
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('Person Data: ', documentSnapshot.data());
                    personProfilePic = documentSnapshot.data().ProfilePhotoUri;
                    personName = documentSnapshot.data().Name;
                }
            })
    }

    const getUserData = async () => {
        const personData = await Database.db.collection(userEmail)
            .doc('Information')
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data: ', documentSnapshot.data());
                    userProfilePic = documentSnapshot.data().ProfilePhotoUri;
                    userName = documentSnapshot.data().Name;
                }
            })
    }


    useEffect(() => {

        getPersonData();
        getUserData();

        const messageRef = Database.db.collection(userEmail)
            .doc('Chats')
            .collection(personEmail)
            .orderBy('createdAt', "desc")

        const unSubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSnap => {
                const data = docSnap.data()
                if (data.createdAt) {
                    return {
                        ...docSnap.data(),
                        createdAt: docSnap.data().createdAt.toDate()
                    }
                } else {
                    return {
                        ...docSnap.data(),
                        createdAt: new Date()
                    }
                }

            })
            setMessages(allmsg)
        })


        return () => {
            unSubscribe()
        }
    }, [])

    // const [personProfilePic, setPersonProfilePic] = useState('')
    // const [userProfilePic, setUserProfilePic] = useState('')

    const onSend = useCallback((messageArray) => {
        console.log("messageArray[0]: ", messageArray[0]);
        const msg = messageArray[0];
        const mymsg = {
            ...msg,
            sentBy: userID,
            sentTo: personID,
            createdAt: new Date(),
        }
        console.log("mymsg: ", mymsg);
        console.log("userEmail: " + userEmail + "\npersonEmail: " + personEmail);
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));

        if (personEmail != "admin@uni.com") {
            const userLatest = {
                messengerID: personID,
                messengerEmail: personEmail,
                messengerName: personName,
                latestMsg: messageArray[0].text,
                Time: mymsg.createdAt,
                sentBy: userEmail,
                sentTo: personEmail,
                MessengerProfilePhotoUri: personProfilePic,
            }

            const personLatest = {
                messengerID: userID,
                messengerEmail: userEmail,
                messengerName: userName,
                latestMsg: messageArray[0].text,
                Time: mymsg.createdAt,
                sentBy: userEmail,
                sentTo: personEmail,
                MessengerProfilePhotoUri: userProfilePic,
            }

            Database.db.collection(userEmail)
                .doc('Chats')
                .set(dummy, { merge: true })

            Database.db.collection(userEmail)
                .doc('Chats')
                .collection(personEmail)
                .add(mymsg)

            Database.db.collection(userEmail)
                .doc('Chats')
                .collection('Chatlists')
                .doc(personEmail)
                .set(userLatest)

            Database.db.collection(personEmail)
                .doc('Chats')
                .set(dummy, { merge: true })

            Database.db.collection(personEmail)
                .doc('Chats')
                .collection(userEmail)
                .add(mymsg)

            Database.db.collection(personEmail)
                .doc('Chats')
                .collection('Chatlists')
                .doc(userEmail)
                .set(personLatest)
        }
    }, [])

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#FD9E0F"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#FD9E0F',
                        marginRight: 5
                    },
                    left: {
                        backgroundColor: '#e5e5ea',
                        marginLeft: 5
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='caret-down' size={22} color='#333' />
        );
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: userID,
                    name: userName
                }}
                renderAvatar={null}
                renderBubble={renderBubble}
                renderSend={renderSend}
                alwaysShowSend
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />
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
    },
    appBarHeader: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    headerText: {
        color: '#2e2e2e',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
export default ChatScreen;