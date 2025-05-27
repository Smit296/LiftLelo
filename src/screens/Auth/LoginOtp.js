import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Keyboard,
} from 'react-native';
import OTPInputBox from '../../Components/Common/OtpInputView'; // Make sure the path is correct

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#D32F2F'; // Red
const SECONDARY_COLOR = '#F5F5F5'; // Light grey

const LoginOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1].focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp);
    navigation.navigate("WhatsAppOtp")
    // navigation.navigate('NextScreen'); // Add your route here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Email OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to your email.</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <OTPInputBox
              key={index}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              inputRef={(ref) => (inputs.current[index] = ref)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text style={{ fontWeight: '600', color: PRIMARY_COLOR }}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    marginLeft: '16%',
  },
  verifyButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resendContainer: {
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  circleTopRight: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.3,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: SECONDARY_COLOR,
    zIndex: 1,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -height * 0.12,
    left: -width * 0.25,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: SECONDARY_COLOR,
    zIndex: 1,
  },
});
