import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Evento} from '.';

import {
  LIGHTERGRAY,
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  WOODSMOKE,
} from '../../styles/styles';

interface Props {
  evento: Evento;
}

export const EventoItem = ({evento}: Props) => {
  const styles = getStyles();
  const imagem = require('../../assets/images/felizNatal.png');

  return (
    <View style={[styles.card, styles.elevation]}>
      <View style={styles.container}>
        <Image source={imagem} style={styles.imagem} resizeMode="contain" />
        <View style={styles.containerText}>
          <Text allowFontScaling={false} style={styles.data}>
            {evento.data}
          </Text>
          <Text allowFontScaling={false} style={styles.evento}>
            {evento.evento.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    card: {
      height: 205,
      width: 340,
      backgroundColor: LIGHTERGRAY,
      borderRadius: 8,
      marginVertical: 10,
      margin: 10,
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
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
    },
    evento: {
      fontSize: 14,
      fontFamily: FONT_AVENIR_BLACK,
      textAlign: 'center',
      lineHeight: 16,
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
