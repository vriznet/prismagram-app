import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam('email', ''));
  const firstNameInput = useInput('');
  const lastNameInput = useInput('');
  const usernameInput = useInput('');
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: firstNameInput.value,
      lastNameInput: lastNameInput.value,
    },
  });
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: username } = usernameInput;
    if (!emailRegex.test(email)) {
      return Alert.alert('Email Address is invalid');
    }
    if (firstName === '') {
      return Alert.alert('Please input your first name');
    }
    if (username === '') {
      return Alert.alert('Please input your user name');
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert('Account created.', 'Log In Now!');
        navigation.navigate('Login', { email });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Username or Email is already taken');
      navigation.navigate('Login', { email });
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
          autoCorrect={false}
        />
        <AuthInput
          {...firstNameInput}
          placeholder="First Name"
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <AuthInput
          {...lastNameInput}
          placeholder="Last Name"
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          keyboardType="default"
          autoCapitalize="none"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text="Sign Up" onPress={handleSignUp} />
      </View>
    </TouchableWithoutFeedback>
  );
};
