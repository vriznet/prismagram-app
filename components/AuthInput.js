import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
  margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.grayColor};
  width: ${constants.width / 2}px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = 'default',
  autoCapitalize,
  onChange,
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  onChange: PropTypes.func.isRequired,
};

export default AuthInput;
