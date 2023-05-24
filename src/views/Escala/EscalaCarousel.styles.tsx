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
  local: {
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
  },
  liderEquipe: {
    marginRight: 10,
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
    fontSize: 12,
  },
  woodSmoke: {
    color: WOODSMOKE,
  },
  marginTop5: {
    marginTop: 5,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  titulo: {
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
  },
  periodo: {
    marginTop: 10,
    marginBottom: 5,
  },
});
