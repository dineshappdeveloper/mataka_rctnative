import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, Animated } from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;  // Get screen width
const PAGE_HEIGHT = PAGE_WIDTH / 2;  // Adjust image height to half the width

const CustomCarousel = ({ imgList }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // To keep track of the current image
  const flatListRef = useRef(null);  // To reference FlatList for programmatic scroll
  const scrollX = useRef(new Animated.Value(0)).current;  // For scroll position tracking
  const numItems = imgList.length;

  // Handle autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [currentIndex]); // Make sure to re-run when currentIndex changes

  // Scroll to the next image
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % numItems;  // Loop back to the first image
    if (nextIndex >= 0 && nextIndex < numItems) {  // Ensure nextIndex is within range
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
    }
  };

  // Handle FlatList scroll events
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderSliderItem = ({ item, index }) => (
    <View style={styles.sliderItem}>
      <Image source={{ uri: item.image }} style={styles.sliderImage} />
    </View>
  );

  // Handle FlatList momentum scroll
  const onMomentumScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / PAGE_WIDTH);
    if (index >= 0 && index < numItems) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={imgList}
        renderItem={renderSliderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: PAGE_WIDTH,
          offset: PAGE_WIDTH * index,
          index,
        })}
      />

      {/* Page Indicator */}
      <View style={styles.pageIndicatorContainer}>
        {imgList.map((_, index) => {
          const dotWidth = index === currentIndex ? 16 : 8; // Larger dot for the active page
          return <View key={index} style={[styles.pageIndicator, { width: dotWidth }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderItem: {
    width: PAGE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT, // Adjust height as needed
    resizeMode: 'cover',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  pageIndicator: {
    height: 8,
    marginHorizontal: 3,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export default CustomCarousel;
