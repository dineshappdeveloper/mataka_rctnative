// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar, Alert, FlatList ,Image} from 'react-native';
import CustomDrawer from './CustomDrawer';
import useDashboardController from './useDashboardController';
import { useNavigation } from '@react-navigation/native';
import AppColors from './constants/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RouteName from './RouteName';
import Share from 'react-native-share';
import CustomAlert from './component/CustomAlert';
import ContactActions from './ContactActions';
import CustomCarousel from './CustomCarousel';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const DashboardScreen = () => {
  const { imgList, gameData, profileData, appData } = useDashboardController();
  console.log("dashboard:", profileData);
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

  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(AppColors.primary);
    if (profileData === "Please Login First" || gameData === "Please Login First" || appData === "Please Login First") {
      showAlert("Please Login First");
      handleLogout();
    } else {
      // everything is well
    }
  }, []);



  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({ index: 0, routes: [{ name: RouteName.SPLASH_SCREEN }] });
        },
      },
    ]);
  };

  //drawer code 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


  const renderGameItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('WebViewScreen', { url: item.chart_url });
        console.log(item.chart_url);
      }}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.cardText}>Open: {item.open_time}</Text>
        <Text style={styles.cardText}>Close: {item.close_time}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardResult}>{item.result}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      {/* Main Screen Content */}
      <View style={styles.mainContent}>

        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image source={require('./assets/images/menu.png')} style={{ height: 24, width: 24 }} tintColor={'white'} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kalyan Bazar</Text>
          <View />
        </View>
        {isLoading ? (
          <ShimmerPlaceHolder style={styles.shimmer} />
        ) : (
          <View style={styles.shimmer}>
            <CustomCarousel imgList={imgList} />
          </View>
        )}
        <View style={{ height: 120 }}>
          <ContactActions contactDetails={appData} />
        </View>

        <Image source={require("./assets/images/adimg.png")} style={{ width: '98%', height: 74, resizeMode: 'center', marginLeft: 4 }} />
        <View style={{ height: 16 }}></View>

        <FlatList
          data={gameData}
          renderItem={renderGameItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
        <CustomAlert visible={alertVisible} message={alertMessage} onClose={hideAlert} />
      </View>

      {/* Custom Drawer */}
      <CustomDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} profileData={profileData} appData={appData} navigation={navigation}/>

      {isDrawerOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
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
  drawerHeader: { alignItems: 'center', padding: 16, backgroundColor: '#6200EE' },
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