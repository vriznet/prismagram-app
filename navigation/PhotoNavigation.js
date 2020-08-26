import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import Upload from '../screens/Photo/Upload';

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto,
    TakePhoto,
  },
  {
    tabBarPosition: 'bottom',
  }
);

export default createStackNavigator({
  PhotoTabs,
  Upload,
});
