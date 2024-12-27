import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from './discoverComponent/Discover';
import DiscoverWorouts from './discoverComponent/DiscoverWorouts';
import WorkoutScreen from '../HomeStackNavigator/WorkoutScreen';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen name="Discover" component={Discover} />
    <Stack.Screen name="Workoutss" component={DiscoverWorouts} />
    <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    {/* <Stack.Screen name="Session" component={Session} />
    <Stack.Screen name="BMI" component={BMICalculator} /> */}
  </Stack.Navigator>
);

export default DiscoverStack;
