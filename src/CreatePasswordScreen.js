import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from './CustomTextField';
import { LoadingModal } from './utils/LoadingModal';
import { CustomButton } from './component/CustomButton';
import Repository from './repository/Repository';
import AppColors from './constants/AppColors';

const CreatePasswordScreen = ({ route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const mobileNumber = route.params?.mobileNumber || '';

  const handleChangePassword = async () => {
    // Reset error states
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    if (password.trim() === '') {
      setPasswordError('Please enter a password.');
      return;
    }

    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password do not match.');
      return;
    }

    const request = {
      mobile: mobileNumber, // Replace with logic to get mobile number
      password: password,
    };

    setIsLoading(true);
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
        setGeneralError(response.message || 'An error occurred.');
      }
    } catch (error) {
      setIsLoading(false);
      setGeneralError('Failed to change password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Password</Text>

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

        <CustomButton name="Reset Password" onPress={handleChangePassword} />
        <LoadingModal visible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 31,
    fontWeight: '900',
    color: AppColors.primary, // Replace with your primary color
    marginBottom: 20,
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

export default CreatePasswordScreen;
