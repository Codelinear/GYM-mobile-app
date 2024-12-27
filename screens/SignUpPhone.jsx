// // // src/screens/SignUpPhone.js
// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// // } from 'react-native';
// // import tw from 'twrnc';
// // const SignUpPhone = ({navigation}) => {
// //   const [phone, setPhone] = useState('');

// //   // const handleSendCode = () => {
// //   //   navigation.navigate('EnterOTP');
// //   // };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Sign up</Text>
// //       <View style={tw`flex-row gap-2`}>
// //         <TextInput
// //           style={styles.input2}
// //           placeholder="+91"
// //           keyboardType="phone-pad"
// //           value={phone}
// //           // onChangeText={setPhone}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Phone"
// //           keyboardType="phone-pad"
// //           value={phone}
// //           // onChangeText={setPhone}
// //         />
// //       </View>
// //       <Text style={tw`mb-4 opacity-50`}>
// //         By continuing, you agree to Fitter’s Terms of Service and confirm that
// //         you have read Fitter’s Privacy Policy. If you sign up SMS, SMS fees may
// //         apply.
// //       </Text>
// //       <TouchableOpacity
// //         onPress={() => navigation.navigate('EnterOTP')}
// //         style={styles.button}>
// //         <Text style={styles.buttonText}>Send code</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     justifyContent: 'start',
// //     // alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //     padding: 10,
// //     marginBottom: 20,
// //     width: '80%',
// //   },
// //   input2: {
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //     padding: 10,
// //     marginBottom: 20,
// //     width: 50,
// //   },
// //   button: {backgroundColor: '#007bff', padding: 15, borderRadius: 8},
// //   buttonText: {color: '#fff', textAlign: 'center', fontSize: 16},
// // });

// // export default SignUpPhone;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import axios from 'axios';

// const SignUpPhone = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [formdata, setFormdta] = useState({
//     email: '',
//     password: '',
//   });

//   const handleAuth = async () => {
//     // const url = isLogin
//     //   ? 'http://localhost:8000/api/AppUse/login'
//     // :
//     const url = 'http://localhost:8000/api/AppUse';
//     const payload = {email, password};
//     console.log(formdata);
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/AppUse',
//         formdata,
//       );
//       console.log(response.data);
//       if (isLogin) {
//         Alert.alert('Success', 'Login Successful', [{text: 'OK'}]);
//       } else {
//         Alert.alert('Success', 'Signup Successful', [{text: 'OK'}]);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong!',
//         [{text: 'OK'}],
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={formdata.email}
//         onChangeText={setFormdta.email}
//         keyboardType="email-address"
//       />

//       {/* <TextInput
//         style={styles.input}
//         placeholder="Phone (optional)"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       /> */}

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={formdata.password}
//         onChangeText={setFormdta.password}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={handleAuth}>
//         <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
//         <Text style={styles.switchText}>
//           {isLogin
//             ? "Don't have an account? Signup"
//             : 'Already have an account? Login'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   switchText: {
//     color: '#007bff',
//     marginTop: 10,
//     textDecorationLine: 'underline',
//   },
// });

// export default SignUpPhone;

import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpPhone = () => {
  const [isSignup, setIsSignup] = useState(false);

  const initialValues = {
    email: '',
    // phone: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email'),
    password: Yup.string()
      .min(3, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async values => {
    try {
      const endpoint = isSignup ? '/' : '/login';
      const response = await axios.post(
        `https://gym-backend-4kei.onrender.com/api/AppUser/${endpoint}`,
        values,
      );
      console.log(response.data.token);
      AsyncStorage.setItem('token', response?.data?.token);

      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.log(error.response?.data);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Signup' : 'Login'}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* <TextInput
              style={styles.input}
              placeholder="Phone"
              keyboardType="phone-pad"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )} */}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button
              title={isSignup ? 'Signup' : 'Login'}
              onPress={handleSubmit}
            />
            <Button
              title={isSignup ? 'Switch to Login' : 'Switch to Signup'}
              onPress={() => setIsSignup(prev => !prev)}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpPhone;
