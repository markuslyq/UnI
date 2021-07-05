import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

import { Appbar, Button } from 'react-native-paper';
import { UserName } from '../../styles/MessageStyles';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const ChatScreen = ({ navigation, route }) => {

    const user = Authentication.auth.currentUser;
    const userID = user.uid;
    const userName = user.displayName;
    const userEmail = route.params.email;
    const personName = route.params.userName;
    const personEmail = route.params.userEmail;
    const personID = route.params.userID;

    console.log("At" , personName, "Chat Screen")

    const [messages, setMessages] = useState([]);
    const dummy = {};

    useEffect(() => {

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


        const userLatest = {
            messengerID: personID,
            messengerEmail: personEmail,
            messengerName: personName,
            latestMsg: messageArray[0].text,
            Time: mymsg.createdAt,
            sentBy: userEmail,
            sentTo: personEmail
        }

        const personLatest = {
            messengerID: userID,
            messengerEmail: userEmail,
            messengerName: userName,
            latestMsg: messageArray[0].text,
            Time: mymsg.createdAt,
            sentBy: userEmail,
            sentTo: personEmail
        }

        const userLists = {
            chatlist: [personEmail]
        }

        const personLists = {
            chatlist: [userEmail]
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
    }, [])

    const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#2e64e5',
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