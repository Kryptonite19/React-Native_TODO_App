import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

import logo from '../../assets/images/logo1.png';

const SplashScreen = ({ navigation }) => {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration:2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Tasks');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity }]}>
        <Image source={logo} resizeMode="contain" style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
