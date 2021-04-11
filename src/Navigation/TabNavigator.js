import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../containers/dashBoard/Home/Profile';
import Notifications from '../containers/dashBoard/Notifications/Notifications';
import {Constants} from '../utilities';
import CImage from '../components/cImage';
import {Style} from '../containers/dashBoard/style';
import Settings from '../containers/dashBoard/Settings/Settings';
const Tab = createBottomTabNavigator();

const {LOCAL_PATH} = Constants;
let INITIAL_ROUTE_NAME = 'Profile';

export default class TabNavigation extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        backBehavior={'initialRoute'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Profile') {
              iconName = focused
                ? LOCAL_PATH.PROFILE_TAB_SELECTED_ICON
                : LOCAL_PATH.PROFILE_TAB_UNSELECTED_ICON;
            } else if (route.name === 'Settings') {
              iconName = focused
                ? LOCAL_PATH.SETTINGS_TAB_SELECTED_ICON
                : LOCAL_PATH.SETTINGS_TAB_UNSELECTED_ICON;
            } else if (route.name === 'Notifications') {
              iconName = focused
                ? LOCAL_PATH.NOTIFICATIONS_TAB_SELECTED_ICON
                : LOCAL_PATH.NOTIFICATIONS_TAB_UNSELECTED_ICON;
            }

            return (
              <View style={Style.tabIconContainer}>
                <CImage imagePath={iconName} imageStyle={Style.tabIcon} />
              </View>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: Style.selectedTabTitleColor.color,
          inactiveTintColor: Style.unSelectedTabTitleColor.color,
        }}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }
}
