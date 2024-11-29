import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import OTPScreen from './OTPScreen';
import CreatePasswordScreen from './CreatePasswordScreen';
import WebViewScreen from './WebViewScreen';
import UpdatePasswordScreen from './UpdatePasswordScreen';
import ContactScreen from './ContactScreen';
import DashboardScreen from './DashboardScreen';
import RouteName from './RouteName';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteName.SPLASH_SCREEN}
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default Routes;