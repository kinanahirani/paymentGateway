import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const CHeader = ({navigation, name}) => {
  return (
    <SafeAreaView
      style={{
        height: verticalScale(60),
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{padding: moderateScale(10)}}>
        <Image
          source={require('../assets/images/left-arrow.png')}
          style={{width: moderateScale(25), height: verticalScale(25)}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: moderateScale(16),
          fontWeight: '500',
          color: 'black',
          marginLeft: horizontalScale(20),
        }}>
        {name}
      </Text>
    </SafeAreaView>
  );
};

export default CHeader;

const styles = StyleSheet.create({});
