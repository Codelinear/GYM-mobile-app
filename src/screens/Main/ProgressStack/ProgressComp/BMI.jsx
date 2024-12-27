import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const BMI = ({navigation}) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('50'); // Default weight value
  const [height, setHeight] = useState('150'); // Default height value
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

  // Toggle between cm/feet
  const toggleHeightUnit = unit => {
    if (unit === 'feet' && heightUnit === 'cm') {
      setHeight(prev => (prev / 30.48).toFixed(1)); // Convert cm to feet
    } else if (unit === 'cm' && heightUnit === 'feet') {
      setHeight(prev => (prev * 30.48).toFixed(1)); // Convert feet to cm
    }
    setHeightUnit(unit);
  };

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

  return (
    <View style={tw`flex-1 p-5 bg-white`}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={tw`text-blue-500 mb-5`}>Go Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={tw`text-2xl font-bold mb-5`}>Let’s calculate your BMI</Text>

      {/* Input Fields */}
      {/* <View style={tw`mb-5`}>
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
      </View> */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-base mb-2`}>Your Weight</Text>
        <View style={tw`flex-row items-center`}>
          <TextInput
            style={tw`border border-gray-300 text-[25px] rounded-lg p-4 w-1/3 text-center`}
            placeholder="50"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <View style={tw`flex-row items-center ml-4`}>
            <TouchableOpacity onPress={() => toggleWeightUnit('kg')}>
              <Text
                style={tw`text-lg ${
                  weightUnit === 'kg'
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
                }`}>
                KG
              </Text>
            </TouchableOpacity>
            <Text style={tw`mx-2`}>|</Text>
            <TouchableOpacity onPress={() => toggleWeightUnit('lb')}>
              <Text
                style={tw`text-lg ${
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

      <View style={tw`mb-5`}>
        <Text style={tw`text-base mb-2`}>Your Height</Text>
        <View style={tw`flex-row items-center`}>
          <TextInput
            style={tw`border border-gray-300 text-[25px] rounded-lg p-4 w-1/3 text-center`}
            placeholder="150"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <View style={tw`flex-row ml-4 items-center`}>
            <TouchableOpacity onPress={() => toggleHeightUnit('cm')}>
              <Text
                style={tw`text-lg ${
                  heightUnit === 'cm'
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
                }`}>
                CM
              </Text>
            </TouchableOpacity>
            <Text style={tw`mx-2`}>|</Text>
            <TouchableOpacity onPress={() => toggleHeightUnit('feet')}>
              <Text
                style={tw`text-lg ${
                  heightUnit === 'feet'
                    ? 'text-blue-500 font-bold'
                    : 'text-gray-400'
                }`}>
                FEET
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View style={tw`mb-5`}>
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
      </View> */}

      {/* BMI Result */}
      {bmi && (
        <View style={tw`mb-5`}>
          <Text style={tw`text-base mb-2`}>
            BMI:{' '}
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
            }] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black`}
          />
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DailyActivity');
        }}
        style={tw`bg-blue-500 py-4 rounded-lg`}>
        <Text style={tw`text-white text-center text-lg`}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BMI;
