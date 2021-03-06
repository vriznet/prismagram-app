import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px 0px;
  border-radius: 4px;
  width: ${constants.width / 2}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable onPress={onPress} disabled={loading}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default AuthButton;
