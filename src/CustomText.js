import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({
  text,
  style = {},
  textAlign = 'left', // Default alignment
  overflow = 'ellipsis', // Default overflow behavior
  numberOfLines = 1, // Default max lines
}) => {
  return (
    <Text
      style={[styles.defaultTextStyle, style, { textAlign }]} // Combine default and passed styles
      numberOfLines={numberOfLines}
      ellipsizeMode={overflow} // Handle overflow with ellipsis
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    // You can add any default style here
    fontSize: 14, // Example default font size
  },
});

export default CustomText;
