import axios from 'axios';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import tailwind from 'twrnc';

const Discover = ({navigation}) => {
  const [data, setData] = useState([]);
  //   useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://gym-backend-iw37.onrender.com/api/plan',
      );
      setData(res.data); // Set the fetched data
    } catch (err) {
      console.log(err); // Log the error if any
    }
  };

  fetchData();

  const handleStartWorkout = item => {
    navigation.navigate('Workoutss', {item});
  };
  return (
    <ScrollView>
      <View style={tailwind`p-3 overflow-scroll`}>
        <Text style={tailwind`text-[30px] font-bold `}>Discover Workouts</Text>

        <Text style={tailwind`text-[20px] mt-4 font-bold `}>Chest</Text>
        {data.reverse().map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => handleStartWorkout(item)}
              style={tailwind`p-6 bg-[#F2F8FF] m-3`}>
              <Text style={tailwind`text-[20px] font-semibold`}>
                {item.name}
              </Text>
              <View style={tailwind`flex-row gap-3`}>
                <View style={tailwind`flex-row gap-1 my-3`}>
                  <Svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                      stroke="#007AFF"
                      stroke-width="1.14286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text>{item.calories} Kcal</Text>
                </View>
                <View style={tailwind`flex-row gap-1 my-3`}>
                  <Svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                      stroke="#007AFF"
                      stroke-width="1.14286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text>{item.duration} mins</Text>
                </View>
                <View style={tailwind`flex-row gap-1 my-3`}>
                  <Svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                      stroke="#007AFF"
                      stroke-width="1.14286"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                  <Text>{item.difficulty}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={tailwind`p-3 overflow-scroll`}>
        <Text style={tailwind`text-[20px] mt-4 font-bold `}>Lats and Back</Text>
        {data.reverse().map((item, index) => (
          <View
            onPress={() => handleStartWorkout(item)}
            key={index}
            style={tailwind`p-6 bg-[#F2F8FF] m-3`}>
            <Text style={tailwind`text-[20px] font-semibold`}>{item.name}</Text>
            <View style={tailwind`flex-row gap-3`}>
              <View style={tailwind`flex-row gap-1 my-3`}>
                <Svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                    stroke="#007AFF"
                    stroke-width="1.14286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
                <Text>{item.reps} Kcal</Text>
              </View>
              <View style={tailwind`flex-row gap-1 my-3`}>
                <Svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                    stroke="#007AFF"
                    stroke-width="1.14286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
                <Text>{item.sets} mins</Text>
              </View>
              <View style={tailwind`flex-row gap-1 my-3`}>
                <Svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.5745 9.42987C13.5745 13.1441 10.7888 15.0013 8.00307 15.0013C5.21734 15.0013 2.43164 13.1441 2.43164 9.42987C2.43164 6.64415 3.8245 5.2513 4.75307 4.78701C4.75307 6.17987 5.21735 7.10844 5.68164 7.57272C8.46735 6.64415 8.93164 3.85844 8.93164 2.0013C10.7888 3.39415 13.5745 5.71558 13.5745 9.42987Z"
                    stroke="#007AFF"
                    stroke-width="1.14286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
                <Text>{item.equipment}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Discover;
