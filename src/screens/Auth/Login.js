import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import BackIcon from '../../Components/Common/BackIcon';
import BackgroundGradient from '../../Components/Common/BackgroundGradiant';
import SocialLoginButtons from '../../Components/Common/SocialLoginButtons';
import CheckBox from '../../Components/Common/Checkbox';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.backgroundContainer}>
         <Image
         source={require('../../assets/abstract.jpeg')}
         style={styles.topBackgroundImage}
         resizeMode="cover"
       />
      </View>

      <View style={styles.backButtonContainer}>
        <BackIcon onPress={() => navigation.goBack()} />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Welcome back</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email or mobile number</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder="Email or mobile number" 
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        {/* <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder="••••••••••" 
            placeholderTextColor="#A0A0A0"
            secureTextEntry
          />
        </View> */}
        
        {/* <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMeContainer}>
            <CheckBox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View> */}
        
        <TouchableOpacity style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Send OTP</Text>
        </TouchableOpacity>
        
        {/* <View style={styles.orContainer}>
          <Text style={styles.orText}>Sign in with</Text>
        </View> */}
        
        {/* <SocialLoginButtons /> */}
        
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>
            Don't have an account? 
            <Text 
              style={styles.linkText} 
              onPress={() => navigation.navigate('Register')}
            > Sign up</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height,
    zIndex: -1,
  },
  topBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 10,
  },
  formContainer: {
    marginTop: height * 0.58,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F', // red
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D3D3D3', // light grey
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#757575', // medium grey
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#D32F2F', // red
    fontWeight: '500',
  },
  signinButton: {
    height: 55,
    backgroundColor: '#D32F2F', // red
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  orText: {
    fontSize: 14,
    color: '#757575', // medium grey
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  bottomText: {
    fontSize: 14,
    color: '#757575', // medium grey
  },
  linkText: {
    color: '#D32F2F', // red
    fontWeight: '500',
  },
});

export default SignInScreen;
