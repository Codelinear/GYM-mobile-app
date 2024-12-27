import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import tw from 'twrnc';
import img from './assets/img.png'; // Ensure the image path is correct
import AsyncStorage from '@react-native-async-storage/async-storage';

const Finish = ({navigation}) => {
  const handleSendCodee = () => {
    // Implement phone validation and API integration
    AsyncStorage.setItem('onboard', 'onboard');
    // navigation.navigate('SignUpPhone');
  };
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      {/* Display the Image */}
      <Image style={tw`w-[400px] h-[400px] mb-8`} source={img} />

      <TouchableOpacity
        style={tw`bg-blue-500 rounded-md px-6 py-3`}
        onPress={handleSendCodee}>
        <Text style={tw`text-white text-center w-[200px] text-lg font-bold`}>
          Finish
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Finish;
