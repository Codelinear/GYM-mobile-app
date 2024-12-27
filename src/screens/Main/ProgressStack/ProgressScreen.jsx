// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import {Calendar} from 'react-native-calendars';
// import {LineChart} from 'react-native-chart-kit';
// import tw from 'twrnc';

// const ProgressScreen = ({navigation}) => {
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split('T')[0],
//   ); // Default to today's date
//   const [workoutData, setWorkoutData] = useState([]);
//   const [weight, setWeight] = useState(72);
//   const [bmi, setBmi] = useState(24.6);
//   const [chartData, setChartData] = useState([]);
//   const [chartBMI, setChartBMI] = useState([]);

//   const today = new Date().toISOString().split('T')[0];

//   const strikeDays = {
//     '2024-12-05': {marked: true, selectedColor: 'blue'},
//     '2024-12-06': {marked: true, selectedColor: 'blue'},
//     '2024-12-07': {marked: true, selectedColor: 'blue'},
//   };

//   const markedDates = {
//     ...strikeDays,
//     [today]: {selected: true, selectedColor: 'green'},
//     [selectedDate]: {selected: true, selectedColor: 'blue'},
//   };

//   useEffect(() => {
//     const fetchWorkoutData = () => {
//       setWorkoutData([
//         {
//           id: 1,
//           type: 'Chest',
//           calories: 200,
//           duration: '40mins',
//           difficulty: 'Easy',
//         },
//         {
//           id: 2,
//           type: 'Lats and Back',
//           calories: 200,
//           duration: '40mins',
//           difficulty: 'Easy',
//         },
//       ]);
//       setChartData([0, 70, 71, 72, 72, 73, 72, 72, 78, 67]); // Dummy weight data
//       setChartBMI([0, 21, 22, 21, 23, 22, 25, 24, 24, 21]); // Dummy weight data
//     };
//     fetchWorkoutData();
//   }, [selectedDate]);

//   return (
//     <ScrollView style={tw`flex-1 bg-white p-4`}>
//       <Text style={tw`text-lg font-bold mb-2`}>Progress</Text>
//       <Calendar
//         current={selectedDate}
//         markedDates={markedDates}
//         onDayPress={day => setSelectedDate(day.dateString)}
//         theme={{
//           selectedDayBackgroundColor: 'blue',
//           todayTextColor: 'green',
//           arrowColor: 'black',
//         }}
//       />

//       <View style={tw`mt-4`}>
//         {workoutData.map(workout => (
//           <View key={workout.id} style={tw`mb-4`}>
//             <Text style={tw`text-base font-bold`}>{workout.type}</Text>
//             <Text style={tw`text-gray-600`}>
//               ⏱️ {workout.calories} kCal | {workout.duration} | 😌{' '}
//               {workout.difficulty}
//             </Text>
//           </View>
//         ))}
//       </View>

//       <View style={tw`mt-6`}>
//         <Text style={tw`text-base font-bold mb-2`}>Weight log</Text>
//         <View style={tw`flex-row items-start mb-4`}>
//           <TouchableOpacity
//             onPress={() => setWeight(prev => Math.max(prev - 1, 0))}
//             style={styles.weightButton}>
//             <Text style={tw`text-lg font-bold`}>-</Text>
//           </TouchableOpacity>
//           <TextInput
//             style={tw`mx-4 text-lg borderb border-gray-300 w-12 text-center`}
//             keyboardType="numeric"
//             value={String(weight)}
//             onChangeText={text => setWeight(Number(text))}
//           />
//           <TouchableOpacity
//             onPress={() => setWeight(prev => prev + 1)}
//             style={styles.weightButton}>
//             <Text style={tw`text-lg font-bold`}>+</Text>
//           </TouchableOpacity>
//           <Text style={tw`ml-2 mt-3`}>KG</Text>
//         </View>

//         <LineChart
//           data={{
//             // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//             datasets: [
//               {
//                 data: chartData,
//               },
//             ],
//           }}
//           width={350} // Dimensions of the chart
//           height={200}
//           yAxisSuffix="kg"
//           chartConfig={{
//             backgroundColor: '#f5f5f5',
//             backgroundGradientFrom: '#f5f5f5',
//             backgroundGradientTo: '#f5f5f5',
//             color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           }}
//           style={tw`mt-4`}
//         />
//       </View>

//       <View style={tw`mt-6`}>
//         <Text style={tw`text-base font-bold`}>BMI: {bmi.toFixed(1)}</Text>
//         <Text
//           style={
//             bmi < 18.5
//               ? tw`text-blue-500`
//               : bmi > 25
//               ? tw`text-red-500`
//               : tw`text-green-500`
//           }>
//           {/* {bmi < 18.5 ? 'Underweight' : bmi > 25 ? 'Overweight' : 'Healthy'} */}
//         </Text>
//       </View>
//       {/* BMI */}
//       <View style={tw`my-2`}>
//         <View style={tw`flex-row justify-between items-center`}>
//           <Text style={tw`text-lg font-bold`}>Your BMI</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('BMI')}>
//             <Text style={tw`text-blue-500`}>Update</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={tw`mt-4`}>
//           <Text style={tw`text-green-500 font-bold`}>Healthy</Text>
//           <View style={tw`flex-row items-center mt-2`}>
//             <View style={tw`flex-1 h-4 bg-[#51789C] rounded-l`} />
//             <View style={tw`flex-1 h-4 bg-[#28C052]`} />
//             <View style={tw`flex-1 h-4 bg-[#A93737] rounded-r`} />
//           </View>
//         </View>
//       </View>
//       <LineChart
//         data={{
//           //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           datasets: [
//             {
//               data: chartBMI,
//             },
//           ],
//         }}
//         width={350} // Dimensions of the chart
//         height={200}
//         yAxisSuffix="kg"
//         chartConfig={{
//           backgroundColor: '#f5f5f5',
//           backgroundGradientFrom: '#34C759',
//           backgroundGradientTo: '#DAFBE300',
//           color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//         }}
//         style={tw`mt-4`}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   weightButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//   },
// });

// export default ProgressScreen;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Progress from './ProgressComp/Progress';
import BMI from './ProgressComp/BMI';
// import Home from '../k';
// import WorkoutScreen from './WorkoutScreen';
// import Home from '../HomeComponents/Home';
// import Session from '../HomeComponents/Session';
// import BMICalculator from '../../../../screens/OnboardingScreens/BMI';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen name="Progress" component={Progress} />
    <Stack.Screen name="BMI" component={BMI} />
  </Stack.Navigator>
);

export default HomeStackNavigator;
