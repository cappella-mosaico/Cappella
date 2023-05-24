import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FONT_AVENIR_BLACK, WOODSMOKE} from '../../styles/styles';

interface Props {
  local: string;
}

const Local = ({local}: Props) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.local,
        styles.fontAvenirBlack,
        styles.fontSize12,
        styles.woodSmoke,
      ]}>
      {local.toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create({
  local: {
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
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

export default Local;
