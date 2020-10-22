import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import style from '../style';
import constants from '../constants';
import Post from './Post';
import SquarePhoto from './SquarePhoto';

const ProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-top: 20px;
`;
const HeaderColumn = styled.View``;
const ProfileStats = styled.View`
  flex-direction: row;
`;
const Stat = styled.View`
  align-items: center;
  margin-right: 50px;
`;
const StatNumber = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const StatName = styled.Text`
  font-size: 12px;
  color: ${style.darkGrayColor};
`;
const ProfileMeta = styled.View`
  margin-top: 14px;
  padding-left: 20px;
`;
const FullName = styled.Text`
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 6px;
`;
const Bio = styled.Text`
  line-height: 12px;
  font-size: 12px;
`;
const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 14px;
  margin-bottom: 8px;
`;
const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;
const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ListContainer = styled.View`
  flex-direction: column-reverse;
`;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  fullName,
  bio,
  posts,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);
  const postList = posts && posts.reverse();
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 60, width: 60, borderRadius: 30, marginRight: 60 }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <StatNumber>{postsCount}</StatNumber>
              <StatName>게시물</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followersCount}</StatNumber>
              <StatName>팔로워</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>팔로잉</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <FullName>{fullName}</FullName>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              size={26}
              color={isGrid ? style.blackColor : style.darkGrayColor}
              name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              size={26}
              color={isGrid ? style.darkGrayColor : style.blackColor}
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      {isGrid ? (
        <GridContainer>
          {postList &&
            postList.map((post) => <SquarePhoto key={post.id} {...post} />)}
        </GridContainer>
      ) : (
        <ListContainer>
          {postList && postList.map((post) => <Post key={post.id} {...post} />)}
        </ListContainer>
      )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default UserProfile;
