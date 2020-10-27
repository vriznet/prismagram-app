import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import { RefreshControl, ScrollView } from 'react-native';
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

export default () => {
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
