import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from './CustomTextField'; // Adjust the import path
import AppColors from './constants/AppColors';
import { CustomButton } from './component/CustomButton';
import Repository from './repository/Repository';
import PreferenceManager from './PreferenceManager';
import { MOBILE } from './utils/constants';
import { LoadingModal } from './utils/LoadingModal';

const UpdatePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigation = useNavigation();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,16}$/;
    return regex.test(password);
  };

  const handleUpdatePassword = async () => {
    // Reset error states
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validation checks
    if (!trimmedPassword) {
      setPasswordError('Please enter a password.');
      return;
    }
    if (trimmedPassword.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      return;
    }
    if (!validatePassword(trimmedPassword)) {
      setPasswordError('Password must include at least one letter, one number, and one special character.');
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setConfirmPasswordError('Password and confirm password do not match.');
      return;
    }

    const mobile = await PreferenceManager.get(MOBILE);
    if (!mobile) {
      setGeneralError('Mobile number not found. Please log in again.');
      return;
    }

    setIsLoading(true);
    const request = {
      mobile,
      password: trimmedPassword,
    };

    try {
      const response = await Repository.changePassword(request);
      if (response.code === '100') {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      } else {
        setIsLoading(false);
        setGeneralError(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      setGeneralError('Failed to change password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Password</Text>

      {/* Password Input */}
      <CustomTextField
        hintText="Enter new password"
        controller={{
          value: password,
          onChangeText: setPassword,
        }}
        icon={require('./assets/images/home.png')} // Replace with your icon
        obscureText={true}
        maxLength={16}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Confirm Password Input */}
      <CustomTextField
        hintText="Re-enter new password"
        controller={{
          value: confirmPassword,
          onChangeText: setConfirmPassword,
        }}
        icon={require('./assets/images/home.png')} // Replace with your icon
        obscureText={true}
        maxLength={16}
      />
      {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

      {generalError ? <Text style={styles.generalErrorText}>{generalError}</Text> : null}

      <View style={{ height: 100 }} />
      <CustomButton name="Update Password" onPress={handleUpdatePassword} />
      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '4%',
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 40 : 20, // Adjust for iOS
  },
  header: {
    fontSize: 31,
    fontWeight: '900',
    color: AppColors.primaryColor, // Primary color, adjust based on your theme
    marginBottom: '7%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  generalErrorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UpdatePasswordScreen;
