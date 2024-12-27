// src/screens/EnterOTP.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import OTPInput from 'react-native-otp-input';
import tailwind from 'twrnc';

const EnterOTP = ({route, navigation}) => {
  // const {method, value} = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Verify OTP
    navigation.navigate('Gender');
    console.log('OTP Verified:', otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      {/* <OTPInput
        value={otp}
        onChange={setOtp}
        autoFocus
        placeholderCharacter="0"
        inputStyle={styles.otpInput}
        style={tailwind`h-[100px]`}
      /> */}
      <View style={tailwind`flex-row items-center mb-4`}>
        <Text style={tailwind`mr-2`}>Didn’t get an OTP?</Text>
        <TouchableOpacity
          style={tailwind``}
          onPress={() => navigation.navigate('EmailInput')}>
          <Text style={tailwind`text-[#0A84FF]`}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, justifyContent: 'start'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    height: 10,
  },
  button: {backgroundColor: '#007bff', padding: 15, borderRadius: 8},
  buttonText: {color: '#fff', textAlign: 'center', fontSize: 16},
});

export default EnterOTP;
