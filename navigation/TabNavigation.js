import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';
import Home from '../screens/Tab/Home';
import Search from '../screens/Tab/Search';
import Notifications from '../screens/Tab/Notifications';
import Profile from '../screens/Tab/Profile';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig },
    },
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: () => <MessagesLink />,
        headerTitle: () => <NavIcon name="logo-instagram" size={36} />,
      }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
        ),
      },
    },
    Search: {
      screen: stackFactory(Search, { title: 'Search' }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
        ),
      },
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate('PhotoNavigation'),
        tabBarIcon: (
          <NavIcon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
        ),
      },
    },
    Notifications: {
      screen: stackFactory(Notifications, { title: 'Notifications' }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
        ),
      },
    },
    Profile: {
      screen: stackFactory(Profile, { title: 'Profile' }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);
