import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { gql } from 'apollo-boost';
import constants from '../constants';
import style from '../style';
import { useMutation } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';

const Container = styled.View`
  margin-bottom: 20px;
`;

const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-size: 13px;
  font-weight: 700;
`;

const Location = styled.Text`
  font-size: 11px;
`;

const PhotoOfPost = styled.Image`
  width: ${constants.width}px;
  height: ${constants.width}px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 5px 0px 0px 12px;
`;

const LikeCountContainer = styled.Text`
  margin-bottom: 4px;
`;

const Caption = styled.Text``;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  isLiked: isLikedProp,
  navigation,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });

  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate('UserDetail', { username: user.username })
          }
        >
          <Avatar source={{ uri: user.avatar }} />
        </Touchable>
        <HeaderUserContainer>
          <Touchable
            onPress={() =>
              navigation.navigate('UserDetail', { username: user.username })
            }
          >
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </Touchable>
        </HeaderUserContainer>
      </Header>
      <Swiper style={{ height: constants.height / 2.5 }}>
        {files.map((file, index) => (
          <PhotoOfPost key={file.id} source={{ uri: file.url }} />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                color={isLiked ? style.redColor : style.blackColor}
                name={
                  Platform.OS === 'ios'
                    ? isLiked
                      ? 'ios-heart'
                      : 'ios-heart-empty'
                    : isLiked
                    ? 'md-heart'
                    : 'md-heart-empty'
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                color={style.blackColor}
                name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <LikeCountContainer>
          <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
        </LikeCountContainer>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default withNavigation(Post);
