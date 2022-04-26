import React from 'react';

import {Contribua} from '../Contribua';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../../../App';
import {Agenda} from '../Agenda';
import {Contato} from '../Contato';
import {Financas} from '../Financas';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'DetalhesItem'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const DetalhesItem = ({route}: Props) => {
  const {titulo, id} = route.params;

  switch (id) {
    case 'contribua':
      return <Contribua />;
    case 'agenda':
      return <Agenda />;
    case 'financas':
      return <Financas titulo={titulo} />;
    case 'contato':
      return <Contato />;
    default:
      break;
  }
};
