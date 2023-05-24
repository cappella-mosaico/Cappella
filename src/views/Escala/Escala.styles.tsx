import {StyleSheet} from 'react-native';
import {FONT_GILLSANS, WAIKAWAGREY, WHITE} from '../../styles/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  botaoContainer: {
    backgroundColor: WHITE,
    width: 160,
    height: 50,
    borderRadius: 10,
    borderColor: WAIKAWAGREY,
    borderWidth: 1,
    justifyContent: 'center',
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: 15,
    marginBottom: 40,
  },
  botaoTexto: {
    fontFamily: FONT_GILLSANS,
    fontSize: 16,
    color: WAIKAWAGREY,
    textAlign: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    marginTop: -9.9,
    borderRadius: 5,
    marginHorizontal: 0,
  },
  aguarde: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    marginTop: hp('15%'),
  },
});
