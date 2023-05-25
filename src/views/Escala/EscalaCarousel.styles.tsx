import {StyleSheet} from 'react-native';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  WOODSMOKE,
} from '../../styles/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isSmall} from '../../utils/utils';

const getStyles = (size: string) => {
  return StyleSheet.create({
    liderEquipe: {
      marginRight: wp('2%'),
    },
    liderMultipleEquipe: {
      display: 'flex',
      flexDirection: 'row',
    },
    fontAvenirBlack: {
      fontFamily: FONT_AVENIR_BLACK,
    },
    fontAvenirRoman: {
      fontFamily: FONT_AVENIR_ROMAN,
    },
    fontSize12: {
      fontSize: wp('3.3%'),
    },
    woodSmoke: {
      color: WOODSMOKE,
    },
    marginTop5: {
      marginTop: hp('0.6%'),
    },
    marginBottom5: {
      marginBottom: hp('0.6%'),
    },
    titulo: {
      marginTop: isSmall(size) ? hp('0.5%') : hp('1.5%'),
      marginBottom: isSmall(size) ? hp('0.5%') : hp('1%'),
      marginLeft: wp('4%'),
    },
    periodo: {
      marginTop: isSmall(size) ? hp('0.5%') : hp('1%'),
      marginBottom: isSmall(size) ? hp('0.1%') : hp('0.6%'),
    },
  });
};

export default getStyles;
