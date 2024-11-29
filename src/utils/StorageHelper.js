// StorageHelper.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieve a token from AsyncStorage.
 * @returns {Promise<string | null>} - The retrieved token or null if not available.
 */
export const getToken = async () => {
  try {
    return (await AsyncStorage.getItem('TOKEN')) || null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
