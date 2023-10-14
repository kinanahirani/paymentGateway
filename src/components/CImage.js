import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

const CImage = ({path, onPress, extraStyles}) => {
  return (
    <TouchableOpacity
      style={{width: '95%',...extraStyles}}
      activeOpacity={0.7}
      onPress={onPress}>
      <Image source={path} style={[styles.img]} />
    </TouchableOpacity>
  );
};

export default CImage;

const styles = StyleSheet.create({
  img: {
    width: 'auto',
    height: verticalScale(230),
    borderRadius: moderateScale(10),
  },
});
