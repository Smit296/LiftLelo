import React, { useState } from 'react';
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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const Registration = ({navigation}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    officeEmail: '',
    gender: null,
    homeAddress: '',
  });

  const [showWhatsAppInfo, setShowWhatsAppInfo] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.header}>Register to Liftlelo</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              placeholderTextColor="#9CA3AF"
              value={formData.fullName}
              onChangeText={(text) => updateFormData('fullName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>WhatsApp Number</Text>
              <TouchableOpacity onPress={() => setShowWhatsAppInfo(!showWhatsAppInfo)}>
                <Text style={styles.infoLink}>Why WhatsApp Number?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter WhatsApp Number"
              placeholderTextColor="#9CA3AF"
              value={formData.whatsappNumber}
              onChangeText={(text) => updateFormData('whatsappNumber', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Office Email</Text>
              <TouchableOpacity onPress={() => setShowEmailInfo(!showEmailInfo)}>
                <Text style={styles.infoLink}>Why Email?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Office Email"
              placeholderTextColor="#9CA3AF"
              value={formData.officeEmail}
              onChangeText={(text) => updateFormData('officeEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.inputGroup, { zIndex: 10 }]}>
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              open={genderOpen}
              value={formData.gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={(callback) => {
                const value = callback(formData.gender);
                updateFormData('gender', value);
              }}
              setItems={setGenderItems}
              placeholder="Select Gender"
              placeholderStyle={styles.dropdownPlaceholder}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownLabel}
              listItemLabelStyle={styles.dropdownItemLabel}
              selectedItemLabelStyle={styles.dropdownSelectedItem}
              arrowIconStyle={styles.dropdownArrow}
              tickIconStyle={styles.dropdownTick}
            />
          </View>

          <View style={[styles.inputGroup, { zIndex: 1 }]}>
            <Text style={styles.label}>Home Address</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter Home Address"
              placeholderTextColor="#9CA3AF"
              value={formData.homeAddress}
              onChangeText={(text) => updateFormData('homeAddress', text)}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={()=>navigation.navigate("WhatsAppOtp")}>
            <Text style={styles.submitText}>Register to Liftlelo</Text>
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
  dropdownArrow: {
    width: 16,
    height: 16,
  },
  dropdownTick: {
    width: 16,
    height: 16,
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
});

export default Registration;
