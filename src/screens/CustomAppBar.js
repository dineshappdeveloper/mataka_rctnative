import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'; // Icon library, e.g., Ionicons

const CustomAppBar = ({ title }) => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} /> {/* Placeholder for alignment */}
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#007BFF', // Replace with your primary color
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff', // Replace with your white color
    fontSize: 20, // Adjust size as per `h1` style
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Center the title while leaving space for the back icon
  },
  placeholder: {
    width: 24, // Space matching the back icon for alignment
  },
});

export default CustomAppBar;
