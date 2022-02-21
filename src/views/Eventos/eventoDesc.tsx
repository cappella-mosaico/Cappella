import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RouteProp} from '@react-navigation/core';

import {
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  WOODSMOKE,
} from '../../styles/styles';
import {RootStackParamList} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';
import {BotaoLaranja} from '../../components/BotaoLaranja';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoDesc'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoDesc = ({route}: Props) => {
  const {evento} = route.params;
  const {
    dataInicial,
    titulo,
    // imagemURL,
    sobre,
    valor,
    local,
    endereco,
  } = evento;
  const styles = getStyles();

  const imagem = require('../../assets/images/felizNatal.png');

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <View style={styles.container}>
          <Image
            // source={{uri: imagemURL}}
            source={imagem}
            style={styles.imagem}
            resizeMode="contain"
          />
          <View style={styles.containerText}>
            <Text allowFontScaling={false} style={styles.data}>
              {dataInicial.toLocaleDateString('pt-br', {
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
        <View style={styles.containerInfo}>
          <Text allowFontScaling={false} style={styles.title}>
            Sobre o evento
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {sobre}
          </Text>
          <Text allowFontScaling={false} style={styles.title}>
            Data
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {new Intl.DateTimeFormat('pt-br', {weekday: 'long'})
              .format(dataInicial)
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase(),
              )}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {dataInicial.toLocaleDateString('pt-br', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {dataInicial.toLocaleTimeString('pt-br', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}{' '}
            horas
          </Text>
          <Text allowFontScaling={false} style={styles.title}>
            Valor
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {valor}
          </Text>
          <Text allowFontScaling={false} style={styles.title}>
            Local
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {local}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {endereco}
          </Text>
        </View>
        <View style={styles.containerInfo}>
          <BotaoLaranja titulo="se inscreva!" onPress={() => {}} />
        </View>
      </ContainerPage>
    </SafeAreaView>
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
    containerInfo: {
      marginLeft: 25,
      marginRight: 25,
      alignSelf: 'center',
      marginTop: hp('3.5%'),
    },
    title: {
      color: WOODSMOKE,
      textAlign: 'left',
      fontFamily: FONT_AVENIR_BLACK,
      fontSize: wp('4%'),
      marginBottom: 10,
    },
    text: {
      color: WOODSMOKE,
      marginLeft: wp('3%'),
      marginBottom: 10,
      textAlign: 'left',
      fontFamily: FONT_AVENIR_ROMAN,
      fontSize: wp('3.1%'),
      lineHeight: hp('1.7%'),
    },
  });
};
