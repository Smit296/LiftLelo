import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {apiCall} from '../../utils/api';

const {width} = Dimensions.get('window');

const Registration = ({navigation}) => {
  const [formData, setFormData] = useState({
    USERTYPE: 'driver',
    CITY: 'Mumbai',
    USER_NAME: '',
    MOBILE_NO: '',
    EMAIL: '',
    GENDER: '',
    HOME_LOCATION: '',
    OFFICE_LOCATION: '',
    MORNING_DEPARTURE_TIME: '08:30 AM',
    EVENING_DEPARTURE_TIME: '06:00 PM',
    GENDER_PREFERENCE: '1',
  });

  const [errors, setErrors] = useState({
    USER_NAME: '',
    MOBILE_NO: '',
    EMAIL: '',
    GENDER: '',
    HOME_LOCATION: '',
    OFFICE_LOCATION: '',
    general: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppInfo, setShowWhatsAppInfo] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
  ]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
        general: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.USER_NAME.trim()) {
      newErrors.USER_NAME = 'Full name is required';
      isValid = false;
    }

    if (!formData.MOBILE_NO.trim()) {
      newErrors.MOBILE_NO = 'Mobile number is required';
      isValid = false;
    } else if (formData.MOBILE_NO.length !== 10) {
      newErrors.MOBILE_NO = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.EMAIL.trim()) {
      newErrors.EMAIL = 'Email is required';
      isValid = false;
    } else if (!formData.EMAIL.includes('@') || !formData.EMAIL.includes('.')) {
      newErrors.EMAIL = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.GENDER) {
      newErrors.GENDER = 'Please select your gender';
      isValid = false;
    }

    if (!formData.HOME_LOCATION.trim()) {
      newErrors.HOME_LOCATION = 'Home location is required';
      isValid = false;
    }

    if (!formData.OFFICE_LOCATION.trim()) {
      newErrors.OFFICE_LOCATION = 'Office location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegistration = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors(prev => ({...prev, general: ''}));

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const result = await apiCall(
        'api/register.php',
        'POST',
        formDataToSend,
        null,
        true, // isFormData flag
      );

      if (result.success || result.data?.status === 'success') {
        // Extract verification code from response
        const verificationCode = result.data?.verification_code;

        navigation.navigate('WhatsAppOtp', {
          phoneNumber: formData.MOBILE_NO,
          verificationCode: verificationCode, // Pass verification code to OTP screen
          isFromRegistration: true, // Flag to indicate this is from registration
        });
      } else {
        const errorMessage = result.error?.includes('SQLSTATE')
          ? 'Registration failed. Please try again.'
          : result.error || 'Registration failed. Please try again.';

        setErrors(prev => ({
          ...prev,
          general: errorMessage,
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Network error. Please check your connection and try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.header}>Register to Liftlelo</Text>

          {errors.general ? (
            <Text style={styles.generalError}>{errors.general}</Text>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.USER_NAME && styles.inputError]}
              placeholder="Enter Full Name"
              placeholderTextColor="#9CA3AF"
              value={formData.USER_NAME}
              onChangeText={text => updateFormData('USER_NAME', text)}
            />
            {errors.USER_NAME ? (
              <Text style={styles.errorText}>{errors.USER_NAME}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Mobile Number</Text>
              <TouchableOpacity
                onPress={() => setShowWhatsAppInfo(!showWhatsAppInfo)}>
                <Text style={styles.infoLink}>Why Mobile Number?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, errors.MOBILE_NO && styles.inputError]}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#9CA3AF"
              value={formData.MOBILE_NO}
              onChangeText={text =>
                updateFormData('MOBILE_NO', text.replace(/[^\d]/g, ''))
              }
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors.MOBILE_NO ? (
              <Text style={styles.errorText}>{errors.MOBILE_NO}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Email</Text>
              <TouchableOpacity
                onPress={() => setShowEmailInfo(!showEmailInfo)}>
                <Text style={styles.infoLink}>Why Email?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, errors.EMAIL && styles.inputError]}
              placeholder="Enter Email"
              placeholderTextColor="#9CA3AF"
              value={formData.EMAIL}
              onChangeText={text => updateFormData('EMAIL', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.EMAIL ? (
              <Text style={styles.errorText}>{errors.EMAIL}</Text>
            ) : null}
          </View>

          <View style={[styles.inputGroup, {zIndex: 10}]}>
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              open={genderOpen}
              value={formData.GENDER}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={callback => {
                const value = callback(formData.GENDER);
                updateFormData('GENDER', value);
              }}
              setItems={setGenderItems}
              placeholder="Select Gender"
              placeholderStyle={styles.dropdownPlaceholder}
              style={[styles.dropdown, errors.GENDER && styles.inputError]}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownLabel}
              listItemLabelStyle={styles.dropdownItemLabel}
              selectedItemLabelStyle={styles.dropdownSelectedItem}
            />
            {errors.GENDER ? (
              <Text style={styles.errorText}>{errors.GENDER}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Home Location</Text>
            <TextInput
              style={[styles.input, errors.HOME_LOCATION && styles.inputError]}
              placeholder="Enter Home Location"
              placeholderTextColor="#9CA3AF"
              value={formData.HOME_LOCATION}
              onChangeText={text => updateFormData('HOME_LOCATION', text)}
            />
            {errors.HOME_LOCATION ? (
              <Text style={styles.errorText}>{errors.HOME_LOCATION}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Office Location</Text>
            <TextInput
              style={[
                styles.input,
                errors.OFFICE_LOCATION && styles.inputError,
              ]}
              placeholder="Enter Office Location"
              placeholderTextColor="#9CA3AF"
              value={formData.OFFICE_LOCATION}
              onChangeText={text => updateFormData('OFFICE_LOCATION', text)}
            />
            {errors.OFFICE_LOCATION ? (
              <Text style={styles.errorText}>{errors.OFFICE_LOCATION}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.disabledButton]}
            onPress={handleRegistration}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitText}>Register to Liftlelo</Text>
            )}
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/liftLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  infoLink: {
    fontSize: 12,
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
    minHeight: 44,
  },
  // Dropdown Styles
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    minHeight: 44,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginTop: 5,
    zIndex: 1000,
  },
  dropdownPlaceholder: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownItemLabel: {
    fontSize: 14,
    color: '#374151',
  },
  dropdownSelectedItem: {
    fontWeight: '600',
    color: '#DC2626',
  },
  submitButton: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  generalError: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
  },
});

export default Registration;
