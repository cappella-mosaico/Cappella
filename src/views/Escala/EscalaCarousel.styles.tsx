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

export default StyleSheet.create({
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
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    marginLeft: wp('4%'),
  },
  periodo: {
    marginTop: hp('1%'),
    marginBottom: hp('0.6%'),
  },
});
