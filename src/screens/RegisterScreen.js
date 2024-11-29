import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Custom assets and utilities
import AppColors from '../constants/AppColors';
import AppStyles from '../component/AppStyles';
import { CustomButton } from '../component/CustomButton';
import { hideKeyboard } from '../utils/KeyboardHelper';
import Repository from '../repository/Repository';
import { LoadingModal } from '../utils/LoadingModal';
import { showSnackbar } from '../utils/snackbarHelper';
import CustomTextField from '../CustomTextField';
import CustomAlert from '../component/CustomAlert';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  // Local state to manage form inputs and errors
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    let isValid = true;
    const errorMessages = {};

    if (!name.trim()) {
      isValid = false;
      errorMessages.name = 'Full name is required';
    }

    if (!mobile.trim()) {
      isValid = false;
      errorMessages.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      isValid = false;
      errorMessages.mobile = 'Mobile number must be 10 digits';
    }

    if (!password.trim()) {
      isValid = false;
      errorMessages.password = 'Password is required';
    } else if (password.length < 4) {
      isValid = false;
      errorMessages.password = 'Password must be at least 4 characters';
    }

    if (!confirmPassword.trim()) {
      isValid = false;
      errorMessages.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      isValid = false;
      errorMessages.confirmPassword = 'Passwords do not match';
    }

    setErrors(errorMessages);
    return isValid;
  };

  // Handle Register
  const handleRegister = async () => {
    hideKeyboard();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await Repository.signupUser({
          full_name: name,
          mobile: mobile,
          pin: '1234',
          password: password,
        });
        setIsLoading(false);

        if (response.code === '100' && response.status === 'success') {
          navigation.navigate('OTPScreen', {
            mobileNumber: mobile,
            status: 1,
          });
        } else {
          showAlert(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        showSnackbar('An error occurred during registration');
        showAlert('An error occurred during registration');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={[AppStyles.h1, styles.header]}>Register Account</Text>

        {/* Full Name */}
        <CustomTextField
          hintText="Full Name"
          icon={require('../assets/images/user.png')}
          controller={{
            value: name,
            onChangeText: setName,
          }}
          enable={true}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Mobile No */}
        <CustomTextField
          hintText="Mobile No"
          icon={require('../assets/images/phone.png')}
          keyboardType="numeric"
          controller={{
            value: mobile,
            onChangeText: setMobile,
          }}
          maxLength={10}
          enable={true}
        />
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

        {/* Password */}
        <CustomTextField
          hintText="Password"
          icon={require('../assets/images/password.png')}
          obscureText={true}
          controller={{
            value: password,
            onChangeText: setPassword,
          }}
          maxLength={16}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirm Password */}
        <CustomTextField
          hintText="Confirm Password"
          icon={require('../assets/images/password.png')}
          obscureText={true}
          controller={{
            value: confirmPassword,
            onChangeText: setConfirmPassword,
          }}
          maxLength={16}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
        <View style={{ marginTop: 32 }}></View>
        {/* Register Button */}
        <CustomButton name="Register" onPress={handleRegister} />

        {/* Already Registered? */}
        <Text style={styles.footerText}>
          Already registered?{' '}
          <Text
            style={styles.linkText}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] })
            }
          >
            Login Here
          </Text>
        </Text>

        <LoadingModal visible={isLoading} />
        <CustomAlert visible={alertVisible} message={alertMessage} onClose={hideAlert} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  header: {
    color: AppColors.primary,
    fontWeight: '900',
    fontSize: 31,
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  linkText: {
    color: AppColors.primary,
    fontWeight: '700',
  },

});

export default RegisterScreen;
