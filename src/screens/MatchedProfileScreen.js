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
} from '../../styles/MatchesStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackBtn from '../components/BackBtn';

import moment from 'moment';

import * as Authentication from "../../api/auth";
import * as Database from "../../api/firestore";
import { Appbar, Badge } from 'react-native-paper';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MatchedProfileScreen = ({ navigation, route }) => {

  console.log("At Profile Matched Screen");
  console.log("params: ", route.params.Profiles);

  const profiles = route.params.Profiles;
  const [profileInfo, setProfileInfo] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const [Messages, setMessages] = useState([])

  let userID = "";
  let userEmail = "";

  const user = Authentication.auth.currentUser;
  if (user) {
    userID = user.uid;
    userEmail = user.email;
  }


  useEffect(() => {

    const matchesInfoArray = [];

    profiles.forEach((email) => {
      console.log("emails: ", email);
      Database.db.collection("Users")
        .doc(email)
        .get()
        .then((info) => {
          console.log(info.data());
          const matchesInfo = {
            id: info.data().UserID,
            userEmail: email,
            userName: info.data().Name,
            userAge: info.data().Age,
            userMajor: info.data().Major,
            userProfilePhoto: { uri: info.data().ProfilePhotoUri },
          };

          matchesInfoArray.push(matchesInfo);
          console.log("matchesInfoArray: ", matchesInfoArray);
          setProfileInfo(matchesInfoArray);
        })
    })
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1, }}>

      <BackBtn onPress={() => navigation.goBack()} />

      <Text style={{
        marginLeft: 15,
        marginVertical: 10,
        fontSize: 24,
        fontFamily: 'GothamRoundedMedium',
      }}>Here are your{"\n"}Matches: </Text>

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

        <Container>
          <FlatList
            data={profileInfo}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (

              <Card onPress={() => navigation.navigate('Person Profile', { personEmail: item.userEmail })}>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.userProfilePhoto} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.userName}</UserName>
                      <PostTime>{" , " + item.userAge}</PostTime>
                    </UserInfoText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '75%' }}>
                      <MessageText>{item.userMajor}</MessageText>
                      <Badge
                        size={30}
                        theme={{ colors: { notification: '#FD9E0F' } }}
                        onPress={() => navigation.navigate('Chat', { userName: item.userName, userEmail: item.userEmail, userID: item.id, email: userEmail, profilePhotoUri: item.userProfilePhoto })}>
                        <FontAwesome name='comments' size={18} color='#FFFFFF' />
                      </Badge>
                    </View>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        </Container>
      </ScrollView>
    </SafeAreaView >
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
  appBarHeader: {
    backgroundColor: 'transparent',
    height: 45,
  },
  headerText: {
    color: '#000000',
    fontFamily: 'SFProMedium',
    fontSize: 18,
  },
});

export default MatchedProfileScreen;