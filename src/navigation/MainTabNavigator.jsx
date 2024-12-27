import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import Home from '../screens/Main/k';
import HomeStackNavigator from '../screens/Main/HomeStackNavigator/HomeStackNavigator';
import Home from '../screens/Main/HomeComponents/Home';
import DiscoverStack from '../screens/Main/Discoverstack/DiscoverStack';
import ProgressScreen from '../screens/Main/ProgressStack/ProgressScreen';
import SettingStack from '../screens/Main/SettingStack/SettingStack';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Discover" component={DiscoverStack} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
    <Tab.Screen name="Settings" component={SettingStack} />
  </Tab.Navigator>
);

export default MainTabNavigator;
1;
