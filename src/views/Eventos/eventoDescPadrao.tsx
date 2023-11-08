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
  soImagem?: Boolean;
}

export const EventoDescPadrao = ({evento, soImagem}: Props) => {
  const {dataInicial, titulo, imagem} = evento;
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: imagem}}
        style={[styles.imagem, ...(soImagem ? [styles.fullSize] : [])]}
        resizeMode="contain"
      />
      {!soImagem && (
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
      )}
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imagem: {
      height: wp('40%'),
      width: wp('40%'),
      borderRadius: 10,
    },
    fullSize: {
      height: wp('80%'),
      width: wp('80%'),
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
      alignItems: 'center',
      width: wp('50%'),
      color: WOODSMOKE,
    },
  });
};
