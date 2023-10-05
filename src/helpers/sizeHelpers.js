import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

//used for horizontal styling (left, right)
const horizontalScale = size => (width / guidelineBaseWidth) * size;

//used for vertical styling (top, bottom)
const verticalScale = size => (height / guidelineBaseHeight) * size;

//used for circular, font styling
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
