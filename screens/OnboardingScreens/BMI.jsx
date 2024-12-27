import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';

const BMICalculator = ({navigation}) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    if (weight && height) {
      const bmiValue = (
        parseFloat(weight) /
        (parseFloat(height) / 100) ** 2
      ).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setHealthStatus('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setHealthStatus('Healthy');
      } else {
        setHealthStatus('Overweight');
      }
    } else {
      setBmi(null);
      setHealthStatus('');
    }
  }, [weight, height]);
  const [unitWeight, setUnitWeight] = useState('kg');
  const [unitHeight, setUnitHeight] = useState('cm');

  const handleSubmit = async values => {
    try {
      const convertedWeight =
        unitWeight === 'lb'
          ? (parseFloat(values.weight) * 0.453592).toFixed(2)
          : values.weight;
      const convertedHeight =
        unitHeight === 'feet'
          ? (parseFloat(values.height) * 30.48).toFixed(2)
          : values.height;

      const payload = {
        age: age,
        weight: weight,
        height: height,
        bmi: bmi,
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      const response = await axios.put(
        'https://gym-backend-4kei.onrender.com/api/AppUser/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert('Success', 'Data submitted successfully!');
      console.log('Response:', response.data);
      navigation.navigate('DailyActivity');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit data.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={tw`flex-1 p-5 bg-white`}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={tw`text-blue-500 mb-5`}>Go Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={tw`text-2xl font-bold mb-5`}>Let’s calculate your BMI</Text>

      {/* Input Fields */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-base mb-2`}>Your Age</Text>
        <TextInput
          style={tw`border border-gray-300 text-[25px] rounded-lg p-4 mb-5 w-1/5`}
          placeholder="22"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-base mb-2`}>Your Weight</Text>
        <View style={tw`flex-row items-center`}>
          <TextInput
            style={tw`border border-gray-300 text-[25px] rounded-lg p-4 mb-5 w-1/5`}
            placeholder="50"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <Text style={tw`ml-2 text-blue-500`}>KG</Text>
          <Text style={tw`ml-2 text-gray-400`}>LB</Text>
        </View>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-base mb-2`}>Your Height</Text>
        <View style={tw`flex-row items-center`}>
          <TextInput
            style={tw`border border-gray-300 text-[25px] rounded-lg p-4 mb-5 w-1/4`}
            placeholder="150"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <Text style={tw`ml-2 text-blue-500`}>CM</Text>
          <Text style={tw`ml-2 text-gray-400`}>FEET</Text>
        </View>
      </View>

      {/* BMI Result */}
      {bmi && (
        <View style={tw`mb-5`}>
          <Text style={tw`text-base mb-2`}>
            BMI: {bmi}{' '}
            <Text
              style={tw`font-bold ${
                healthStatus === 'Healthy'
                  ? 'text-green-500'
                  : healthStatus === 'Underweight'
                  ? 'text-blue-500'
                  : 'text-red-500'
              }`}>
              {healthStatus}
            </Text>
          </Text>
          <View style={tw`flex-row items-center`}>
            <View style={tw`h-2 flex-1 bg-blue-500 rounded-l-lg`} />
            <View style={tw`h-2 flex-1 bg-green-500`} />
            <View style={tw`h-2 flex-1 bg-red-500 rounded-r-lg`} />
          </View>
          <View
            style={tw`absolute left-[${
              bmi < 18.5 ? '10%' : bmi >= 18.5 && bmi < 24.9 ? '50%' : '90%'
            }] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 top-4 transform rotate-45 border-b-black`}
          />
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('DailyActivity');
        // }}
        onPress={handleSubmit}
        style={tw`bg-blue-500 py-4 rounded-lg`}>
        <Text style={tw`text-white text-center text-lg`}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BMICalculator;

// import React, {useState, useEffect} from 'react';
// import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
// import tw from 'twrnc';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BMICalculator = ({navigation}) => {
//   const [unitWeight, setUnitWeight] = useState('kg');
//   const [unitHeight, setUnitHeight] = useState('cm');

//   const handleSubmit = async values => {
//     try {
//       const convertedWeight =
//         unitWeight === 'lb'
//           ? (parseFloat(values.weight) * 0.453592).toFixed(2)
//           : values.weight;
//       const convertedHeight =
//         unitHeight === 'feet'
//           ? (parseFloat(values.height) * 30.48).toFixed(2)
//           : values.height;

//       const payload = {
//         age: values.age,
//         weight: `${convertedWeight} ${unitWeight}`,
//         height: `${convertedHeight} ${unitHeight}`,
//       };

//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'User not authenticated');
//         return;
//       }
//       const response = await axios.put(
//         'http://localhost:8000/api/AppUser/add',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       Alert.alert('Success', 'Data submitted successfully!');
//       console.log('Response:', response.data);
//       navigation.navigate('DailyActivity');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit data.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <View style={tw`flex-1 p-5 bg-white`}>
//       {/* Header */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={tw`text-blue-500 mb-5`}>Go Back</Text>
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={tw`text-2xl font-bold mb-5`}>Let’s calculate your BMI</Text>

//       <Formik
//         initialValues={{age: '', weight: '', height: ''}}
//         validationSchema={Yup.object({
//           age: Yup.number()
//             .required('Age is required')
//             .min(1, 'Age must be at least 1'),
//           weight: Yup.number()
//             .required('Weight is required')
//             .min(1, 'Weight must be at least 1'),
//           height: Yup.number()
//             .required('Height is required')
//             .min(1, 'Height must be at least 1'),
//         })}
//         onSubmit={handleSubmit}>
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           setFieldValue,
//         }) => (
//           <>
//             {/* Age Input */}
//             <View style={tw`mb-5`}>
//               <Text style={tw`text-base mb-2`}>Your Age</Text>
//               <TextInput
//                 style={tw`border border-gray-300 text-[25px] w-1/5 rounded-lg p-4 mb-2`}
//                 placeholder="22"
//                 keyboardType="numeric"
//                 value={values.age}
//                 onChangeText={handleChange('age')}
//                 onBlur={handleBlur('age')}
//               />
//               {touched.age && errors.age && (
//                 <Text style={tw`text-red-500 text-sm`}>{errors.age}</Text>
//               )}
//             </View>

//             {/* Weight Input */}
//             <View style={tw`mb-5`}>
//               <Text style={tw`text-base mb-2`}>Your Weight</Text>
//               <View style={tw`flex-row items-center`}>
//                 <TextInput
//                   style={tw`border border-gray-300 text-[25px] rounded-lg p-4 mb-2 w-1/5`}
//                   placeholder="50"
//                   keyboardType="numeric"
//                   value={values.weight}
//                   onChangeText={handleChange('weight')}
//                   onBlur={handleBlur('weight')}
//                 />
//                 <TouchableOpacity onPress={() => setUnitWeight('kg')}>
//                   <Text
//                     style={tw`${
//                       unitWeight === 'kg' ? 'text-blue-500' : 'text-gray-400'
//                     } ml-2`}>
//                     KG
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setUnitWeight('lb')}>
//                   <Text
//                     style={tw`${
//                       unitWeight === 'lb' ? 'text-blue-500' : 'text-gray-400'
//                     } ml-2`}>
//                     LB
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               {touched.weight && errors.weight && (
//                 <Text style={tw`text-red-500 text-sm`}>{errors.weight}</Text>
//               )}
//             </View>

//             {/* Height Input */}
//             <View style={tw`mb-5`}>
//               <Text style={tw`text-base mb-2`}>Your Height</Text>
//               <View style={tw`flex-row items-center`}>
//                 <TextInput
//                   style={tw`border border-gray-300 text-[25px] rounded-lg p-4 mb-2 w-1/4`}
//                   placeholder="150"
//                   keyboardType="numeric"
//                   value={values.height}
//                   onChangeText={handleChange('height')}
//                   onBlur={handleBlur('height')}
//                 />
//                 <TouchableOpacity onPress={() => setUnitHeight('cm')}>
//                   <Text
//                     style={tw`${
//                       unitHeight === 'cm' ? 'text-blue-500' : 'text-gray-400'
//                     } ml-2`}>
//                     CM
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setUnitHeight('feet')}>
//                   <Text
//                     style={tw`${
//                       unitHeight === 'feet' ? 'text-blue-500' : 'text-gray-400'
//                     } ml-2`}>
//                     FEET
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               {touched.height && errors.height && (
//                 <Text style={tw`text-red-500 text-sm`}>{errors.height}</Text>
//               )}
//             </View>

//             {/* NEXT Button */}
//             <TouchableOpacity
//               onPress={handleSubmit}
//               style={tw`bg-blue-500 py-4 rounded-lg`}>
//               <Text style={tw`text-white text-center text-lg`}>Next</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// export default BMICalculator;
