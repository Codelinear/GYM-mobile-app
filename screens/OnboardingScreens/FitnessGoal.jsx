// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, TextInput, Button} from 'react-native';
// import tailwind from 'twrnc';

// const FitnessGoal = navigation => {
//   //   const tailwind = useTailwind();
//   const [goal, setGoal] = useState('Lose Weight');
//   const [weight, setWeight] = useState('72');
//   const [age, setAge] = useState('');

//   const goals = ['Lose Weight', 'Gain Weight', 'Maintain My Current Weight'];

//   return (
//     <View style={tailwind`flex-1 bg-white p-4`}>
//       <Text style={tailwind`text-lg font-bold mb-4`}>Your fitness goal</Text>
//       <Text style={tailwind`text-sm text-gray-500 mb-4`}>
//         What do you want to achieve?
//       </Text>
//       <View style={tailwind`flexrow w1/2 gap-4 mb-6`}>
//         {goals.map((g, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setGoal(g)}
//             style={tailwind`px-4 py-2 border w-content  rounded-lg mx-1 ${
//               goal === g
//                 ? 'bg-blue-500 border-blue-500'
//                 : 'border-gray-300 bg-gray-100'
//             }`}>
//             <Text
//               style={tailwind`text-sm ${
//                 goal === g ? 'text-white' : 'text-gray-600'
//               }`}>
//               {g}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text style={tailwind`text-sm text-gray-500 mb-2`}>
//         Your target weight
//       </Text>
//       <View style={tailwind`flex-row items-center mb-6 w-1/2`}>
//         <TextInput
//           style={tailwind`border p-2 w-1/2 rounded-lg flex-1 text-center`}
//           keyboardType="numeric"
//           value={weight}
//           onChangeText={setWeight}
//         />
//         <Text style={tailwind`ml-2 text-gray-600`}>KG</Text>
//         <Text style={tailwind`ml-2 text-gray-600`}>LB</Text>
//       </View>

//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('DailyActivity');
//         }}
//         style={tailwind`bg-blue-500 py-4 rounded-lg`}>
//         <Text style={tailwind`text-white text-center text-lg`}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default FitnessGoal;

import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import tailwind from 'twrnc';
import {Formik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FitnessGoal = ({navigation}) => {
  const goals = ['Lose Weight', 'Gain Weight', 'Maintain My Current Weight'];

  // Validation Schema
  const validationSchema = Yup.object({
    goal: Yup.string().required('Please select a fitness goal.'),
    targetweight: Yup.number()
      .typeError('Weight must be a number.')
      .required('Please enter your target weight.')
      .min(1, 'Weight must be greater than 0.'),
  });

  const handleSubmit = async values => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      const response = await axios.put(
        'https://gym-backend-4kei.onrender.com/api/AppUser/add',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success', 'Fitness goal saved successfully!');
      navigation.navigate('GymAccess');
    } catch (error) {
      console.error('Error saving fitness goal:', error);
      Alert.alert('Error', 'Failed to save fitness goal.');
    }
  };

  return (
    <View style={tailwind`flex-1 bg-white p-4`}>
      <Text style={tailwind`text-lg font-bold mb-4`}>Your Fitness Goal</Text>
      <Text style={tailwind`text-sm text-gray-500 mb-4`}>
        What do you want to achieve?
      </Text>
      <Formik
        initialValues={{goal: 'Lose Weight', targetweight: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            {/* Goals Selection */}
            <View style={tailwind`flex-row flex-wrap gap-4 mb-6`}>
              {goals.map((g, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setFieldValue('goal', g)}
                  style={tailwind`px-4 py-2 border rounded-lg ${
                    values.goal === g
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 bg-gray-100'
                  }`}>
                  <Text
                    style={tailwind`text-sm ${
                      values.goal === g ? 'text-white' : 'text-gray-600'
                    }`}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {touched.goal && errors.goal && (
              <Text style={tailwind`text-red-500 text-sm mb-4`}>
                {errors.goal}
              </Text>
            )}

            {/* Target Weight */}
            <Text style={tailwind`text-sm text-gray-500 mb-2`}>
              Your Target Weight
            </Text>
            <View style={tailwind`flex-row items-center mb-6`}>
              <TextInput
                style={tailwind`border p-2 w-1/5 rounded-lg text-center`}
                keyboardType="numeric"
                value={values.targetweight}
                onChangeText={handleChange('targetweight')}
              />
              <Text style={tailwind`ml-2 text-gray-600`}>KG</Text>
            </View>
            {touched.weight && errors.weight && (
              <Text style={tailwind`text-red-500 text-sm mb-4`}>
                {errors.weight}
              </Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={tailwind`bg-blue-500 py-4 rounded-lg mt-5 ${
                (!values.goal || !values.targetweight) && 'opacity-50'
              }`}
              disabled={!values.goal || !values.targetweight}>
              <Text style={tailwind`text-white text-center text-lg`}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default FitnessGoal;
