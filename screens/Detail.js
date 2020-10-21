import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

export default ({ navigation }) => (
  <View>
    <Text>I should fetch for: {navigation.getParam('id')}</Text>
  </View>
);
