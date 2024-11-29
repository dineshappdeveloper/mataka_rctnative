import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import Routes from './src/Routes'; // Assuming the path is correct
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/OTPScreen';
import DashboardScreen from './src/DashboardScreen';
import PreferenceManager from './src/PreferenceManager';
import { TOKEN } from './src/utils/constants';
import RouteName from './src/RouteName';
import ContactScreen from './src/ContactScreen';
import UpdatePasswordScreen from './src/UpdatePasswordScreen';
import WebViewScreen from './src/WebViewScreen';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import CreatePasswordScreen from './src/CreatePasswordScreen';

const Stack = createStackNavigator();

const App = () => {
  const [status, setStatus] = useState(null); // Store the token state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const getToken = async () => {
    try {
      const token = await PreferenceManager.get(TOKEN);
      console.log("Token", token);
      setStatus(token);
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      setIsLoading(false); // Loading complete
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); // Dark status bar text color
    StatusBar.setBackgroundColor('#FFFFFF'); // Set status bar background to white
    getToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={RouteName.SPLASH_SCREEN}
          screenOptions={{
            headerShown: false, // Hide header for all screens
          }}
        >
          <Stack.Screen name="/" component={SplashScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ContactScreen" component={ContactScreen} />
          <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
          {/* Main App Routes */}
          <Stack.Screen name="Main" component={Routes} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
