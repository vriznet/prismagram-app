import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import Home from '../screens/Tab/Home';
import Search from '../screens/Tab/Search';
import Notifications from '../screens/Tab/Notifications';
import Profile from '../screens/Tab/Profile';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig },
    },
  });

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: 'Home',
      headerRight: () => (
        <TouchableOpacity>
          <Text>Hello</Text>
        </TouchableOpacity>
      ),
    }),
  },
  Search: {
    screen: stackFactory(Search, { title: 'Search' }),
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation'),
    },
  },
  Notifications: {
    screen: stackFactory(Notifications, { title: 'Notifications' }),
  },
  Profile: {
    screen: stackFactory(Profile, { title: 'Profile' }),
  },
});
