import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import Upload from '../screens/Photo/Upload';
import style from '../style';
import { stackStyles } from './config';

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: 'Select',
      },
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: 'Take',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: style.blackColor,
        marginBottom: 65,
      },
      labelStyle: {
        color: style.blackColor,
        fontWeight: '600',
      },
      style: {
        paddingBottom: 20,
        ...stackStyles,
      },
    },
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        headerShown: false,
      },
    },
    Upload,
  },
  {
    defaultNavigationOptions: {
      title: 'Photo',
      headerStyle: {
        ...stackStyles,
      },
    },
  }
);
