import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Evento} from '.';

import {LIGHTERGRAY} from '../../styles/styles';
import {EventoDescPadrao} from './eventoDescPadrao';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {BotaoBranco} from '../../components/BotaoBranco';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventoItem'
>;
interface Props {
  evento: Evento;
}

export const EventoItem = ({evento}: Props) => {
  const styles = getStyles();
  const navigation: ProfileScreenNavigationProp = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, styles.elevation]}
      onPress={() =>
        navigation.push('EventoDesc', {
          evento,
        })
      }>
      <EventoDescPadrao evento={evento} />
      <BotaoBranco
        style={styles.botao}
        titulo="quero ir!"
        onPress={() =>
          navigation.push('EventoDesc', {
            evento,
          })
        }
      />
    </TouchableOpacity>
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
      justifyContent: 'flex-start',
    },
    elevation: {
      elevation: 20,
      shadowColor: '#52006A',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    botao: {
      alignSelf: 'center',
      marginTop: -35,
      left: 75,
    },
  });
};
