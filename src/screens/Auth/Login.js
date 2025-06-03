import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {apiCall} from '../../utils/api';

const {width} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateWhatsAppNumber = number => {
    // Remove any non-numeric characters
    const cleanNumber = number.replace(/[^\d]/g, '');

    // Check if it's a valid Indian phone number (10 digits)
    return cleanNumber.length === 10;
  };

  const handleWhatsAppNumberChange = text => {
    // Only allow numbers
    const sanitizedText = text.replace(/[^\d]/g, '');
    setWhatsappNumber(sanitizedText);

    if (sanitizedText.length > 0 && !validateWhatsAppNumber(sanitizedText)) {
      setError('Please enter a valid 10-digit mobile number');
    } else {
      setError('');
    }
  };

  const handleSendOTP = async () => {
    if (!whatsappNumber) {
      setError('Mobile number is required');
      return;
    }

    if (!validateWhatsAppNumber(whatsappNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send only 10 digit number without any prefix
      const cleanNumber = whatsappNumber.replace(/[^\d]/g, '').slice(-10);

      const result = await apiCall('api/send_otp.php', 'POST', {
        phone: cleanNumber, // Send just the 10 digit number
      });

      if (result.success) {
        navigation.navigate('WhatsAppOtp', {
          phoneNumber: cleanNumber,
        });
      } else {
        setError(result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    console.log('first');
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.content}>
        <Text style={styles.header}>LOGIN TO</Text>
        <Text style={[styles.header, {marginBottom: 50}]}>LIFTLELO</Text>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Enter Your 10-digit Mobile Number"
            placeholderTextColor="#C4C4C4"
            value={whatsappNumber}
            onChangeText={handleWhatsAppNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
            editable={!isLoading}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!whatsappNumber || error || isLoading) && styles.disabledButton,
          ]}
          onPress={handleSendOTP}
          activeOpacity={0.8}
          disabled={!whatsappNumber || !!error || isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.sendButtonText}>SEND OTP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          hitSlop={10}
          onPress={handleSignupRedirect}
          style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign Up</Text>
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
    alignItems: 'center',
    padding: 10,
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
  inputError: {
    borderColor: '#C53030',
  },
  errorText: {
    color: '#C53030',
    fontSize: 12,
    marginTop: 4,
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
    elevation: 0,
  },
});

export default LoginScreen;
