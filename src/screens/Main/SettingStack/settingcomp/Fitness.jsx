import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import tailwind from 'twrnc';

const Fitness = ({navigation, setShowFitness}) => {
  //   const tailwind = useTailwind();
  const [goal, setGoal] = useState('Lose Weight');
  const [weight, setWeight] = useState('72');
  const [age, setAge] = useState('');

  const goals = ['Lose Weight', 'Gain Weight', 'Maintain My Current Weight'];
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lb'
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'feet'

  // Toggle between kg/lb
  const toggleWeightUnit = unit => {
    if (unit === 'lb' && weightUnit === 'kg') {
      setWeight(prev => (prev * 2.20462).toFixed(1)); // Convert kg to lb
    } else if (unit === 'kg' && weightUnit === 'lb') {
      setWeight(prev => (prev / 2.20462).toFixed(1)); // Convert lb to kg
    }
    setWeightUnit(unit);
  };

  return (
    <View style={tailwind`bg-white p-4`}>
      <TouchableOpacity onPress={() => setShowFitness(false)}>
        <Text style={tailwind`text-blue-500 mb-5`}>{'< '}Go Back</Text>
      </TouchableOpacity>
      <Text style={tailwind`text-lg font-bold mb-4`}>Your fitness goal</Text>
      <Text style={tailwind`text-sm text-gray-500 mb-4`}>
        What do you want to achieve?
      </Text>
      <View style={tailwind`gap-4 mb-6`}>
        {goals.map((g, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setGoal(g)}
            style={tailwind`px-4 py-2  w-content  rounded-lg mx-1 ${
              goal === g
                ? 'bg-[#DEECFD] text-[#007AFF] border[#007AFF]'
                : 'bg-white-100'
            }`}>
            <Text
              style={tailwind`text-sm ${
                goal === g ? 'text-[#007AFF]' : 'text-gray-600'
              }`}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={tailwind`text-sm text-gray-500 mb-2`}>
        Your target weight
      </Text>
      {/* <View style={tailwind`flex-row items-center mb-6 w-1/2`}>
        <TextInput
          style={tailwind`border p-2 w-1/2 rounded-lg flex-1 text-center`}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={tailwind`ml-2 text-gray-600`}>KG</Text>
        <Text style={tailwind`ml-2 text-gray-600`}>LB</Text>
      </View> */}
      <View style={tailwind`mb-5`}>
        {/* <Text style={tailwind`text-base mb-2`}>Your Weight</Text> */}
        <View style={tailwind`flex-row items-center`}>
          <TextInput
            style={tailwind`border border-gray-300 text-[25px] rounded-lg p-4 w-1/3 text-center`}
            placeholder="50"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <View style={tailwind`flex-row items-center ml-4`}>
            <TouchableOpacity onPress={() => toggleWeightUnit('kg')}>
              <Text
                style={tailwind`text-lg ${
                  weightUnit === 'kg'
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
                }`}>
                KG
              </Text>
            </TouchableOpacity>
            <Text style={tailwind`mx-2`}>|</Text>
            <TouchableOpacity onPress={() => toggleWeightUnit('lb')}>
              <Text
                style={tailwind`text-lg ${
                  weightUnit === 'lb'
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
                }`}>
                LB
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-base mb-2`}>Your Age</Text>
        <TextInput
          style={tailwind`border border-gray-300 text-[25px] rounded-lg p-4 mb-5 w-1/5`}
          placeholder="22"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View> */}
      {/* <Button
        title="Next"
        onPress={() => console.log('Fitness Goal Selected:', {goal, weight})}
        color="#1D4ED8"
      /> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DailyActivity');
        }}
        style={tailwind`bg-blue-500 py-4 rounded-lg mb-4`}>
        <Text style={tailwind`text-white text-center text-lg`}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fitness;
