import React from 'react';
import {Text, useWindowDimensions} from 'react-native';
import getStyles from './EscalaCarousel.styles';
import {getSize} from '../../utils/utils';

interface Props {
  local: string;
}

const Local = ({local}: Props) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);

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
