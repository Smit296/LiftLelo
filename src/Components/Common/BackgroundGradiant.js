import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const BackgroundGradiant = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/gradient-fluid-background_23-2149121103.jpg?w=1380&t=st=1716278606~exp=1716279206~hmac=894e91a8f4852df7cc1ae8695f9294a8a389d7c0f97a858d72e93a7dd33ef221',
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 250, // adjust based on your design
    zIndex: -1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default BackgroundGradiant;
