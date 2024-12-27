import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import tw from 'twrnc'; // Assuming you're using twrnc for Tailwind styling
import dayjs from 'dayjs';
import {RotateInDownLeft} from 'react-native-reanimated';
import axios from 'axios';
import img from '../HomeStackNavigator/assets/img.png'; // Ensure the image path is correct
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const CalendarView = ({route}) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [workout, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateDates = () => {
    const startDate = dayjs().subtract(5, 'day'); // Start from 5 days ago
    return Array.from({length: 15}, (_, i) =>
      startDate.add(i, 'day').format('YYYY-MM-DD'),
    ); // Generate 15 days of dates
  };

  const weekDates = generateDates();

  const flatListRef = useRef(null);

  useEffect(() => {
    // Fetch workouts for the initially selected date
    fetchData(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    // Scroll to today's date on mount
    const todayIndex = weekDates.findIndex(
      date => date === dayjs().format('YYYY-MM-DD'),
    );
    if (flatListRef.current && todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({animated: true, index: todayIndex});
      }, 100); // Delay ensures FlatList is rendered
    }
  });
  const navigation = useNavigation();
  const handleStartWorkout = workouts => {
    navigation.navigate('WorkoutScreen', {workouts});
  };

  const fetchData = async date => {
    setLoading(true);
    setSelectedDate(date);
    // console.log(date);
    try {
      // Make an API request to fetch workouts for the given date
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const response = await axios.get(
        `https://gym-backend-4kei.onrender.com/api/plan/${formattedDate}`,
      );
      // console.log(response.data);
      if (!response.status === 200) {
        throw new Error(`Error: ${response.status}`);
      }
      setWorkouts(response.data); // Update workouts state with the fetched data
      // console.log(response.data); // Update workouts state with the fetched data
    } catch (error) {
      console.error('Error fetching workouts:', error.message);
      setWorkouts([]); // Reset workouts in case of an error
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <View style={tw`p-4`}>
        <Text style={tw`text-[22px] font-bold mb-4`}>Your Workouts</Text>
        <FlatList
          horizontal
          ref={flatListRef}
          data={weekDates}
          keyExtractor={item => item}
          renderItem={({item}) => {
            const isSelected = item === selectedDate;
            const isFuture = dayjs(item).isAfter(dayjs(), 'day');
            const isToday = item === dayjs().format('YYYY-MM-DD');

            return (
              <TouchableOpacity
                // disabled={isFuture}
                onPress={() => fetchData(item)}>
                <Text
                  style={tw.style(
                    'p-4 rounded-full mx-1',
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : isToday
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100',
                    isFuture && 'opacity-50',
                  )}>
                  {dayjs(item).format('DD')}
                </Text>
                <Text style={tw`text-center text-sm`}>
                  {dayjs(item).format('ddd')}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={tw`flex-row`}
          showsHorizontalScrollIndicator={false}
        />

        <ScrollView style={tw`mt-4`}>
          {loading ? (
            <Text style={tw`text-center text-gray-500`}>
              Loading workouts...
            </Text>
          ) : workout?.length > 0 ? (
            workout?.map((item, index) => (
              <View key={index} style={tw`bg-[#fff] p-2 w-[330px]`}>
                <View key={index} style={tw`bg-[#F4F4F4] p-4 w-[350px]`}>
                  <Text style={tw`text-[30px]`}>{item.name}</Text>

                  <View
                    style={tw`flex-row gap-3 mt-2 items-start justify-start`}>
                    <View
                      style={tw` flex-row items-center justify-center gap-2`}>
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
                      style={tw`flex-row items-center justify-center gap-2`}>
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
                  <Text style={tw`my-2`}>{item.difficulty}</Text>
                  <Text style={tw`my-2`}>{item.date}</Text>
                  <TouchableOpacity
                    onPress={() => handleStartWorkout(item.workouts)}
                    style={tw` bg-[#007AFF] px-4 py-2 mt-2 rounded`}>
                    <Text style={tw`text-white text-center`}>
                      Start Workout
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={tw`mt-4 bg-[#fff]`}>
                  {item.workouts.map((work, idx) => (
                    <View
                      key={idx}
                      style={tw`p-2 border-b border-gray-300 flex-row justify-between`}>
                      <View>
                        <Text style={tw`font-semibold`}>{work.name}</Text>
                        <Text style={tw`text-gray-500`}>
                          {work.reps} Reps | {work.sets} Sets
                        </Text>
                        {/* <Text style={tw`text-gray-500`}>{work.video}</Text> */}
                      </View>
                      <TouchableOpacity
                        onPress={() => setShowInstructions(true)}
                        style={tw`w-8 h-8 border rounded-full items-center justify-center`}>
                        <Text style={tw`text-gray-800 font-bold`}>i</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            ))
          ) : (
            <Text style={tw`text-center text-gray-500`}>
              No workouts available for {selectedDate}.
            </Text>
          )}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showInstructions}
          onRequestClose={() => setShowInstructions(false)}>
          <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-5 rounded-t-xl`}>
              <Image
                style={tw`w-[390px] h-[250px] mb-8`}
                source={img} // Use direct import for local images
              />
              <Text style={tw`text-[24px] font-bold mb-3`}>Instructions</Text>
              <Text style={tw`text-[16px] mb-5`}>
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
                style={tw`bg-[#007AFF] px-4 py-4 mb-4 rounded`}
                onPress={() => setShowInstructions(false)}>
                <Text style={tw`text-white text-center`}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CalendarView;
