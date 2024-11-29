import AsyncStorage from '@react-native-async-storage/async-storage';

class PreferenceManager {
  /**
   * Save a value (string, number, or boolean)
   * @param {string} key - The key to save the value under
   * @param {any} value - The value to save
   * @returns {Promise<boolean>} - Success status
   */
  static async save(key, value) {
    try {
      await AsyncStorage.setItem(key, value.toString());
      return true;
    } catch (error) {
      console.error('Error saving to preferences:', error);
      return false;
    }
  }

  /**
   * Retrieve a value (string, number, or boolean)
   * @param {string} key - The key to retrieve the value from
   * @returns {Promise<any | null>} - The retrieved value
   */
  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (error) {
      console.error('Error getting from preferences:', error);
      return null;
    }
  }

  /**
   * Clear all stored preferences
   * @returns {Promise<boolean>} - Success status
   */
  static async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing preferences:', error);
      return false;
    }
  }

  /**
   * Remove a specific preference by key
   * @param {string} key - The key to remove
   * @returns {Promise<boolean>} - Success status
   */
  static async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing preference:', error);
      return false;
    }
  }
}

export default PreferenceManager;
