import React from 'react';
import {Text} from 'react-native';
import EscalaCarouselStyles from './EscalaCarousel.styles';

interface Props {
  local: string;
}

const Local = ({local}: Props) => {
  const styles = EscalaCarouselStyles;

  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.titulo,
        styles.fontAvenirBlack,
        styles.fontSize12,
        styles.woodSmoke,
      ]}>
      {local.toUpperCase()}
    </Text>
  );
};

export default Local;
