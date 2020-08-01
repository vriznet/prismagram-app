import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsLoggedIn, useLogUserIn, useLogUserOut } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logUserIn = useLogUserIn();
  const logUserOut = useLogUserOut();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logUserOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
      ) : (
        <AuthNavigation />
      )}
    </View>
  );
};
