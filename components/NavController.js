import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useIsLoggedIn, useLogUserIn, useLogUserOut } from '../AuthContext';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logUserIn = useLogUserIn();
  const logUserOut = useLogUserOut();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logUserOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logUserIn}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
