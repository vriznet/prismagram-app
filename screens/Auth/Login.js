import React from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default () => {
  const emailInput = useInput('');
  const handleLogin = () => {};
  return (
    <View>
      <AuthInput
        {...emailInput}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthButton text="Log In" onPress={() => null} />
    </View>
  );
};