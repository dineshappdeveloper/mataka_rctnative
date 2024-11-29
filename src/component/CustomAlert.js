import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppColors from '../constants/AppColors';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darkened overlay for focus
  },
  alertContainer: {
    backgroundColor: '#ffffff', // White background for a clean look
    padding: 30,
    borderRadius: 15, // Rounded corners for a modern touch
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000', // Adding shadow to give depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Elevation for Android
  },
  alertMessage: {
    fontSize: 20,
    fontWeight: '600', // Bolder text for better readability
    marginBottom: 25,
    textAlign: 'center',
    color: '#333', // Dark gray text for better contrast
  },
  button: {
    backgroundColor:AppColors.primary, // Blue color for a premium feel
    paddingVertical: 12,
    paddingHorizontal: 64,
    borderRadius: 50, // Fully rounded button for a modern look
    borderWidth: 1,
    borderColor: '#007bff', // Border color matching the button
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600', // Bold button text for emphasis
  },
});

export default CustomAlert;
