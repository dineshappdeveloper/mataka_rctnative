import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from './CustomTextField';
import AppColors from './constants/AppColors';
import { CustomButton } from './component/CustomButton';
import { LoadingModal } from './utils/LoadingModal';
import Repository from './repository/Repository';
import RouteName from './RouteName';

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigation = useNavigation();

  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };

  const handleForgotPassword = async () => {
    // Reset error states
    setMobileError('');
    setGeneralError('');

    const trimmedMobile = mobile.trim();
    // Validate mobile number
    if (!trimmedMobile) {
      setMobileError('Please enter a mobile number.');
      return;
    }
    if (!validateMobile(trimmedMobile)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    const request = { mobile: trimmedMobile };
    try {
      const response = await Repository.forgotPassword(request);
      if (response.code === '100') {
        setIsLoading(false);
        navigation.navigate('OTPScreen', {
          mobileNumber: mobile,
          status: 2,
        });
      } else {
        setIsLoading(false);
        setGeneralError(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      setGeneralError('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      
      {/* Mobile Input */}
      <CustomTextField
        hintText="Mobile No"
        icon={require('./assets/images/phone.png')}
        keyboardType="numeric"
        controller={{
          value: mobile,
          onChangeText: setMobile,
        }}
        maxLength={10}
      />
      {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

      {generalError ? <Text style={styles.generalErrorText}>{generalError}</Text> : null}

      <View style={{ height: 100 }} />
      
      <CustomButton name="Submit" onPress={handleForgotPassword} />
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
    color: AppColors.primary, // Primary color, adjust based on your theme
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
  },
});

export default ForgotPasswordScreen;
