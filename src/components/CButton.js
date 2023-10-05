import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const CButton = ({title, onPress, extraStyles}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, extraStyles]}
      activeOpacity={0.7}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'rgb(11, 127, 171)',
    width: horizontalScale(200),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  txt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});
