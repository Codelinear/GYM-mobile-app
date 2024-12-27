import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import dayjs from 'dayjs';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const Session = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(); // Example date
  const [streakDays, setStreakDays] = useState([
    '2024-12-09',
    '2024-12-08',
    '2024-12-07',
  ]); // Example streak days
  const [rating, setRating] = useState(0);

  const generateDates = () => {
    const startDate = dayjs().subtract(5, 'day'); // Start from 2 weeks ago
    return Array.from(
      {length: 15},
      (_, i) => startDate.add(i, 'day').format('YYYY-MM-DD'), // Generate dates for 3 weeks (past 2 weeks + current week)
    );
  };
  const weekDates = generateDates();

  //   const weekDates = generateWeekDates();

  const flatListRef = useRef(null);
  useEffect(() => {
    const todayIndex = weekDates.findIndex(
      date => date === dayjs().format('YYYY-MM-DD'),
    );
    if (flatListRef.current && todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: todayIndex,
        });
      }, 100); // Delay to ensure FlatList is rendered
    }
  }, [weekDates]);
  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      {/* Today's Session */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-bold mb-2`}>Today's Session.</Text>
        <View
          style={tw`flex-row items-start text-[50px] justify-between flex-col`}>
          <View style={tw`flex-row items-center`}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M20.3598 13.3948C20.3598 18.9662 16.1812 21.7519 12.0027 21.7519C7.82406 21.7519 3.64551 18.9662 3.64551 13.3948C3.64551 9.21623 5.73479 7.12694 7.12765 6.43051C7.12765 8.5198 7.82408 9.91266 8.52051 10.6091C12.6991 9.21623 13.3955 5.03766 13.3955 2.25194C16.1812 4.34123 20.3598 7.82337 20.3598 13.3948Z"
                stroke="black"
                strokeWidth="1.71429"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={tw`ml-2 text-[50px]`}>200 kCal</Text>
          </View>
          <View style={tw`flex-row items-center`}>
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
            <Text style={tw`ml-2 text-[50px]`}>40 mins</Text>
          </View>
        </View>
      </View>

      {/* Streak */}
      <View style={tw`my-6`}>
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <Text style={tw`text-lg font-bold`}>4 day streak!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
            <Text style={tw`text-blue-500`}>View Progress</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          ref={flatListRef}
          data={weekDates}
          keyExtractor={item => item}
          renderItem={({item}) => {
            const isSelected = item === selectedDate;
            const isStreak = streakDays.includes(item);
            const isFuture = dayjs(item).isAfter(dayjs(), 'day');
            const isToday = item === dayjs().format('YYYY-MM-DD'); // Check if it's today's date

            return (
              <TouchableOpacity
                disabled={isFuture}
                onPress={() => setSelectedDate(item)}>
                <Text
                  // style={tw.style(
                  //   'text-center font-bold',
                  //   isSelected ? 'text-white' : 'text-black',
                  // )}
                  style={tw.style(
                    'p-4 rounded-full mx-1',
                    //   isSelected
                    //     ? 'bg-blue-700 text-[#fff]'
                    //     : isStreak
                    //     ? 'bg-blue-300 '
                    //     : 'bg-gray-100',
                    isSelected
                      ? 'bg-blue-700'
                      : isToday
                      ? 'bg-green-500'
                      : isStreak
                      ? 'bg-blue-300'
                      : 'bg-gray-100',
                    isFuture && 'opacity-80',
                  )}>
                  {dayjs(item).format('DD')}
                </Text>
                <Text
                  style={tw.style(
                    'text-center text-sm',
                    isSelected
                      ? 'text-[#007AFF] '
                      : isStreak
                      ? ' text-[#007AFF]'
                      : 'text[#007AFF]',
                    '',
                  )}>
                  {dayjs(item).format('ddd')}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={tw`flex-row`}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* How Was It? */}
      <View style={tw`mb-10`}>
        <View style={tw`text-lg font-bold mb-2 flex-row items-center gap-2`}>
          <Svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M16.75 1.72003V11.72H25.75L12.75 27.72V17.72H3.75L16.75 1.72003Z"
              fill="#FFCC00"
            />
          </Svg>
          <Text>How was it?</Text>
        </View>
        <View style={tw`flex-row justify-between`}>
          {[1, 2, 3, 4, 5].map(value => (
            <TouchableOpacity key={value} onPress={() => setRating(value)}>
              {/* <Icon
                name="star"
                size={32}
                style={tw.style(
                  'text-gray-400',
                  rating >= value ? 'text-yellow-500' : 'text-gray-300',
                )}
              /> */}
              <Svg
                width="63"
                height="63"
                viewBox="0 0 63 63"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M32.1057 45.0469L31.8475 44.8907L31.589 45.0464L20.8344 51.5251L20.8335 51.5256C19.2443 52.4875 17.2995 51.0678 17.7181 49.2679L20.5686 37.0364L20.6371 36.7425L20.4091 36.545L10.8984 28.3041L10.8983 28.304C9.49524 27.0894 10.2524 24.7914 12.0878 24.6454L12.0904 24.6451L24.6072 23.5826L24.9074 23.5572L25.0251 23.2799L29.923 11.7479L29.9238 11.7459C30.6334 10.0555 33.0605 10.0555 33.7701 11.7459L33.7707 11.7475L38.6686 23.3054L38.7863 23.583L39.0867 23.6086L51.6035 24.6711L51.6061 24.6713C53.4415 24.8173 54.1987 27.1153 52.7957 28.3299L52.7955 28.33L43.2848 36.5709L43.0568 36.7685L43.1253 37.0623L45.9758 49.2938C46.3944 51.0937 44.4496 52.5134 42.8605 51.5516L42.8603 51.5515L32.1057 45.0469Z"
                  fill={rating >= value ? '#FFD700' : '#C0C0C0'} // Yellow if selected, gray otherwise
                  stroke="#fff"
                />
              </Svg>

              {value === 1 && (
                <Text style={tw`text-xs text-center`}>Very Easy</Text>
              )}
              {value === 5 && (
                <Text style={tw`text-xs text-center`}>Exhausting</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BMI */}
      <View style={tw`my-10`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-bold`}>Your BMI</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BMI')}>
            <Text style={tw`text-blue-500`}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`text-green-500 font-bold`}>Healthy</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <View style={tw`flex-1 h-4 bg-blue-400 rounded-l`} />
            <View style={tw`flex-1 h-4 bg-green-400`} />
            <View style={tw`flex-1 h-4 bg-red-400 rounded-r`} />
          </View>
        </View>
      </View>

      {/* Finish Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded-full`}
        onPress={() => alert('Session Completed!')}>
        <Text style={tw`text-center text-white text-lg font-bold`}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Session;
