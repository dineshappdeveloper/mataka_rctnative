import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AppColors from '../constants/AppColors';

// Custom Button Component
const CustomButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.customButton}>
      <Text style={styles.customButtonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: '100%',
    backgroundColor: AppColors.primary, 
    borderRadius: 51,
    paddingVertical: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButtonText: {
    fontSize: 15,
    color: '#fff', 
    fontWeight: '600',
  },
});

export { CustomButton };