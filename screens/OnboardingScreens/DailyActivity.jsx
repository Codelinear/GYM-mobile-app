// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, ScrollView, Button} from 'react-native';
// import tailwind from 'twrnc';

// const DailyActivity = ({navigation}) => {
//   //   const tailwind = useTailwind();
//   const [selected, setSelected] = useState(null);

//   const options = [
//     {label: 'Mostly Sitting', description: 'Seated work, very low movement.'},
//     {
//       label: 'Often Standing',
//       description: 'Standing work, occasional walking.',
//     },
//     {
//       label: 'Regularly Walking',
//       description: 'Frequent walking, steady activity.',
//     },
//     {
//       label: 'Physically Intense Work',
//       description: 'Heavy labor, high exertion.',
//     },
//   ];

//   return (
//     <View style={tailwind`flex-1 bg-white p-4`}>
//       <Text style={tailwind`text-lg font-bold mb-4`}>
//         What describes your daily activity?
//       </Text>
//       <ScrollView>
//         {options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setSelected(option.label)}
//             style={tailwind`p-4 border rounded-lg mb-3 ${
//               selected === option.label
//                 ? 'border-blue-500 bg-blue-50'
//                 : 'border-gray-300'
//             }`}>
//             <Text style={tailwind`text-lg font-semibold`}>{option.label}</Text>
//             <Text style={tailwind`text-sm text-gray-500`}>
//               {option.description}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <Button
//         title="Next"
//         onPress={() => navigation.navigate('FitnessGoal')}
//         disabled={!selected}
//         style={tailwind`bg-blue-500 py-4 rounded-lg`}
//         // color={selected ? '#1D4ED8' : '#A5B4FC'}
//       />
//     </View>
//   );
// };

// export default DailyActivity;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import axios from 'axios';
import tailwind from 'twrnc';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyActivity = ({navigation}) => {
  const options = [
    {label: 'Mostly Sitting', description: 'Seated work, very low movement.'},
    {
      label: 'Often Standing',
      description: 'Standing work, occasional walking.',
    },
    {
      label: 'Regularly Walking',
      description: 'Frequent walking, steady activity.',
    },
    {
      label: 'Physically Intense Work',
      description: 'Heavy labor, high exertion.',
    },
  ];

  const handleSubmit = async values => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      const payload = {activity: values.selectedActivity};
      const response = await axios.put(
        'https://gym-backend-4kei.onrender.com/api/AppUser/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success', 'Activity saved successfully!');
      navigation.navigate('FitnessGoal');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving activity:', error.message);
      Alert.alert('Error', 'Failed to save activity.');
    }
  };

  return (
    <View style={tailwind`flex-1 bg-white p-4`}>
      <Text style={tailwind`text-lg font-bold mb-4`}>
        What describes your daily activity?
      </Text>
      <Formik
        initialValues={{selectedActivity: ''}}
        validationSchema={Yup.object({
          selectedActivity: Yup.string().required('Please select an activity.'),
        })}
        onSubmit={handleSubmit}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChange('selectedActivity')(option.label)}
                  style={tailwind`p-4 border rounded-lg mb-3 ${
                    values.selectedActivity === option.label
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}>
                  <Text style={tailwind`text-lg font-semibold`}>
                    {option.label}
                  </Text>
                  <Text style={tailwind`text-sm text-gray-500`}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {touched.selectedActivity && errors.selectedActivity && (
              <Text style={tailwind`text-red-500 text-sm mt-2`}>
                {errors.selectedActivity}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={tailwind`bg-blue-500 py-4 rounded-lg mt-5 ${
                !values.selectedActivity && 'opacity-50'
              }`}
              disabled={!values.selectedActivity}>
              <Text style={tailwind`text-white text-center text-lg`}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default DailyActivity;
