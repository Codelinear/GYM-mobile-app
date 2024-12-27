import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Gender from '../../screens/OnboardingScreens/Gender';
import DailyActivity from '../../screens/OnboardingScreens/DailyActivity';
import FitnessGoal from '../../screens/OnboardingScreens/FitnessGoal';
import BMICalculator from '../../screens/OnboardingScreens/BMI';
import Access from '../../screens/OnboardingScreens/Access';
import Finish from '../../screens/OnboardingScreens/Finish';

const Stack = createNativeStackNavigator();

const OnboardingStack = ({setIsOnboarded}) => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Gender" component={Gender} />
    <Stack.Screen name="BMI" component={BMICalculator} />
    <Stack.Screen name="DailyActivity" component={DailyActivity} />
    <Stack.Screen name="FitnessGoal" component={FitnessGoal} />
    <Stack.Screen name="GymAccess" component={Access} />
    <Stack.Screen name="Finish" component={Finish} />
  </Stack.Navigator>
);

export default OnboardingStack;
