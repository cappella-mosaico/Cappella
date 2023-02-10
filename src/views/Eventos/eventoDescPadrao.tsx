import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  WOODSMOKE,
} from '../../styles/styles';
import {Evento} from '.';

interface Props {
  evento: Evento;
}

export const EventoDescPadrao = ({evento}: Props) => {
  const {dataInicial, titulo, imagem} = evento;
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: imagem}}
        style={styles.imagem}
        resizeMode="contain"
      />
      <View style={styles.containerText}>
        <Text allowFontScaling={false} style={styles.data}>
          {new Date(dataInicial).toLocaleDateString('pt-br', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text allowFontScaling={false} style={styles.evento}>
          {titulo.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: hp('4.5%'),
      display: 'flex',
      flexDirection: 'row',
    },
    imagem: {
      marginLeft: wp('6%'),
      height: hp('15%'),
      width: wp('31%'),
      borderRadius: 18,
    },
    data: {
      fontSize: wp('2.6%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
      lineHeight: hp('2%'),
      color: WOODSMOKE,
    },
    evento: {
      fontSize: wp('3.6%'),
      fontFamily: FONT_AVENIR_BLACK,
      textAlign: 'center',
      lineHeight: hp('2%'),
      color: WOODSMOKE,
    },
    containerText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: wp('50%'),
      color: WOODSMOKE,
    },
  });
};
