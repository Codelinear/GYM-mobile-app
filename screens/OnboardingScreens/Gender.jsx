import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gender = ({navigation}) => {
  const handleSubmit = async values => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const response = await axios.put(
        'https://gym-backend-4kei.onrender.com/api/AppUser/add',
        {
          name: values.name,
          gender: values.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Success', 'Data submitted successfully!');
      console.log('Response:', response.data);
      navigation.navigate('BMI');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit data.');
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={tw`flex-1 p-5`}>
      <Text style={tw`text-4xl font-bold mb-5 w-75`}>
        Let’s get you onboard
      </Text>

      <Formik
        initialValues={{name: '', gender: ''}}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          gender: Yup.string().required('Gender is required'),
        })}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {/* Name Input */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-base mb-4`}>Your Name</Text>
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 mb-2`}
                placeholder="Enter your name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && (
                <Text style={tw`text-red-500 text-sm`}>{errors.name}</Text>
              )}
            </View>

            {/* Gender Selection */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-base mb-4`}>Your Gender</Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`flex-1 py-3 rounded-lg items-center border mr-2 ${
                    values.gender === 'Male'
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onPress={() => setFieldValue('gender', 'Male')}>
                  <Text
                    style={tw`${
                      values.gender === 'Male'
                        ? 'text-blue-500 font-bold'
                        : 'text-gray-800'
                    }`}>
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`flex-1 py-3 rounded-lg items-center border ${
                    values.gender === 'Female'
                      ? 'bg-blue-100 border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onPress={() => setFieldValue('gender', 'Female')}>
                  <Text
                    style={tw`${
                      values.gender === 'Female'
                        ? 'text-blue-500 font-bold'
                        : 'text-gray-800'
                    }`}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
              {touched.gender && errors.gender && (
                <Text style={tw`text-red-500 text-sm`}>{errors.gender}</Text>
              )}
            </View>

            {/* NEXT Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`bg-blue-500 py-4 rounded-lg`}>
              <Text style={tw`text-white text-center text-lg`}>NEXT</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Gender;
