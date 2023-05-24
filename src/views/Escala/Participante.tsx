import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONT_AVENIR_ROMAN, WOODSMOKE} from '../../styles/styles';

interface Props {
  participante: string;
}

const Participante = ({participante}: Props) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.marginTop5,
        styles.fontAvenirRoman,
        styles.fontSize12,
        styles.woodSmoke,
      ]}>
      {` - ${participante}`}
    </Text>
  );
};

const styles = StyleSheet.create({
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
});

export default Participante;
