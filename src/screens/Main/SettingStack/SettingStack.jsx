import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Progress from './ProgressComp/Progress';
// import BMI from './ProgressComp/BMI';
import Profile from './settingcomp/Profile';
import SettingsScreen from './settingcomp/SettingsScreen';
// import Home from '../k';
// import WorkoutScreen from './WorkoutScreen';
// import Home from '../HomeComponents/Home';
// import Session from '../HomeComponents/Session';
// import BMICalculator from '../../../../screens/OnboardingScreens/BMI';

const Stack = createNativeStackNavigator();

const SettingStack = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen name="Progress" component={SettingsScreen} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

export default SettingStack;
