import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';

export default createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation'),
    },
  },
  Notifications,
  Profile,
});
