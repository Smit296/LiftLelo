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
  Modal,
  Image,
} from 'react-native';
import OTPInputBox from '../../Components/Common/OtpInputView'; // Ensure this component is set up correctly
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#D32F2F'; // Red
const SECONDARY_COLOR = '#F5F5F5'; // Light grey
const SUCCESS_COLOR = '#4CAF50'; // Green for success icon

const WhatsAppOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true); // Show success modal
    navigation.navigate('ProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} /> */}

      <View style={styles.innerContainer}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to your WhatsApp.</Text>

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

          <View style={styles.logoContainer}>
                  <Image
                    source={require('../../assets/liftLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Feather name="x" size={22} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <MaterialIcons name="check-circle" size={64} color={SUCCESS_COLOR} />
            <Text style={styles.modalText}>You have successfully registered !</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WhatsAppOtp;

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
    marginLeft: '0%',
  },
  verifyButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 10,
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
logo: {
    width: width * 0.5,
    height: width * 0.5,
    // bottom:'10%'
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: width * 0.8,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  modalText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
});
