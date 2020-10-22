import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../components/Loader';
import UserProfile from '../../components/UserProfile';

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);

  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
