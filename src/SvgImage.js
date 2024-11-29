import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';  // You may use 'react-native-svg' with 'Svg' for other cases.

const SvgImage = ({ icon, height, width, color, voidCallback }) => {
  return (
    <TouchableOpacity onPress={voidCallback}>
      <SvgUri
        width={width}
        height={height}
        source={{uri: icon}} // SVG URI or Local Path
        fill={color} // Color applied to the SVG
      />
    </TouchableOpacity>
  );
};

export default SvgImage;
