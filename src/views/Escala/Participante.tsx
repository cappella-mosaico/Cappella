import React from 'react';
import {Text} from 'react-native';
import EscalaCarouselStyles from './EscalaCarousel.styles';

interface Props {
  participante: string;
}

const Participante = ({participante}: Props) => {
  const styles = EscalaCarouselStyles;

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

export default Participante;
