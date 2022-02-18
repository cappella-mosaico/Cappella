import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RouteProp} from '@react-navigation/core';

import {
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  WOODSMOKE,
} from '../../styles/styles';
import {RootStackParamList} from '../../../App';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoDesc'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoDesc = ({route}: Props) => {
  const {evento} = route.params;
  const styles = getStyles();
  const imagem = require('../../assets/images/felizNatal.png');

  return (
    <View>
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
