import axios from 'axios';
import AppUrl from '../AppUrl';
import qs from 'qs'; // Query string library to encode data
import PreferenceManager from '../PreferenceManager';
import { TOKEN } from '../utils/constants';
import NetworkApiServices from '../NetworkApiServices';
import { showSnackbar } from '../utils/snackbarHelper';
import { Alert } from 'react-native';

class Repository {
  async loginUser(data) {
    try {
      console.log("Making API call to:", AppUrl.loginApi);
      console.log("Request payload:", data);
      const encodedData = qs.stringify(data);
      const response = await axios.post(AppUrl.loginApi, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000,
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async verifyPin(data) {
    try {
      const mtoken = await PreferenceManager.get(TOKEN);
      console.log("AppUrl.loginPinApi:", AppUrl.loginPinApi);
      console.log("Request payload:", data);
      console.log("Token To use for loginPinApi:", mtoken);
      const encodedData = qs.stringify(data);
      const response = await axios.post(AppUrl.loginPinApi, encodedData, {
        headers: {
          "Token": mtoken
        },
        timeout: 60000,
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async signupUser(data) {
    try {
      console.log("Making API call to:", AppUrl.signupApi);
      console.log("Request payload:", data);

      // Convert the data object to a URL-encoded string
      const encodedData = qs.stringify(data);

      // Send the POST request with application/x-www-form-urlencoded
      const response = await axios.post(AppUrl.signupApi, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000, // Set timeout to 60 seconds
      });

      console.log("API response:", response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error; // Throw error to be handled by the caller
    }
  }

  async resendOTP(data) {
    try {
      console.log("Making API call to:", AppUrl.resendOTPApi);
      console.log("Request payload:", data);
      const mtoken = await PreferenceManager.get(TOKEN);
      // Convert the data object to a URL-encoded string
      const encodedData = qs.stringify(data);
      const response = await axios.post(AppUrl.resendOTPApi, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Token": mtoken
        },
        timeout: 60000, // Set timeout to 60 seconds
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async forgotPassword(data) {
    try {
      console.log("Making API call to:", AppUrl.forgotPasswordApi);
      console.log("Request payload:", data);
      // Convert the data object to a URL-encoded string
      const encodedData = qs.stringify(data);
      const mtoken= await PreferenceManager.get(TOKEN);
      const response = await axios.post(AppUrl.forgotPasswordApi, encodedData, {
        headers: {
          "Token": mtoken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000, // Set timeout to 60 seconds
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async changePassword(data) {
    try {
      console.log("Making API call to:", AppUrl.createPasswordApi);
      console.log("Request payload:", data);
      const encodedData = qs.stringify(data);
      const mtoken= await PreferenceManager.get(TOKEN);
      const response = await axios.post(AppUrl.createPasswordApi, encodedData, {
        headers: {
          "Token": mtoken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000, 
      });
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async verifyOtpForgotPassword(data) {
    try {
      console.log("Making API call to:", AppUrl.verifyOTPForgotPasswordApi);
      console.log("Request payload:", data);
      const mtoken= await PreferenceManager.get(TOKEN);
      const encodedData = qs.stringify(data);
      const response = await axios.post(AppUrl.verifyOTPForgotPasswordApi, encodedData, {
        headers: {
          "Token": mtoken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000, // Set timeout to 60 seconds
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async verifyUser(data) {
    try {
      console.log("Making API call to:", AppUrl.verifyUserApi);
      console.log("Request payload:", data);
      const encodedData = qs.stringify(data);
      const response = await axios.post(AppUrl.verifyUserApi, encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000,
      });

      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async getAppDetails() {
    try {
      console.log("Making API call to:", AppUrl.appDetailsApi);
      const response = await axios.get(AppUrl.appDetailsApi);
      console.log("getAppDetails  response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }


  async getProfile() {
    try {
      console.log("Making API call to:", AppUrl.getProfileApi);
      const mtoken = await PreferenceManager.get(TOKEN);
      console.log("Making API call to:", mtoken);
      const response = await axios.get(AppUrl.getProfileApi, {
        headers: {
          token: mtoken
        },
        timeout: 60000,
      });
      console.log("getProfile responses:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }

  async getGame() {
    try {
      console.log("AppUrl.gameListApi :", AppUrl.gameListApi);
      const response = await NetworkApiServices.getApi(AppUrl.gameListApi)
      console.log("Response AppUrl.gameListApi :", response);
      return response;
    } catch (error) {
      console.error("Error during API call:", error?.response?.data || error.message);
      throw error;
    }
  }
}

export default new Repository();
