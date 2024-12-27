import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import OnboardingStack from './OnboardingStack';
import MainTabNavigator from './MainTabNavigator';
import {ScrollView, View} from 'react-native';
import tailwind from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ScrollView} from 'react-native-gesture-handler';

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Simulate token and onboarding check
  // const checkLoginStatus = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   console.log(token);
  //   // Replace with AsyncStorage or SecureStore check
  //   // const onboarded = false; // Replace with real onboarding check
  //   const onboarded = await AsyncStorage.getItem('onboard'); // Replace with real onboarding check
  //   console.log(onboarded);
  //   setIsLoggedIn(token);
  //   setIsOnboarded(onboarded);
  // };

  // checkLoginStatus();

  return (
    <NavigationContainer>
      {/* {isLoggedIn ? (
        isOnboarded ? (
          <MainTabNavigator />
        ) : (
          <OnboardingStack setIsOnboarded={setIsOnboarded} />
        )
      ) : (
        <AuthStack />
      )} */}
      {/* <OnboardingStack /> */}
      {/* <AuthStack /> */}
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
