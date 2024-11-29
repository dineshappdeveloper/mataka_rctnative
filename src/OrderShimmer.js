import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const OrderShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Shimmer for top-left element */}
        <ShimmerPlaceHolder
          style={[styles.shimmerBox, { width: '35%' }]}
        />
        {/* Spacer */}
        <View style={{ flex: 1 }} />
        {/* Shimmer for top-right element */}
        <ShimmerPlaceHolder
          style={[styles.shimmerBox, { width: '35%' }]}
        />
      </View>
      
      <View style={styles.spacing} />

      {/* Center shimmer */}
      <View style={styles.centerAlign}>
        <ShimmerPlaceHolder
          style={[styles.shimmerBox, { width: '65%' }]}
        />
      </View>
      
      <View style={styles.spacing} />

      {/* Another Center shimmer */}
      <View style={styles.centerAlign}>
        <ShimmerPlaceHolder
          style={[styles.shimmerBox, { width: '65%' }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 7,
    backgroundColor: 'rgba(211, 211, 211, 0.1)', // Light grey with opacity
    paddingHorizontal: '2%',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shimmerBox: {
    height: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.3)', // Grey color with opacity
  },
  spacing: {
    height: 10, // Equivalent to `context.mheight(0.01)`
  },
  centerAlign: {
    alignItems: 'center',
  },
});

export default OrderShimmer;
