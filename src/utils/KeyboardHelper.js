// KeyboardHelper.js
import { Keyboard } from 'react-native';

/**
 * Hide the keyboard if open.
 */
export const hideKeyboard = () => {
  Keyboard.dismiss();
};
