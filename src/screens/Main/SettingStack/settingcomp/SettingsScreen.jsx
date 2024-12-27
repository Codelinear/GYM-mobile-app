import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  Image,
} from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import tailwind from 'twrnc';
import Profile from './Profile';
import Fitness from './Fitness';

const SettingsScreen = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [currentSheet, setCurrentSheet] = useState('');

  const handleSwitchToggle = () => setIsSwitchOn(!isSwitchOn);

  const openBottomSheet = sheetName => {
    setCurrentSheet(sheetName);
    setSheetVisible(true);
  };

  const [showInstructions, setShowInstructions] = useState(false);
  const [showfitness, setShowFitness] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Profile')}
          onPress={() => setShowInstructions(true)}
          style={styles.settingItem}>
          <Text style={styles.settingTitle}>Profile</Text>
          <Text style={styles.settingDescription}>
            Change your name, Age, Gender
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowFitness(true)}
          style={styles.settingItem}>
          <Text style={styles.settingTitle}>Fitness goals</Text>
          <Text style={styles.settingDescription}>
            Change what you want to achieve
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowFitness(true)}
          style={styles.settingItem}>
          <Text style={styles.settingTitle}>Lifestyle</Text>
          <Text style={styles.settingDescription}>
            Change your daily activity
          </Text>
        </TouchableOpacity>
        <View style={tailwind`flex-row gap-4 mb-4`}>
          <Text style={styles.settingTitle}>
            Keep the screen on while in a workout
          </Text>
          <Switch value={isSwitchOn} onValueChange={handleSwitchToggle} />
        </View>
        <TouchableOpacity
          onPress={() => openBottomSheet('Feedback')}
          style={styles.settingItem}>
          <Text style={styles.settingTitle}>Feedback</Text>
          <Text style={styles.settingDescription}>
            Tell us how we can improve
          </Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 1.02</Text>

        {/* {sheetVisible && (
        <BottomSheet
          index={0}
          snapPoints={['50%']}
          onClose={() => setSheetVisible(false)}
          enablePanDownToClose={true}>
          {renderBottomSheetContent()}
        </BottomSheet>
      )} */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showInstructions}
        onRequestClose={() => setShowInstructions(false)}>
        <View
          style={tailwind`flex-1 justify-end h-[300px] bg-black bg-opacity-50`}>
          <Profile setShowInstructions={setShowInstructions} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showfitness}
        onRequestClose={() => setShowFitness(false)}>
        <View
          style={tailwind`flex-1 justify-end h-[300px] bg-black bg-opacity-50`}>
          <Fitness setShowFitness={setShowFitness} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 24,
    // flexDirection: 'row',
    // gap: 15,
    // alignItems: 'center',
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  versionText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  bottomSheetContent: {
    padding: 16,
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
