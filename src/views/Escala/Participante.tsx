import React from 'react';
import {Text, useWindowDimensions} from 'react-native';
import getStyles from './EscalaCarousel.styles';
import {getSize} from '../../utils/utils';

interface Props {
  participante: string;
}

const Participante = ({participante}: Props) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);

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
