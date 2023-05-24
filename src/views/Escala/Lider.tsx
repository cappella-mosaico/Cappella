import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {FONT_AVENIR_BLACK, WOODSMOKE} from '../../styles/styles';

interface Props {
  lider: string;
}

const Lider = ({lider}: Props) => {
  return (
    <View style={[styles.liderMultipleEquipe, styles.marginTop5]}>
      <Text
        allowFontScaling={false}
        style={[
          styles.liderEquipe,
          styles.fontAvenirBlack,
          styles.fontSize12,
          styles.woodSmoke,
          styles.marginTop5,
        ]}>
        Lider:
      </Text>
      <Text
        allowFontScaling={false}
        style={[
          styles.liderEquipe,
          styles.fontAvenirBlack,
          styles.fontSize12,
          styles.woodSmoke,
          styles.marginTop5,
        ]}>
        {lider}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  liderMultipleEquipe: {
    display: 'flex',
    flexDirection: 'row',
  },
  liderEquipe: {
    marginRight: 10,
  },
  fontAvenirBlack: {
    fontFamily: FONT_AVENIR_BLACK,
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
});

export default Lider;
