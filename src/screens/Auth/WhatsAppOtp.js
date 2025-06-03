import React, {useRef, useState, useEffect} from 'react';
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
import OTPInputBox from '../../Components/Common/OtpInputView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {apiCall} from '../../utils/api';

const {width, height} = Dimensions.get('window');
const PRIMARY_COLOR = '#D32F2F';
const SECONDARY_COLOR = '#F5F5F5';
const SUCCESS_COLOR = '#4CAF50';

const WhatsAppOtp = ({route, navigation}) => {
  const {phoneNumber, verificationCode, isFromRegistration} =
    route.params || {};
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      setError('');

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

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (!enteredOtp || enteredOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('phone', phoneNumber);
      formData.append('otp', enteredOtp);

      const result = await apiCall(
        'api/verify_otp.php',
        'POST',
        formData,
        null,
        true,
      );

      if (result.success || result.data?.status === 'success') {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.replace('Home');
        }, 2000);
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('phone', phoneNumber);

      const result = await apiCall('api/send_otp.php', 'POST', {
        phone: phoneNumber, // Send just the 10 digit number
      });

      if (result.success || result.data?.status === 'success') {
        setTimer(30);
        setCanResend(false);
      } else {
        setError(result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} /> */}

      <View style={styles.innerContainer}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to {phoneNumber}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <OTPInputBox
              key={index}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              inputRef={ref => (inputs.current[index] = ref)}
              autoFocus={index === 0}
              error={!!error}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleVerify}
          style={[styles.verifyButton, isLoading && styles.disabledButton]}
          disabled={isLoading}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResendOTP}
          disabled={!canResend || isLoading}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            {canResend ? (
              <Text style={{fontWeight: '600', color: PRIMARY_COLOR}}>
                Resend
              </Text>
            ) : (
              <Text style={{color: '#999'}}>Resend in {timer}s</Text>
            )}
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Feather name="x" size={22} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <MaterialIcons
              name="check-circle"
              size={64}
              color={SUCCESS_COLOR}
            />
            <Text style={styles.modalText}>OTP verified successfully!</Text>
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
    shadowOffset: {width: 0, height: 6},
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
  errorText: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
});
