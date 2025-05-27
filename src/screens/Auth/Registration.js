import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../../Components/Common/BackIcon';
import SocialLoginButtons from '../../Components/Common/SocialLoginButtons';
import CheckBox from '../../Components/Common/Checkbox';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState(null); // 'male' or 'female'

  function handleNavigation(){
    navigation.navigate("VerifyOtp")
  }

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Get Started</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Full Name"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Email"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>WhatsApp number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="WhatsApp number"
            placeholderTextColor="#A0A0A0"
            keyboardType="number-pad"
            autoCapitalize="none"
          />
        </View>

     

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Home Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Home Address"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Office Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Office Address"
            placeholderTextColor="#A0A0A0"
          />
        </View>

           {/* Gender Radio Button */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => setGender('male')}
            >
              <MaterialIcons
                name={gender === 'male' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color="#D32F2F"
              />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.genderOption}
              onPress={() => setGender('female')}
            >
              <MaterialIcons
                name={gender === 'female' ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color="#D32F2F"
              />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
          <Text style={styles.checkboxLabel}>
            I agree to the processing of <Text style={styles.linkText}>Personal data</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={()=>handleNavigation()}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* <View style={styles.orContainer}>
          <Text style={styles.orText}>Sign up with</Text>
        </View>

        <SocialLoginButtons /> */}

        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>
            Already have an account?
            <TouchableOpacity style={{top:16}}>
               <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
              {' '}
              Sign in
            </Text>
            </TouchableOpacity>
           
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 10,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    zIndex: -1,
  },
  topBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginTop: height * 0.2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
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
    height: 46,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  genderText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: '#D32F2F',
    fontWeight: '500',
    top:4
  },
  signupButton: {
    height: 55,
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
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
    color: '#757575',
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 46,
  },
  bottomText: {
    fontSize: 14,
    color: '#757575',
    bottom:10
  },
});

export default SignUpScreen;
