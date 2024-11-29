import React, { useState, useContext, createContext, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Utils } from '../Utils'; // Custom utility file for helpers like showLoading, hideLoading
import { Repository } from '../repository/Repository'; // API calls handler
import { PreferenceManager } from '../PreferenceManager'; // 
import RouteName from '../RouteName';

// Create Context
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const navigation = useNavigation();

  // States
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    loginMobile: '',
    loginPassword: '',
  });

  // Repository instance
  const repository = new Repository();

  // Timer for OTP Resend
  const startTimer = () => {
    setCanResend(false);
    setSecondsRemaining(30);

    let interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handlers for Input
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // User Login
  const loginUser = async () => {
    Keyboard.dismiss();
    const { loginMobile, loginPassword } = formData;

    if (!loginMobile || loginMobile.length !== 10) {
      Utils.showSnackbar('Please Enter a valid Mobile Number');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      Utils.showSnackbar('Password must be at least 4 characters');
      return;
    }

    Utils.showLoading();
    const request = { mobile: loginMobile, password: loginPassword };

    try {
      repository.loginUser()
      const model = await repository.loginUser(request);
      if (model.code === '101') {
        await PreferenceManager.saveString('TOKEN', model.data?.token || '');
        await PreferenceManager.saveString('MOBILE', loginMobile);
        verifyPin();
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  // Verify PIN
  const verifyPin = async () => {
    const request = { pin: '1234' };

    try {
      const model = await repository.verifyPin(request);
      if (model.code === '101') {
        await PreferenceManager.saveString('TOKEN', model.data?.token || '');
        navigation.reset({
          index: 0,
          routes: [{ name: RouteName.dashboardScreen }],
        });
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // User Registration
  const registerUser = async () => {
    Keyboard.dismiss();
    const { name, mobile, password, confirmPassword } = formData;

    if (!name) {
      Utils.showSnackbar('Please Enter Name');
      return;
    }
    if (!mobile || mobile.length !== 10) {
      Utils.showSnackbar('Please Enter a valid Mobile Number');
      return;
    }
    if (!password || password.length < 4) {
      Utils.showSnackbar('Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      Utils.showSnackbar('Passwords do not match');
      return;
    }

    Utils.showLoading();
    const request = { full_name: name, mobile, pin: '1234', password };

    try {
      const model = await repository.signupUser(request);
      if (model.code === '100') {
        navigation.navigate(RouteName.otpScreen, { type: 'register' });
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  // Verify OTP
  const verifyUser = async () => {
    Keyboard.dismiss();
    const { mobile } = formData;

    if (!otp || otp.length !== 4) {
      Utils.showSnackbar('Please Enter a valid OTP');
      return;
    }

    Utils.showLoading();
    const request = { mobile, otp };

    try {
      const model = await repository.verifyUser(request);
      if (model.code === '100') {
        await PreferenceManager.saveString('TOKEN', model.data?.token || '');
        navigation.reset({
          index: 0,
          routes: [{ name: RouteName.dashboardScreen }],
        });
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    Keyboard.dismiss();
    const { mobile } = formData;

    Utils.showLoading();
    const request = { mobile };

    try {
      const model = await repository.resendOTP(request);
      if (model.status === '100') {
        startTimer();
      }
      Utils.showSnackbar(model.message || '');
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  // Forgot Password
  const forgotPassword = async () => {
    Keyboard.dismiss();
    const { mobile } = formData;

    if (!mobile || mobile.length !== 10) {
      Utils.showSnackbar('Please Enter a valid Mobile Number');
      return;
    }

    Utils.showLoading();
    const request = { mobile };

    try {
      const model = await repository.forgotPassword(request);
      if (model.code === '100') {
        navigation.navigate(RouteName.otpScreen, { type: 'forgot' });
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  // Verify OTP for Forgot Password
  const verifyForgotOTP = async () => {
    Keyboard.dismiss();
    const { mobile } = formData;

    if (!otp || otp.length !== 4) {
      Utils.showSnackbar('Please Enter a valid OTP');
      return;
    }

    Utils.showLoading();
    const request = { mobile, otp };

    try {
      const model = await repository.verifyOtpForgotPassword(request);
      if (model.code === '100') {
        await PreferenceManager.saveString('TOKEN', model.data?.token || '');
        await PreferenceManager.saveString('MOBILE', mobile);
        navigation.navigate(RouteName.createPasswordScreen);
      } else {
        Utils.showSnackbar(model.message || '');
      }
    } catch (error) {
      console.error(error);
    } finally {
      Utils.hideLoading();
    }
  };

  return (
    <LoginContext.Provider
      value={{
        secondsRemaining,
        canResend,
        otp,
        setOtp,
        formData,
        handleInputChange,
        loginUser,
        registerUser,
        verifyUser,
        resendOTP,
        forgotPassword,
        verifyForgotOTP,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
