import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {RouteProp} from '@react-navigation/core';
import {RootStackParamList, ProfileScreenNavigationProp} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoForm'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoForm = ({route}: Props) => {
  const {evento} = route.params;
  const {titulo} = evento;

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <Text>{titulo}</Text>
      </ContainerPage>
    </SafeAreaView>
  );
};
