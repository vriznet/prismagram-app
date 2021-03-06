import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam('email', ''));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = async () => {
    const { value } = emailInput;
    if (value === '') {
      return Alert.alert('Email cannot be empty');
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email address');
    } else if (!emailRegex.test(value)) {
      return Alert.alert('Email Address is invalid');
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert('Check your email');
        navigation.navigate('Confirm', { email: value });
        return;
      } else {
        Alert.alert('Account not found');
        navigation.navigate('SignUp', { email: value });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Cannot log in now.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
