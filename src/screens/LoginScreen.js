import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../RouteName';
import AppColors from '../constants/AppColors';
import { CustomButton } from '../component/CustomButton';
import Repository from '../repository/Repository';
import { showSnackbar } from '../utils/snackbarHelper';
import { hideKeyboard } from '../utils/KeyboardHelper';
import { LoadingModal } from '../utils/LoadingModal';
import PreferenceManager from '../PreferenceManager';
import { MOBILE, TOKEN } from '../utils/constants';
import CustomTextField from '../CustomTextField';
import CustomAlert from '../component/CustomAlert';

const LoginScreen = () => {
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

  // States
  const [formData, setFormData] = useState({
    loginMobile: '',
    loginPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Handlers for Input
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: '' }); // Clear error for the specific field
  };

  // Form Validation
  const validateForm = () => {
    const { loginMobile, loginPassword } = formData;
    let isValid = true;
    const newErrors = {};

    if (!loginMobile || loginMobile.length !== 10) {
      newErrors.loginMobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (!loginPassword || loginPassword.length < 4 || loginPassword.length > 16) {
      newErrors.loginPassword = 'Password must be between 4 and 16 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // User Login
  const loginUser = async () => {
    hideKeyboard();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const { loginMobile, loginPassword } = formData;
    const request = { mobile: loginMobile, password: loginPassword };
    try {
      const model = await Repository.loginUser(request);
      if (model.code === '101') {
        console.log('LOGIN TIME TOKEN:', model.data?.token || '');
        await PreferenceManager.save(TOKEN, model.data?.token || '');
        await PreferenceManager.save(MOBILE, loginMobile);
        loginPin();
      } else {
        showAlert(model.message);
        console.log(model.message);
        showSnackbar(model.message);
      }
    } catch (error) {
      showSnackbar('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const loginPin = async () => {
    setIsLoading(true);
    const request = { pin: '1234' };
    try {
      const model = await Repository.verifyPin(request);
      if (model.code === '101') {
        await PreferenceManager.save(TOKEN, model.data?.token || '');
        navigation.reset({
          index: 0,
          routes: [{ name: RouteName.DASHBOARD_SCREEN }],
        });
      } else {
        showAlert(model.message);
        console.log(model.message);
        showSnackbar(model.message);
      }
    } catch (error) {
      showSnackbar('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Login Here</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Mobile Number */}
        <CustomTextField
          hintText="Mobile No"
          icon={require('../assets/images/phone.png')}
          keyboardType="numeric"
          controller={{
            value: formData.loginMobile,
            onChangeText: (text) => handleInputChange('loginMobile', text),
          }}
          maxLength={10}
        />
        {errors.loginMobile && <Text style={styles.errorText}>{errors.loginMobile}</Text>}

        {/* Password */}
        <CustomTextField
          hintText="Password"
          icon={require('../assets/images/password.png')}
          obscureText={true}
          controller={{
            value: formData.loginPassword,
            onChangeText: (text) => handleInputChange('loginPassword', text),
          }}
        />
        {errors.loginPassword && <Text style={styles.errorText}>{errors.loginPassword}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 32 }}></View>
        <CustomButton name="Login" onPress={loginUser} />

        <View style={styles.registerContainer}>
          <Text>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(RouteName.REGISTER_SCREEN)}>
            <Text style={styles.registerLink}> Register</Text>
          </TouchableOpacity>
        </View>
        <LoadingModal visible={isLoading} />
        <CustomAlert visible={alertVisible} message={alertMessage} onClose={hideAlert} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  headerContainer: { marginBottom: 30 },
  title: { fontSize: 30, fontWeight: 'bold', color: AppColors.primary },
  formContainer: { marginTop: 20 },
  forgotPassword: { textAlign: 'right', color: AppColors.primary, fontWeight: 'bold', marginBottom: 20 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  registerLink: { color: AppColors.primary, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5, marginLeft: 5 },
});

export default LoginScreen;
