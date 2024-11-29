// snackbarHelper.js
import Snackbar from 'react-native-snackbar';

/**
 * Show a Snackbar with a message.
 * @param {string} message - The message to display.
 */
export const showSnackbar = (message) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: 'black',
    textColor: 'white',
  });
};
