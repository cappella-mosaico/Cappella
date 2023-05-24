import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../styles/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CardsWrappers = ({children}: Props) => {
  return (
    <View style={styles.containerCards}>
      <View style={styles.containerTexts}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    backgroundColor: WHITE,
    borderRadius: 8,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  containerTexts: {
    marginLeft: wp('7%'),
    marginBottom: hp('2%'),
    marginTop: hp('1%'),
  },
});

export default CardsWrappers;
