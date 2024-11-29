import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Linking, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const ContactActions = ({ contactDetails }) => {
  
  const makePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // Function to open WhatsApp
  const openWhatsApp = (whatsappNumber) => {
    const url = `whatsapp://send?phone=${whatsappNumber}`;
    Linking.openURL(url);
  };

  // Function to open Telegram
  const openTelegram = (telegramLink) => {
    Linking.openURL(telegramLink);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Phone Call Button */}
        <TouchableOpacity
          onPress={() => makePhoneCall(contactDetails?.mobile_no_1 ?? '')}
          style={styles.iconCard('black')}
        >
          <Image
            source={require('./assets/images/call.png')} // Replace with your actual PNG image path
            // ./assets/images/call.png
            style={styles.icon}
            tintColor={'black'}
          />
        </TouchableOpacity>

        {/* WhatsApp Button */}
        <TouchableOpacity
          onPress={() => openWhatsApp(contactDetails?.whatsapp_no ?? '')}
          style={styles.iconCard('green')}
        >
          <Image
            source={require('./assets/images/whatsapp.png')} // Replace with your actual PNG image path
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Telegram Button */}
        <TouchableOpacity
          onPress={() => openTelegram(contactDetails?.telegram_no ?? '')}
          style={styles.iconCard('blue')}
        >
          <Image
            source={require('./assets/images/telegram.png')} // Replace with your actual PNG image path
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: screenWidth * 0.8, // Adjust width
    padding: 10,
  },
  iconCard: (color) => ({
    backgroundColor: 'white',
    borderColor:  color,
    borderWidth: 2,  // Add border width
    borderRadius: 50,
    elevation: 3,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  }),
  
  icon: {
    width: 40,
    height: 40,
  },
});

export default ContactActions;
