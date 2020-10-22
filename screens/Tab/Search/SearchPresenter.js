import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../../components/Loader';
import SquarePhoto from '../../../components/SquarePhoto';

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      files {
        id
        url
      }
      likeCount
      commentCount
      id
    }
  }
`;

const SearchContainer = styled.View`
  padding-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefresing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term },
    skip: !shouldFetch,
    fetchPolicy: 'network-only',
  });
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
    >
      {loading ? (
        <Loader />
      ) : (
        <SearchContainer>
          {data &&
            data.searchPost &&
            data.searchPost.map((post) => (
              <SquarePhoto key={post.id} {...post} />
            ))}
        </SearchContainer>
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
