import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Evento} from '.';

import {EventoDescPadrao} from './eventoDescPadrao';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {WHITE} from '../../styles/styles';

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
      style={styles.card}
      onPress={() =>
        navigation.push('EventoDesc', {
          evento,
        })
      }>
      <EventoDescPadrao evento={evento} />
    </TouchableOpacity>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    card: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: wp('5%'),
      backgroundColor: WHITE,
      alignItems: 'center',
      borderRadius: 10,
    },
  });
};
