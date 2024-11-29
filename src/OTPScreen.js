// OTPScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import AppColors from './constants/AppColors';  // Adjust import paths as needed
import { CustomButton } from './component/CustomButton';  // Adjust import paths as needed
import Repository from './repository/Repository';
import { showSnackbar } from './utils/snackbarHelper';
import { useNavigation } from '@react-navigation/native';
import PreferenceManager from './PreferenceManager';
import { TOKEN } from './utils/constants';
import { LoadingModal } from './utils/LoadingModal';
import RouteName from './RouteName';

const { width, height } = Dimensions.get('window');

const OTPScreen = ({ route }) => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [status, setStatus] = useState(route.params?.status || 0);
  const mobileNumber = route.params?.mobileNumber || '';
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setCanResend(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleVerify = async () => {

    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    // Check if OTP has the correct format (4-digit numeric OTP as an example)
    const otpRegex = /^[0-9]{4}$/; // This regex is for a 4-digit numeric OTP. Adjust if needed.
    if (!otpRegex.test(otp)) {
      alert('Invalid OTP. Please enter a valid 4-digit OTP.');
      return;
    }


    if (status === 1) {
      console.log('Verify User');
      try {
        setIsLoading(true);
        const response = await Repository.verifyUser({
          mobile: mobileNumber,
          otp: otp,
        });

        if (response.code === '100' && response.status === 'success') {
          console.log(response.message);
          PreferenceManager.save(TOKEN, response.data.token);
          navigation.navigate('DashboardScreen', {});
          setIsLoading(false);
        } else {
          showSnackbar(response.message || 'Registration failed')
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('OTP  error:', error);
        showSnackbar('An error occurred during registration')
      }


    } else if (status === 2) {
      console.log('Verify User');
      try {
        setIsLoading(true);
        const response = await Repository.verifyOtpForgotPassword({
          mobile: mobileNumber,
          otp: otp,
        });

        if (response.code === '100' && response.status === 'success') {
          console.log(response.message);
          PreferenceManager.save(TOKEN, response.data.token);
          navigation.navigate(RouteName.CREATE_PASSWORD_SCREEN, { mobileNumber: mobileNumber });

          setIsLoading(false);
        } else {
          showSnackbar(response.message || 'Registration failed')
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('OTP  error:', error);
        showSnackbar('An error occurred during registration')
      }
    } else {

    }
  };

  const handleResendOTP = async () => {
    console.log("dsfhg")
    if (canResend) {
      const mobile = mobileNumber.trim();
      if (!mobile) {
        Alert.alert('Error', 'Please enter a valid mobile number.');
        return;
      }
      setIsLoading(true);
      try {
        const request = { mobile };
        const model = await Repository.resendOTP(request);
        if (model.code === '100') {
          setSecondsRemaining(30);
          Alert.alert('Success', model.message || 'OTP sent successfully!');
          showSnackbar(model.message || 'OTP sent successfully!')
          setIsLoading(false);
          setCanResend(false);
        } else {
          Alert.alert('Success',model.message || 'Failed to resend OTP.');
          showSnackbar(model.message || 'Failed to resend OTP.')
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert('Success',"Something went wrong. Please try again.");
        showSnackbar("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter OTP</Text>
      <Text style={styles.subHeaderText}>
        OTP has been sent to your mobile number {'\n'} +91{mobileNumber}
      </Text>

      <View style={styles.otpContainer}>
        <OTPTextInput
          inputStyles={styles.otpInput}
          handleTextChange={(otp) => setOtp(otp)}
          inputCount={4}
          tintColor={AppColors.primary}
        />
      </View>

      <View style={styles.resendContainer}>
        {canResend ? (
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Resend OTP?</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timerText}>00:{secondsRemaining}</Text>
        )}
      </View>

      <CustomButton name="Verify" onPress={() => {
        handleVerify();
      }} />
      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: 16
  },
  headerText: {
    fontSize: 31,
    fontWeight: '900',
    color: AppColors.primary,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: height * 0.02,
  },
  otpContainer: {
    marginTop: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    margin: 5,
  },
  resendContainer: {
    marginTop: height * 0.02,
    alignItems: 'flex-end',
    marginBottom: 16,
    marginRight: 8
  },
  resendText: {
    color: AppColors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  timerText: {
    color: AppColors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default OTPScreen;
