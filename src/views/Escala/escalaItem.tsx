import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  SUBTEXT,
} from '../../styles/styles';
import {Equipe} from '.';

interface Props {
  nome: string;
  inicio: string;
  ministerio: string;
  equipes: Equipe[];
}

export const EscalaItem = ({nome, inicio, ministerio, equipes}: Props) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={styles.containerNome}>
        <Text allowFontScaling={false} style={styles.nome}>
          {nome}
        </Text>
      </View>
      <View style={styles.containerNome}>
        <Text allowFontScaling={false} style={styles.nome}>
          {inicio}
        </Text>
      </View>
      <View style={styles.containerNome}>
        <Text allowFontScaling={false} style={styles.nome}>
          {ministerio}
        </Text>
      </View>
      {equipes.map((item) => (
        <View style={styles.containerNome}>
          <Text allowFontScaling={false} style={styles.nome}>
            {`\u2022 ${item.equipe}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    nome: {
      color: SUBTEXT,
      fontSize: wp('3%'),
      fontFamily: FONT_AVENIR_BLACK,
      textAlign: 'center',
    },
    missao: {
      fontFamily: FONT_AVENIR_ROMAN,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: wp('90%'),
      height: hp('10%'),
      marginBottom: hp('1%'),
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
      borderWidth: 1,
    },
    containerNome: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
