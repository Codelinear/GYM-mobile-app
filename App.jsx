// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import SignUpPhone from './screens/SignUpPhone';
// // import {NavigationContainer} from '@react-navigation/native';

// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import EnterOTP from './screens/EnterOTP';
// // import SignUpPhone from '../screens/SignUpPhone';
// // import SignUpEmail from '../screens/SignUpEmail';
// // import EnterOTP from '../screens/EnterOTP';
// import {enableScreens} from 'react-native-screens';
// const Stack = createStackNavigator();

// enableScreens();

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   // const Stack = createStackNavigator();

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <NavigationContainer>
//             <Stack.Navigator initialRouteName="SignUpPhone">
//               <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
//               <Stack.Screen name="EnterOTP" component={EnterOTP} />
//             </Stack.Navigator>
//           </NavigationContainer>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default App;

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

// Import Screens
// import SignUpPhone from './screens/SignUpPhone';
// import EnterOTP from './screens/EnterOTP';
// import Wellcome from './screens/Wellcome';
// import EmailInput from './screens/signupscreen/EmailInput';
// import Gender from './screens/OnboardingScreens/Gender';
// import BMI from './screens/OnboardingScreens/BMI';
// import DailyActivity from './screens/OnboardingScreens/DailyActivity';
// import FitnessGoal from './screens/OnboardingScreens/FitnessGoal';
import AppNavigator from './src/navigation/AppNavigator';
import tailwind from 'twrnc';
//
enableScreens();

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Ensure it takes up the full screen
    overflow: 'scroll',
  };

  return (
    <SafeAreaView style={tailwind`flex-1 overflow-scroll`}>
      {/* <ScrollView style={tailwind`flex- overflow-scroll`}> */}
      <AppNavigator />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default App;
