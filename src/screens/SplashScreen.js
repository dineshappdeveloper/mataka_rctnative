import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PreferenceManager from '../PreferenceManager';
import { TOKEN } from '../utils/constants';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set the status bar color and style
    StatusBar.setBackgroundColor('black', true);
    StatusBar.setBarStyle('light-content', true);

    const checkTokenAndNavigate = async () => {
      try {
        const token = await PreferenceManager.get(TOKEN);
        console.log('Token:', token);

        if (token) {
          console.log('Navigating to DashboardScreen');
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
          });
        } else {
          console.log('Navigating to RegisterScreen');
          navigation.reset({
            index: 0,
            routes: [{ name: 'RegisterScreen' }],
          });
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    // Delay navigation for splash effect
    const timer = setTimeout(checkTokenAndNavigate, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '30%',
  },
});

export default SplashScreen;
