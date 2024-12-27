import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../k';
import WorkoutScreen from './WorkoutScreen';
import Home from '../HomeComponents/Home';
import Session from '../HomeComponents/Session';
import BMICalculator from '../../../../screens/OnboardingScreens/BMI';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    <Stack.Screen name="Session" component={Session} />
    <Stack.Screen name="BMI" component={BMICalculator} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
