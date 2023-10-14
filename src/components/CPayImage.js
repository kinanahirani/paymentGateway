import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const CPayImage = () => {
  return (
    <Image
      source={require('../assets/images/pay.jpg')}
      style={{width: 300, height: 300}}
    />
  );
};

export default CPayImage;

const styles = StyleSheet.create({});
