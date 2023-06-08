import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const deviceWidth = width;
const deviceHeight = height;
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale, deviceHeight, deviceWidth };
