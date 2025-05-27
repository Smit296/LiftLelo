/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import LoginScreen from './src/screens/Auth/Login';
import RegistrationScreen from './src/screens/Auth/Registration';
import LoginOtp from './src/screens/Auth/LoginOtp';
import Navigation from './src/Navigation/Index';


function App() {

  return (
    <Navigation/>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
