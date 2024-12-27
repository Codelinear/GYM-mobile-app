// src/screens/SignUpPhone.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
const EmailInput = ({navigation}) => {
  const [phone, setPhone] = useState('');

  // const handleSendCode = () => {
  //   navigation.navigate('EnterOTP');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="phone-pad"
          value={phone}
          // onChangeText={setPhone}
        />
      </View>
      <Text style={tw`mb-4`}>
        By continuing, you agree to Fitter’s Terms of Service and confirm that
        you have read Fitter’s Privacy Policy. If you sign up SMS, SMS fees may
        apply.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Gender')}
        style={styles.button}>
        <Text style={styles.buttonText}>Send code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'start',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    // width: '0%',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: 70,
  },
  button: {backgroundColor: '#007bff', padding: 15, borderRadius: 8},
  buttonText: {color: '#fff', textAlign: 'center', fontSize: 16},
});

export default EmailInput;
