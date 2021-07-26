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

import moment from 'moment';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";
import { Badge } from 'react-native-paper';

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

  let userID = "";
  let userEmail = "";

  // const getUser = async () => {
  const user = Authentication.auth.currentUser;
  if (user) {
    userID = user.uid;
    userEmail = user.email;
  }
  // }


  useEffect(() => {
    const chatRef = Database.db.collection(userEmail)
      .doc('Chats')
      .collection('Chatlists')
      .orderBy('Time', 'asc')

    const unSubscribe = chatRef.onSnapshot((querySnap) => {
      const MessagesArray = [
        // {
        //   id: '0',
        //   userEmail: 'admin@uni.com',
        //   userName: 'U&I',
        //   userImg: require('../../assets/images/UnILogo.png'),
        //   messageTime: '5 mins ago',
        //   messageText:
        //     'Hey there, welcome to U&I!',
        // }
      ];
      querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        console.log(moment(data.Time.seconds * 1000).calendar());
        const msgInfo = {
          id: data.messengerID,
          userEmail: data.messengerEmail,
          userName: data.messengerName,
          userImg: { uri: data.MessengerProfilePhotoUri },
          messageTime: moment(data.Time.seconds * 1000).calendar(),
          messageText: data.sentBy == userEmail ? "You: " + data.latestMsg : data.latestMsg,
          sentBy: data.sentBy,
        }

        MessagesArray.unshift(msgInfo);
        console.log(userEmail, " MessageArray: ", MessagesArray);
        setMessages(MessagesArray);
        console.log(userEmail, ' Messages: ', Messages);
      })
      return () => {
        unSubscribe()
      }
    })
  }, []);

  if(Messages.length == 0){
    return(
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
        <Text style={{
          fontSize: 16,
          fontFamily: "SFPro"
        }}>You do not have any messages!</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1, }}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <Container>
          <FlatList
            data={Messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card onPress={() => navigation.navigate('Chat', { userName: item.userName, userEmail: item.userEmail, userID: item.id, email: userEmail, profilePhotoUri: item.userImg })}>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.userImg} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.userName}</UserName>
                      <PostTime>{item.messageTime}</PostTime>
                    </UserInfoText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <MessageText>{item.messageText}</MessageText>
                      {
                        item.sentBy == userEmail ?
                          null :
                          <Badge
                            size={10}
                            theme={{ colors: { notification: '#FD9E0F' } }} />
                      }
                    </View>
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