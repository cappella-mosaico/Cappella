import React from 'react';

import {Eventos} from '../Eventos';
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
  const {id} = route.params;

  switch (id) {
    case 'contribua':
      return <Contribua />;
    case 'agenda':
      return <Agenda />;
    case 'eventos':
      return <Eventos />;
    case 'financas':
      return <Financas titulo="Finanças" />;
    case 'contato':
      return <Contato />;
    default:
      break;
  }
};
