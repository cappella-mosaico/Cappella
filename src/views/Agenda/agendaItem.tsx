import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  LOW_ORANGE,
  BROWN,
} from '../../styles/styles';
import {getSize} from '../../utils/utils';

interface Props {
  atividade: string;
  horario: string;
}

export const AgendaItem = ({atividade, horario}: Props) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);

  return (
    <View style={styles.container}>
      <View style={styles.containerHorario}>
        <Text allowFontScaling={false} style={styles.horario}>
          {horario}
        </Text>
      </View>
      <View style={styles.containerAtividade}>
        <Text style={styles.atividade}>{atividade}</Text>
      </View>
    </View>
  );
};

const getHeight = (size: string) => {
  switch (size) {
    case 'small':
    case 'medium':
      return hp('7%');
    case 'large':
    case 'xlarge':
    case 'xxlarge':
    case 'xxxlarge':
      return hp('8.5%');
    default:
      break;
  }
};

const getStyles = (size: string) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: wp('90%'),
      alignSelf: 'center',
    },
    containerAtividade: {
      justifyContent: 'center',
      width: wp('68%'),
      height: getHeight(size),
      marginBottom: hp('1.2%'),
      backgroundColor: LOW_ORANGE,
    },
    containerHorario: {
      alignItems: 'center',
      justifyContent: 'center',
      width: wp('19%'),
      marginBottom: hp('1.2%'),
      backgroundColor: LOW_ORANGE,
    },
    horario: {
      color: BROWN,
      fontSize: wp('5.3%'),
      fontFamily: FONT_AVENIR_BLACK,
    },
    atividade: {
      color: BROWN,
      fontSize: wp('3.7%'),
      textAlign: 'center',
      fontFamily: FONT_AVENIR_ROMAN,
    },
  });
};
