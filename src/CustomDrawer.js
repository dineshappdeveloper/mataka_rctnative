// CustomDrawer.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image,Linking, Alert} from 'react-native';
import AppColors from './constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import PreferenceManager from './PreferenceManager';
import RouteName from './RouteName';
const screenWidth = Dimensions.get('window').width;
const CustomDrawer = ({ isOpen, toggleDrawer,profileData,appData,navigation }) => {
  const [animationValue] = useState(new Animated.Value(-screenWidth)); // Hidden initially

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isOpen ? 0 : -screenWidth, // Open to 0, close to off-screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleShare = () => {
    Share.open({ message: `'Check out this amazing app! '${appData?.app_link}`}).catch(console.error);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        onPress: async () => {
          await PreferenceManager.clear();
          navigation.reset({ index: 0, routes: [{ name: RouteName.SPLASH_SCREEN }] });
        },
      },
    ]);
  };


  return (
    <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: animationValue }] }]}>
      <View style={styles.drawer}>
        <View style={styles.drawerHeader}>
          <Image
            source={{ uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' }}
            style={styles.drawerImage}
          />
          <Text style={styles.drawerText}>{profileData?.username ? profileData.username : "Guest User"}</Text>
          <Text style={styles.drawerSubText}>{profileData?.mobile ? profileData.mobile : "+91-1234567890"}</Text>
        </View>
        <TouchableOpacity style={styles.drawerItem} onPress={() =>  toggleDrawer()}>
          <Image source={require('./assets/images/home.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            toggleDrawer();
            navigation.navigate('ContactScreen', { contactDetails: appData?.contact_details });
          }}>
          <Image source={require('./assets/images/contact.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            toggleDrawer();
            navigation.navigate('UpdatePasswordScreen');
          }}>
          <Image source={require('./assets/images/update.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => {
          toggleDrawer();
          handleShare();
        }}>
          <Image source={require('./assets/images/share.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Share With Others</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={async () => {
         toggleDrawer();
          const url = 'http://development.smapidev.co.in/privacy_policy';
          try {
            await Linking.openURL(url);
          } catch (error) {
            console.error("An error occurred:", error);
            Alert.alert("Error", "Failed to open the URL. Please try again later.");
          }
        }}>
          <Image source={require('./assets/images/privacy.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={async () => {
         toggleDrawer();
          const url = 'http://development.smapidev.co.in/terms_and_conditions';
          try {
            await Linking.openURL(url);
          } catch (error) {
            console.error("An error occurred:", error);
            Alert.alert("Error", "Failed to open the URL. Please try again later.");
          }
        }}>
          <Image source={require('./assets/images/terms.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
          <Image source={require('./assets/images/logout.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          <Text style={styles.drawerItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.75, // Drawer width is 75% of the screen width
    backgroundColor: '#ffffff',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#6200ea',
  },
 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: AppColors.primary,
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  drawer: { flex: 1, backgroundColor: '#FFF' },
  drawerHeader: { alignItems: 'center', padding: 16, backgroundColor: AppColors.primary },
  drawerImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  drawerText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  drawerSubText: { color: '#FFF', fontSize: 14 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  drawerItemText: { marginLeft: 16, fontSize: 16, color: '#000' },
  shimmer: { height: 200, width: '98%', alignSelf: 'center', borderRadius: 8 },
  sliderItem: { alignItems: 'center', padding: 16 },
  sliderImage: { width: '100%', height: 150, borderRadius: 8 },
  list: { paddingHorizontal: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#3f3d3d',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    marginTop: 8
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  cardResult: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 5,
    letterSpacing: 2,
  },
});
