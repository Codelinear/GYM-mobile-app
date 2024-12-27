import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'twrnc';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import img from '../HomeStackNavigator/assets/img.png'; // Ensure the image path is correct
import CalendarView from './CalendarView';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  //   useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        // 'https://gym-backend-iw37.onrender.com/api/plan',
        'https://gym-backend-4kei.onrender.com/api/plan',
      );
      setData(res.data); // Set the fetched data
      // console.log(res.data); // Correctly log the data
    } catch (err) {
      console.log(err); // Log the error if any
    }
  };

  fetchData();
  //   }, []);
  const handleStartWorkout = workouts => {
    navigation.navigate('WorkoutScreen', {workouts});
  };
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <ScrollView style={tailwind`flex-1`}>
        <View
          style={tailwind`flex-1 items-center bg-white pt-10 overflow-scroll h[200px] `}>
          {/* <Text style={tailwind`mb-3 text-left text-[30px]`}>Your Workouts</Text> */}
          <CalendarView />
          {/* {data?.reverse().map((item, index) => (
            <View key={index} style={tailwind`hfull relative overflow-y-auto`}>
              <View key={index} style={tailwind`bg-[#F4F4F4] p-4 w-[350px]`}>
                <Text style={tailwind`text-[30px]`}>{item.name}</Text>

                <View
                  style={tailwind`flex-row gap-3 mt-2 items-start justify-start`}>
                  <View
                    style={tailwind` flex-row items-center justify-center gap-2`}>
                    <View>
                      <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <Path
                          d="M20.3598 13.3948C20.3598 18.9662 16.1812 21.7519 12.0027 21.7519C7.82406 21.7519 3.64551 18.9662 3.64551 13.3948C3.64551 9.21623 5.73479 7.12694 7.12765 6.43051C7.12765 8.5198 7.82408 9.91266 8.52051 10.6091C12.6991 9.21623 13.3955 5.03766 13.3955 2.25194C16.1812 4.34123 20.3598 7.82337 20.3598 13.3948Z"
                          stroke="black"
                          strokeWidth="1.71429"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                    <Text>{item.calories}</Text>
                  </View>
                  <View
                    style={tailwind`flex-row items-center justify-center gap-2`}>
                    <Svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <G clip-path="url(#clip0_78_2437)">
                        <Path
                          d="M12.0003 22.3469C17.7148 22.3469 22.3472 17.7145 22.3472 12C22.3472 6.28554 17.7148 1.65306 12.0003 1.65306C6.2858 1.65306 1.65332 6.28554 1.65332 12C1.65332 17.7145 6.2858 22.3469 12.0003 22.3469Z"
                          stroke="black"
                          stroke-width="1.71429"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <Path
                          d="M12 8.02041V12L16.0433 16.7118"
                          stroke="black"
                          stroke-width="1.71429"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_78_2437">
                          <Rect width="24" height="24" fill="white" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                    <Text>{item.duration}</Text>
                  </View>
                </View>
                <Text style={tailwind`my-2`}>{item.difficulty}</Text>
                <Text style={tailwind`my-2`}>{item.date}</Text>
                <TouchableOpacity
                  onPress={() => handleStartWorkout(item.workouts)}
                  style={tailwind` bg-[#007AFF] px-4 py-2 mt-2 rounded`}>
                  <Text style={tailwind`text-white text-center`}>
                    Start Workout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={tailwind`py-5`}>
                {item.workouts.map((work, indexx) => (
                  <View
                    key={indexx}
                    style={tailwind`w-full max-w-[300px]  mx-auto border-b border-[#00000050]`}>
                    <View
                      style={tailwind`w-full flex-row justify-between my-1`}>
                      <View
                        style={tailwind`w-full flexrow justify-between my-1`}>
                        <Text style={tailwind`text-[20px]`}>{work.name}</Text>
                        <View style={tailwind`text-[#000] opacity-70`}>
                          <Text>{work.reps} Reps</Text>
                          <Text>{work.sets} Sets</Text>
                          <Text>{work.video} </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={tailwind`bg-[#fff] h-8 w-8  border rounded-full`}
                        onPress={() => setShowInstructions(true)}>
                        <Text
                          style={tailwind`absolute top-1 left-3 text-[#000] text-[20px] font-bold`}>
                          i
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))} */}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showInstructions}
          onRequestClose={() => setShowInstructions(false)}>
          <View style={tailwind`flex-1 justify-end bg-black bg-opacity-50`}>
            <View style={tailwind`bg-white p-5 rounded-t-xl`}>
              <Image
                style={tailwind`w-[390px] h-[250px] mb-8`}
                source={img} // Use direct import for local images
              />
              <Text style={tailwind`text-[24px] font-bold mb-3`}>
                Instructions
              </Text>
              <Text style={tailwind`text-[16px] mb-5`}>
                {/* - Warm up before starting the workout. */}
                {'\n'}
                1. Using a pronated grip, grasp the pull bar with a slightly
                wider than shoulder width grip.
                {'\n'} {'\n'}2. Take a deep breath, squeeze your glutes and
                brace your abs. Depress the shoulder blades and then drive the
                elbows straight down to the floor while activating the lats.
                {'\n'} {'\n'}3.Pull your chin towards the bar until the lats are
                fully contracted, then slowly lower yourself back to the start
                position.
              </Text>
              <TouchableOpacity
                style={tailwind`bg-[#007AFF] px-4 py-4 mb-4 rounded`}
                onPress={() => setShowInstructions(false)}>
                <Text style={tailwind`text-white text-center`}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default Home;
