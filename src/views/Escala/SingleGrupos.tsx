import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  WOODSMOKE,
} from '../../styles/styles';
import {Escala} from '.';
import {joinPeriodoValues} from '../../utils/utils';
import CardsWrappers from './CardsWrappers';
import SinglePeriodo from './SinglePeriodo';
import MultiplePeriodos from './MultiplePeriodos';

interface Grupo {
  local: string;
  values: Escala[];
}

const SingleGrupos = ({local, values}: Grupo) => {
  const groupedPeriodos = joinPeriodoValues(values);

  return (
    <>
      <Text
        allowFontScaling={false}
        style={[
          styles.titulo,
          styles.fontAvenirBlack,
          styles.fontSize12,
          styles.woodSmoke,
        ]}>
        {local.toUpperCase()}
      </Text>

      {groupedPeriodos.length > 1 ? (
        groupedPeriodos.map((groupPeriodo) => {
          return <MultiplePeriodos groupPeriodo={groupPeriodo} />;
        })
      ) : (
        <CardsWrappers>
          <SinglePeriodo
            periodo={groupedPeriodos[0].periodo}
            groupedEscalas={groupedPeriodos[0].groupedEscalas}
          />
        </CardsWrappers>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  titulo: {
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
  },
  periodo: {
    marginTop: 10,
    marginBottom: 5,
  },
  liderEquipe: {
    marginRight: 10,
  },
  liderMultipleEquipe: {
    display: 'flex',
    flexDirection: 'row',
  },
  fontAvenirBlack: {
    fontFamily: FONT_AVENIR_BLACK,
  },
  fontAvenirRoman: {
    fontFamily: FONT_AVENIR_ROMAN,
  },
  fontSize12: {
    fontSize: 12,
  },
  woodSmoke: {
    color: WOODSMOKE,
  },
  marginTop5: {
    marginTop: 5,
  },
});

export default SingleGrupos;
