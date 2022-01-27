import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Evento} from '.';

import {LIGHTERGRAY, FONT_AVENIR_ROMAN, IRON} from '../../styles/styles';

interface Props {
  evento: Evento;
}

export const EventoItem = ({evento}: Props) => {
  const styles = getStyles();
  const imagem = require('../../assets/images/felizNatal.png');

  return (
    <View style={[styles.card, styles.elevation]}>
      <Image source={imagem} style={styles.imagem} resizeMode="contain" />
      <Text allowFontScaling={false} style={styles.evento}>
        {evento.evento}
      </Text>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      height: 205,
      width: 340,
      backgroundColor: LIGHTERGRAY,
      borderRadius: 8,
      marginVertical: 10,
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    imagem: {
      width: 120,
      alignSelf: 'center',
      marginLeft: 10,
    },
    evento: {
      color: IRON,
      fontSize: 14,
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
  });
};
