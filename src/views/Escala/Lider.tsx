import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import getStyles from './EscalaCarousel.styles';
import {getSize} from '../../utils/utils';

interface Props {
  lider: string;
}

const Lider = ({lider}: Props) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);

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
