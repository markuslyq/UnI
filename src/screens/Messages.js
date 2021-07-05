import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/MessageStyles';
import { Appbar } from 'react-native-paper';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MessagesScreen = ({ navigation, route }) => {

  console.log("At Messages Screen")

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [Messages, setMessages] = useState([])

  const MessagesArray = [
    {
      id: '0',
      userEmail: 'admin@uni.com',
      userName: 'U&I',
      userImg: require('../../assets/images/UnILogo.png'),
      messageTime: '5 mins ago',
      messageText:
        'Hey there, welcome to U&I',
    }
  ];

  let userID = "";
  let userEmail = "";

  // const getUser = async () => {
  const user = Authentication.auth.currentUser;
  if (user) {
    userID = user.uid;
    userEmail = user.email;
  }
  // }
  const chatRef = Database.db.collection(userEmail)
    .doc('Chats')
    .collection('Chatlists')
    .orderBy('Time', 'asc')

  const unSubscribe = chatRef.onSnapshot((querySnap) => {
    querySnap.docs.map(docSnap => {
      const data = docSnap.data();
      // console.log(data);
      const msgInfo = {
        id: data.messengerID,
        userEmail: data.messengerEmail,
        userName: data.messengerName,
        userImg: require('../../assets/images/blankProfilePic.png'),
        messageTime: '4 mins ago',
        messageText: data.latestMsg
      }
      MessagesArray.unshift(msgInfo);
      // setMessages(MessagesArray);
      console.log('MessageArray: ', MessagesArray);
    })
    return () => {
      unSubscribe()
    }
  })

  // setMessages(MessagesArray);
  // useEffect(() => {
  //   // let chatLists = [];
  //   // Database.db.collection(userEmail)
  //   //     .doc('Chats')
  //   //     .collection('Chatlists')
  //   //     .get()
  //   //     .then((doc) => {
  //   //       chatLists = doc.data();
  //   //       console.log(chatLists)
  //   // for (let i = 0; i < chatLists.length; i++){
  //   //   Database.db.collection(chatLists[i]).doc("Information").get()
  //   //   .then((info) => {
  //   //     console.log(info.data());
  //   //     const msgInfo = {
  //   //       id: info.data().UserID,
  //   //       userName: info.data().Name,
  //   //       userImg: require('../../assets/images/blankProfilePic.png'),
  //   //     }
  //   //   })
  //   // }
  //   getUser();
  //   const chatRef = Database.db.collection(userEmail)
  //     .doc('Chats')
  //     .collection('Chatlists')
  //     .orderBy('Time', 'asc')

  //   const unSubscribe = chatRef.onSnapshot((querySnap) => {
  //     querySnap.docs.map(docSnap => {
  //       const data = docSnap.data();
  //       // console.log(data);
  //       const msgInfo = {
  //         id: data.messengerID,
  //         userEmail: data.messengerEmail,
  //         userName: data.messengerName,
  //         userImg: require('../../assets/images/blankProfilePic.png'),
  //         messageTime: '4 mins ago',
  //         messageText: data.latestMsg
  //       }
  //       Messages.unshift(msgInfo);
  //       console.log(Messages);

  //     })

  //     return () => {
  //       unSubscribe()
  //     }
  //   })
  // }, [])

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <Container>
          <FlatList
            data={MessagesArray}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card onPress={() => navigation.navigate('Chat', { userName: item.userName, userEmail: item.userEmail, userID: item.id, email: userEmail })}>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.userImg} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.userName}</UserName>
                      <PostTime>{item.messageTime}</PostTime>
                    </UserInfoText>
                    <MessageText>{item.messageText}</MessageText>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appBarHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  headerText: {
    color: '#2e2e2e',
    fontFamily: 'SFPro',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MessagesScreen;