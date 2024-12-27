import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wellcome from '../../../screens/Wellcome';
import SignUpPhone from '../../../screens/SignUpPhone';
import EnterOTP from '../../../screens/EnterOTP';
import EmailInput from '../../../screens/signupscreen/EmailInput';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
    <Stack.Screen name="Otp" component={OtpScreen} />
    <Stack.Screen name="Success" component={SuccessScreen} /> */}
    <Stack.Screen name="Wellcome" component={Wellcome} />
    <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
    <Stack.Screen name="EnterOTP" component={EnterOTP} />
    <Stack.Screen name="EmailInput" component={EmailInput} />
  </Stack.Navigator>
);

export default AuthStack;
