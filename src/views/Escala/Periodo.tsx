import React from 'react';
import {Text, useWindowDimensions} from 'react-native';
import getStyles from './EscalaCarousel.styles';
import {getSize} from '../../utils/utils';

interface Props {
  periodo: string;
}

const Periodo = ({periodo}: Props) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);

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
