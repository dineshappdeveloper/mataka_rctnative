import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import AppColors from './constants/AppColors';

const WebViewScreen = () => {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { url } = route.params; 

  useEffect(() => {
    console.log("url:",url);
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const injectedJavaScript = `
  (function() {
    document.cookie = "cookie_name=cookie_value; path=/";
  })();
  true;
`;

  const handleHttpError = (event) => {
    setLoading(false);
    Alert.alert('Error', `There was an error loading the page: ${event.nativeEvent.description}`);
  };

  
  const handleJavaScriptMessage = (message) => {
    Alert.alert('JavaScript Message', message);
  };

  return (
    <WebView
        source={{ uri: url }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleHttpError}
        onHttpError={handleHttpError}
        javaScriptEnabled={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => handleJavaScriptMessage(event.nativeEvent.data)}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
  },
});

export default WebViewScreen;
