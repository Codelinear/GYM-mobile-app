import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import tw from 'twrnc';
import img from './assets/img.png'; // Ensure the image path is correct

const Wellcome = ({navigation}) => {
  const handleSendCodee = () => {
    // Implement phone validation and API integration
    navigation.navigate('SignUpPhone');
  };
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      {/* Display the Image */}
      <Image
        style={tw`w-[400px] h-[400px] mb-8`}
        source={img} // Use direct import for local images
      />

      <TouchableOpacity
        style={tw`bg-blue-500 rounded-md px-6 py-3`}
        onPress={handleSendCodee}>
        <Text style={tw`text-white text-center w-[200px] text-lg font-bold`}>
          Get started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Wellcome;
