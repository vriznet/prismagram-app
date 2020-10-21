import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      files {
        url
      }
      likeCount
      commentCount
      id
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefresing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term },
    skip: !shouldFetch,
  });
  console.log(data);
  const onRefresh = async () => {
    try {
      setRefresing(true);
      await refetch({ variables: { term } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefresing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    ></ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
