import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleSendOTP = () => {
    console.log('Sending OTP to:', whatsappNumber);
    navigation.navigate('WhatsAppOtp');
  };

  const handleSignupRedirect = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.content}>
        <Text style={styles.header}>LOGIN TO</Text>
        <Text style={[styles.header, { marginBottom: 50 }]}>LIFTLELO</Text>

        <View style={styles.inputSection}>
          <Text style={styles.label}>WhatsApp Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your WhatsApp Number"
            placeholderTextColor="#C4C4C4"
            value={whatsappNumber}
            onChangeText={setWhatsappNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendOTP}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>SEND OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignupRedirect} style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/liftLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#C53030',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: 0.5,
    marginTop: 10,
  },
  inputSection: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#2D3748',
  },
  sendButton: {
    width: '60%',
    height: 40,
    backgroundColor: '#C53030',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signupContainer: {
    marginBottom: 50,
  },
  signupText: {
    fontSize: 14,
    color: '#2D3748',
  },
  signupLink: {
    color: '#C53030',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    bottom: '40%',
  },
});

export default LoginScreen;
