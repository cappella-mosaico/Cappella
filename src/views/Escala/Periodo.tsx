import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONT_AVENIR_BLACK, WOODSMOKE} from '../../styles/styles';

interface Props {
  periodo: string;
}

const Periodo = ({periodo}: Props) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.periodo,
        styles.fontAvenirBlack,
        styles.fontSize12,
        styles.woodSmoke,
      ]}>
      {periodo.toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create({
  periodo: {
    marginTop: 10,
    marginBottom: 5,
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
});

export default Periodo;
