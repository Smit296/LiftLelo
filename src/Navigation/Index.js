import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from '../screens/Auth/Registration';
import Landing from '../screens/Static/Landing';
import LoginOtp from '../screens/Auth/LoginOtp';
import WhatsAppOtp from '../screens/Auth/WhatsAppOtp';
import SplashScreen from '../screens/Static/SplashScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for full screen designs
      }}
      initialRouteName='Splashscreen'
    >
      <Stack.Screen name="Splashscreen" component={SplashScreen} />
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="VerifyOtp" component={LoginOtp} />
      <Stack.Screen name="WhatsAppOtp" component={WhatsAppOtp} />


    </Stack.Navigator>
    </NavigationContainer>
  
  );
};

export default Navigation;
