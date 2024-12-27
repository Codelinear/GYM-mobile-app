// import React, {useState} from 'react';
// import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
// import tailwind from 'twrnc';
// import img from './assets/img.png'; // Ensure the image path is correct

// const WorkoutScreen = ({route, navigation}) => {
//   const {workouts} = route.params;
//   const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
//   const [currentSet, setCurrentSet] = useState(1);
//   const [rest, setRest] = useState(25);

//   const currentWorkout = workouts[currentWorkoutIndex];

//   const handleNextSet = () => {
//     if (currentSet < currentWorkout.sets) {
//       setCurrentSet(currentSet + 1);
//     } else {
//       handleNextWorkout();
//     }
//   };
//   const restadd = () => {
//     setRest(rest + 25);
//   };

//   const handleNextWorkout = () => {
//     if (currentWorkoutIndex < workouts.length - 1) {
//       setCurrentWorkoutIndex(currentWorkoutIndex + 1);
//       setCurrentSet(1);
//     } else {
//       navigation.navigate('Session');
//     }
//   };
//   const [showInstructions, setShowInstructions] = useState(false);

//   return (
//     <>
//       <View style={tailwind`flex-1 items-start justify-start w-full bg-white`}>
//         <Image
//           style={tailwind`w-[390px] h-[250px] mb-8`}
//           source={img} // Use direct import for local images
//         />

//         <View style={tailwind`p-4 w-full`}>
//           <Text style={tailwind`text[10px]`}>Current Exercise</Text>
//           <View style={tailwind`flex-row justify-between w-full items-center`}>
//             <Text style={tailwind`text-[30px] font-bold my-3`}>
//               {currentWorkout.name}
//             </Text>
//             {/* <Text style={tailwind`text-[10px] font-bold`}>icon</Text> */}
//             <TouchableOpacity
//               style={tailwind`bg-[#fff] h-8 w-8  border rounded-full`}
//               onPress={() => setShowInstructions(true)}>
//               <Text
//                 style={tailwind`absolute top-1 left-3 text-[#000] text-[20px] font-bold`}>
//                 i
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={tailwind`text-[20px] my-6`}>
//             Set {currentSet} of {currentWorkout.sets}
//           </Text>

//           <View style={tailwind`flex- items-start justify-start  bg-white`}>
//             <Text style={tailwind`text-center w-full`}>Take Rest</Text>
//             <View style={tailwind`flex-row w-full items-center justify-center`}>
//               <Text style={tailwind`text-[72px] pr-0 `}>
//                 {rest}
//                 <Text style={tailwind`text-[52px] ml-0`}>s</Text>
//               </Text>
//               <TouchableOpacity
//                 onPress={restadd}
//                 style={tailwind`text-[72px] pr-0 `}>
//                 <Text style={tailwind`text-[20px] text-[#007AFF] ml-4`}>
//                   +15s
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View
//             style={tailwind`flex-row justify-between items-center w-full mt-10`}>
//             <TouchableOpacity
//               style={tailwind`bg-[#007AFF] px-4 py-2 rounded mt-4`}
//               onPress={handleNextWorkout}>
//               <Text style={tailwind`text-white text-center`}>Skip</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={tailwind`bg-[#007AFF] px-4 py-2 rounded mt-4`}
//               onPress={handleNextSet}>
//               <Text style={tailwind`text-white text-center`}>Next</Text>
//             </TouchableOpacity>
//           </View>
//           {currentSet === currentWorkout.sets && (
//             <TouchableOpacity
//               style={tailwind`bg-[#007AFF] px-4 py-2 rounded mt-4`}
//               onPress={handleNextWorkout}>
//               <Text style={tailwind`text-white text-center`}>Done</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showInstructions}
//         onRequestClose={() => setShowInstructions(false)}>
//         <View style={tailwind`flex-1 justify-end bg-black bg-opacity-50`}>
//           <View style={tailwind`bg-white p-5 rounded-t-xl`}>
//             <Image
//               style={tailwind`w-[390px] h-[250px] mb-8`}
//               source={img} // Use direct import for local images
//             />
//             <Text style={tailwind`text-[24px] font-bold mb-3`}>
//               Instructions
//             </Text>
//             <Text style={tailwind`text-[16px] mb-5`}>
//               {/* - Warm up before starting the workout. */}
//               {'\n'}
//               1. Using a pronated grip, grasp the pull bar with a slightly wider
//               than shoulder width grip.
//               {'\n'} {'\n'}2. Take a deep breath, squeeze your glutes and brace
//               your abs. Depress the shoulder blades and then drive the elbows
//               straight down to the floor while activating the lats.
//               {'\n'} {'\n'}3.Pull your chin towards the bar until the lats are
//               fully contracted, then slowly lower yourself back to the start
//               position.
//             </Text>
//             <TouchableOpacity
//               style={tailwind`bg-[#007AFF] px-4 py-4 mb-4 rounded`}
//               onPress={() => setShowInstructions(false)}>
//               <Text style={tailwind`text-white text-center`}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default WorkoutScreen;

import React, {useState, useEffect} from 'react';
import {Image, Modal, Text, TouchableOpacity, View, Alert} from 'react-native';
import tailwind from 'twrnc';
import img from './assets/img.png'; // Ensure the image path is correct

