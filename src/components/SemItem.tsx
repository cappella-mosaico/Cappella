import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FONT_AVENIR_ROMAN, OTHERGRAY} from '../styles/styles';

interface Props {
  texto: string;
}

export const SemItem = ({texto}: Props) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/semEventos.png')}
        style={styles.imagem}
        resizeMode="contain"
      />
      <Text style={styles.semItem}>{texto}</Text>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: hp('15%'),
      alignItems: 'center',
    },
    semItem: {
      color: OTHERGRAY,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
    imagem: {
      height: hp('40%'),
    },
  });
};
