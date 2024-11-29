import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert,Image} from 'react-native';
import AppColors from './constants/AppColors';


const ContactScreen = ({route, navigation }) => {
  const { contactDetails} = route.params;

  

  const openWhatsApp = async (phone) => {
    const whatsappUrl = `https://wa.me/${phone}`;
    await Linking.openURL(whatsappUrl);
  };

  const makePhoneCall = async (number) => {
    const phoneUrl = `tel:${number}`;
    await Linking.openURL(phoneUrl);
  };

  const openTelegram = async (url) => {
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight:8}}>
          <View >
          <Image source={require("./assets/images/back.png")} tintColor={AppColors.white} />
          </View>
        
        </TouchableOpacity>
        <Text style={styles.title}>Contact Us</Text>
      </View>

      {/* Buttons */}
      <View style={styles.content}>
        {/* Call Now */}
        <TouchableOpacity style={styles.card} onPress={() => makePhoneCall(contactDetails.mobile_no_1)}>
          <View style={[styles.iconContainer, { backgroundColor: 'white' }]}>
          
            <Image source={require('./assets/images/call.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          </View>
          <Text style={styles.cardText}>Call Now</Text>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity style={[styles.card, { backgroundColor: 'green' }]} onPress={() => openWhatsApp(contactDetails.whatsapp_no)}>
          <View style={[styles.iconContainer, { backgroundColor: 'white' }]}>
          <Image source={require('./assets/images/whatsapp.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          </View>
          <Text style={styles.cardText}>WhatsApp</Text>
        </TouchableOpacity>

        {/* Telegram */}
        <TouchableOpacity style={[styles.card, { backgroundColor: 'blue' }]} onPress={() => openTelegram(contactDetails.telegram_no)}>
          <View style={[styles.iconContainer, { backgroundColor: 'white' }]}>
          <Image source={require('./assets/images/telegram.png')} style={{ height: 24, width: 24 }} resizeMode="contain" />
          </View>
          <Text style={styles.cardText}>Telegram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    padding: 16,
  },
  backButton: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    borderRadius: 50,
    elevation: 3,
    width: '70%',
    height: 60,
    marginBottom: 15,
    padding: 10,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactScreen;
