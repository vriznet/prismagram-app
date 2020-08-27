import React from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate('MessageNavigation')}>
    <Text>Messages</Text>
  </Container>
));
