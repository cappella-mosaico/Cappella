import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RouteProp} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  WOODSMOKE,
} from '../../styles/styles';
import {RootStackParamList} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';
import {BotaoLaranja} from '../../components/BotaoLaranja';
import {EventoDescPadrao} from './eventoDescPadrao';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoDesc'>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventoDesc'
>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoDesc = ({route}: Props) => {
  const {evento} = route.params;
  const {dataInicial, sobre, valor, local, endereco} = evento;
  const styles = getStyles();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <EventoDescPadrao evento={evento} />
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
              .format(new Date(dataInicial))
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase(),
              )}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {new Date(dataInicial).toLocaleDateString('pt-br', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {new Date(dataInicial).toLocaleTimeString('pt-br', {
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
          <BotaoLaranja
            titulo="se inscreva!"
            onPress={() =>
              navigation.push('EventoForm', {
                evento,
              })
            }
          />
        </View>
      </ContainerPage>
    </SafeAreaView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
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
