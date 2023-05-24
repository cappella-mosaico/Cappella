import React from 'react';
import {Text} from 'react-native';
import EscalaCarouselStyles from './EscalaCarousel.styles';

interface Props {
  periodo: string;
}

const Periodo = ({periodo}: Props) => {
  const styles = EscalaCarouselStyles;

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

export default Periodo;
