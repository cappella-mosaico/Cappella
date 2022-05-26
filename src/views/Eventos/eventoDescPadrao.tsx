import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

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
  const {dataInicial, titulo, imagemURL} = evento;
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Image
        source={{uri: imagemURL}}
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
      marginTop: 35,
      display: 'flex',
      flexDirection: 'row',
    },
    imagem: {
      marginLeft: 25,
      height: 120,
      width: 120,
      borderRadius: 18,
    },
    data: {
      fontSize: 10,
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
      lineHeight: 16,
      color: WOODSMOKE,
    },
    evento: {
      fontSize: 14,
      fontFamily: FONT_AVENIR_BLACK,
      textAlign: 'center',
      lineHeight: 16,
      color: WOODSMOKE,
    },
    containerText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: 185,
      color: WOODSMOKE,
    },
  });
};
