import { Alert } from 'react-native';
import PreferenceManager from './PreferenceManager';
import { TOKEN } from './utils/constants';

class NetworkApiServices {

  static async getApi(url) {
    let responseJson;
    console.log('Url is ->> ' + url);

    const mtoken = await PreferenceManager.get(TOKEN);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...(mtoken ? { 'token': mtoken } : {}),
        },
      });

      console.log(response.status);
      responseJson = await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }

    return responseJson;
  }

  static async postApi(data, url) {
    let jsonResponse;
    console.log("url is ----------" + url);
    console.log("data is ----------" + JSON.stringify(data));

    const mtoken = await PreferenceManager.get(TOKEN);
    console.log("token is ----------" + mtoken);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(mtoken ? { 'token': mtoken } : {}),
        },
        body: new URLSearchParams(data).toString(),
      });

      jsonResponse = await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }

    return jsonResponse;
  }

  static async putApi(data, url) {
    console.log("App url is --> " + url);
    console.log("App Data is --> " + JSON.stringify(data));

    const mtoken = await Utils.getToken();
    let jsonResponse;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${mtoken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      jsonResponse = await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }

    return jsonResponse;
  }

  static async deleteApi(url) {
    console.log("my url ***>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<**** " + url);

    const mtoken = await Utils.getToken();
    let responseJson;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mtoken}`,
        },
      });

      responseJson = await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }

    return responseJson;
  }

  static async pomatakaultipartApi(data, image, url) {
    console.log("my url is " + url + " " + data + " " + image);

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    if (image) {
      formData.append('aadharCardImg', {
        uri: image,
        type: 'image/jpeg', // Adjust the image type based on the file
        name: 'aadharCardImg.jpg',
      });
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }
  }

  static async putMultipartApi(data, image, url) {
    console.log("my url is " + url + " " + data + " " + image);

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    if (image) {
      formData.append('profile', {
        uri: image,
        type: 'image/jpeg', // Adjust the image type based on the file
        name: 'profile.jpg',
      });
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      return await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }
  }

  static async addProductMultipart(data, imglist, url) {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    imglist.forEach((image, index) => {
      formData.append(`productImage${index + 1}`, {
        uri: image,
        type: 'image/jpeg', // Adjust the image type based on the file
        name: `productImage${index + 1}.jpg`,
      });
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }
  }

  static async patchApi(data, url) {
    console.log("patch url *******" + url);
    console.log("patch url *******" + JSON.stringify(data));

    const mtoken = await Utils.getToken();
    let responseJson;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${mtoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      responseJson = await this.returnResponse(response);

    } catch (error) {
      if (error.message.includes('Network request failed')) {
        throw new Error("No Internet");
      } else if (error.message.includes('timeout')) {
        throw new Error("Timeout");
      } else {
        throw new Error("Server Exception");
      }
    }

    return responseJson;
  }

  static async returnResponse(response) {
    switch (response.status) {
      case 200:
      case 201:
        return await response.json();

      case 400:
        throw new Error("Invalid Url Exception");

      case 404:
        throw new Error("Invalid Url Exception");

      default:
        throw new Error("Fetch Data Exception");
    }
  }
}

export default NetworkApiServices;