const WorkoutScreen = ({route, navigation}) => {
  const {workouts} = route.params;
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [rest, setRest] = useState(25);
  const [isResting, setIsResting] = useState(false);
  const [countdown, setCountdown] = useState(rest);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);

  const currentWorkout = workouts[currentWorkoutIndex];
  const nextWorkout = workouts[currentWorkoutIndex + 1];

  // useEffect(() => {
  //   let timer;
  //   if (isResting && countdown > 0) {
  //     timer = setTimeout(() => {
  //       setCountdown(countdown - 1);
  //     }, 100);
  //   } else if (isResting && countdown === 0) {
  //     handleNextWorkout();
  //   }
  //   return () => clearTimeout(timer);
  // });

  useEffect(() => {
    let timer;
    if (isResting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (isResting && countdown === 0) {
      handleNextWorkout();
    }
    return () => clearTimeout(timer);
  }, [isResting, countdown]);

  useEffect(() => {
    if (isResting) {
      setCountdown(rest); // Sync countdown with rest whenever rest changes
    }
  }, [rest, isResting]);

  const handleNextSet = () => {
    if (currentSet < currentWorkout.sets) {
      setCurrentSet(currentSet + 1);
    } else {
      setIsResting(true);
      setCountdown(rest);
    }
  };

  const handleNextWorkout = () => {
    setIsResting(false);
    if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
      setCurrentSet(1);
    } else {
      navigation.navigate('Session');
    }
  };
  const handleIncreaseRest = () => {
    setRest(prevRest => prevRest + 15);
    if (isResting) {
      setCountdown(prevCountdown => prevCountdown + 15);
    }
  };

  const handleBackPress = () => {
    setShowBackModal(true);
  };

  const confirmExit = () => {
    setShowBackModal(false);
    navigation.goBack();
  };

  return (
    <>
      <View style={tailwind`flex-1 items-start justify-start w-full bg-white`}>
        <Image style={tailwind`w-[390px] h-[250px] mb-8`} source={img} />

        <View style={tailwind`p-4 w-full`}>
          <Text style={tailwind`text-[10px]`}>Current Exercise</Text>
          <View style={tailwind`flex-row justify-between w-full items-center`}>
            <Text style={tailwind`text-[20px] font-bold my-3`}>
              {isResting
                ? `Upcoming: ${nextWorkout?.name || 'None'}`
                : currentWorkout.name}
            </Text>
            <TouchableOpacity
              style={tailwind`bg-[#fff] h-8 w-8 border rounded-full`}
              onPress={() => setShowInstructions(true)}>
              <Text
                style={tailwind`absolute top-1 left-3 text-[#000] text-[20px] font-bold`}>
                i
              </Text>
            </TouchableOpacity>
          </View>
          {isResting ? (
            <Text style={tailwind`text-[20px] my-6`}>
              Rest for {countdown}s
            </Text>
          ) : (
            <Text style={tailwind`text-[20px] my-6`}>
              Set {currentSet} of {currentWorkout.sets}
            </Text>
          )}

          <View style={tailwind`flex-row w-full items-center justify-center`}>
            {!isResting && (
              <Text style={tailwind`text-[20px]`}>
                {currentWorkout.reps} reps x {currentWorkout.sets} sets
              </Text>
            )}
            {isResting && (
              <View style={tailwind`flex- items-start justify-start  bg-white`}>
                {/* <Text style={tailwind`text-center w-full`}>Take Rest</Text> */}
                <View
                  style={tailwind`flex-row w-full items-center justify-center`}>
                  <Text style={tailwind`text-[72px] pr-0 `}>
                    {countdown}

                    <Text style={tailwind`text-[52px] ml-0`}>s</Text>
                  </Text>
                  <TouchableOpacity
                    //  onPress={restadd}
                    onPress={handleIncreaseRest}
                    style={tailwind`text-[72px] pr-0 `}>
                    <Text style={tailwind`text-[20px] text-[#007AFF] ml-4`}>
                      +15s
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View
            style={tailwind`flex-row justify-between items-center w-full mt-10`}>
            <TouchableOpacity
              style={tailwind`bg-[#007AFF] px-4 py-2 rounded mt-4`}
              onPress={handleNextWorkout}>
              <Text style={tailwind`text-white text-center`}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind`bg-[#007AFF] px-4 py-2 rounded mt-4`}
              onPress={handleNextSet}>
              <Text style={tailwind`text-white text-center`}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showInstructions}
        onRequestClose={() => setShowInstructions(false)}>
        <View style={tailwind`flex-1 justify-end bg-black bg-opacity-50`}>
          <View style={tailwind`bg-white p-5 rounded-t-xl`}>
            <Image style={tailwind`w-[390px] h-[250px] mb-8`} source={img} />
            <Text style={tailwind`text-[24px] font-bold mb-3`}>
              Instructions
            </Text>
            <Text style={tailwind`text-[16px] mb-5`}>
              {/* Add workout-specific instructions here */}
              Instructions for the workout.
            </Text>
            <TouchableOpacity
              style={tailwind`bg-[#007AFF] px-4 py-4 mb-4 rounded`}
              onPress={() => setShowInstructions(false)}>
              <Text style={tailwind`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showBackModal}
        onRequestClose={() => setShowBackModal(false)}>
        <View style={tailwind`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tailwind`bg-white p-5 rounded-xl m-4`}>
            <Text style={tailwind`text-[20px] font-bold mb-4`}>
              Exit Workout?
            </Text>
            <Text style={tailwind`text-[16px] mb-6`}>
              You have completed {currentWorkoutIndex} out of {workouts.length}{' '}
              workouts. Would you like to continue or exit?
            </Text>
            <View style={tailwind`flex-row justify-between`}>
              <TouchableOpacity
                style={tailwind`bg-gray-300 px-4 py-2 rounded`}
                onPress={() => setShowBackModal(false)}>
                <Text style={tailwind`text-black text-center`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tailwind`bg-[#007AFF] px-4 py-2 rounded`}
                onPress={confirmExit}>
                <Text style={tailwind`text-white text-center`}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default WorkoutScreen;
