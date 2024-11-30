import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import AppColors from './constants/AppColors';


const PAGE_WIDTH = Dimensions.get('window').width;  // Get screen width
const PAGE_HEIGHT = PAGE_WIDTH / 2;  // Adjust image height to half the width
const CustomCarousel = ({imgList}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % imgList.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setActiveIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [activeIndex, screenWidth]);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {imgList.map((image, index) => (
          <Image key={index} source={{ uri: image.image }} style={[styles.image, { width: PAGE_WIDTH }]} />
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {imgList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: activeIndex === index ? AppColors.lightPrimary : '#ddd' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,marginTop:2,
  },
  image: {
    height: PAGE_HEIGHT,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default CustomCarousel;