import styled from 'styled-components';

export const Container = styled.View`
  padding-horizontal: 26px;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  borderWidth: 1px;
  width: 80%;
  borderColor: #cccccc;
  borderRadius: 20px;
  margin: 5px;
  padding-left: 10px;
  elevation: 2;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0px;
`;

export const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  font-family: 'MontserratSemiBold';
`;

export const PostTime = styled.Text`
  font-size: 16px;
  color: #666;
  font-family: 'Montserrat';
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;