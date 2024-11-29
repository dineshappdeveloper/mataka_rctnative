import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppColors from './constants/AppColors';

const CustomTextField = ({
  hintText,
  icon,
  controller,
  obscureText = false,
  keyboardType = 'default',
  enable = true,
  maxLength,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(obscureText);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" tintColor={AppColors.primary}/>
      </View>
      <View style={{ width: 10 }} />
      <TextInput
        editable={enable}
        value={controller?.value}
        onChangeText={(text) => controller?.onChangeText(text)}
        secureTextEntry={obscureText && isPasswordVisible}
        style={styles.textInput}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholder={hintText}
      />
      {obscureText && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={
              isPasswordVisible
                ? require('./assets/images/visibility_off.png') 
                : require('./assets/images/visibility.png') 
            }
            style={styles.visibilityIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.3)',
    paddingHorizontal: 10,
    paddingVertical:8,marginTop:8,
    marginBottom:8
  },
  iconContainer: {
    height: 35,
    width: 35,
    backgroundColor: AppColors.lightPrimary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 17,
    width: 17,
   
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  visibilityIcon: {
    height: 24,
    width: 24,
    tintColor: 'rgba(128, 128, 128, 0.7)',
  
  },
});

export default CustomTextField;

