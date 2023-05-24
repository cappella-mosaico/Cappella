import React from 'react';
import {Text, View} from 'react-native';
import EscalaCarouselStyles from './EscalaCarousel.styles';

interface Props {
  lider: string;
}

const Lider = ({lider}: Props) => {
  const styles = EscalaCarouselStyles;

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

export default Lider;
