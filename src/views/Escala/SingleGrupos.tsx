import React from 'react';
import {Escala} from '.';
import {joinPeriodoValues} from '../../utils/utils';
import CardsWrappers from './CardsWrappers';
import Local from './Local';
import Escalas from './Escalas';
import {StyleSheet, View} from 'react-native';

interface Grupo {
  local: string;
  values: Escala[];
}

const SingleGrupos = ({local, values}: Grupo) => {
  const groupedPeriodos = joinPeriodoValues(values);

  return (
    <>
      <Local local={local} />
      {groupedPeriodos.length > 1 ? (
        groupedPeriodos.map((groupPeriodo) => {
          return (
            <View style={styles.marginTop5}>
              <CardsWrappers>
                <Escalas
                  periodo={groupPeriodo.periodo}
                  groupedEscalas={groupPeriodo.groupedEscalas}
                />
              </CardsWrappers>
            </View>
          );
        })
      ) : (
        <CardsWrappers>
          <Escalas
            periodo={groupedPeriodos[0].periodo}
            groupedEscalas={groupedPeriodos[0].groupedEscalas}
          />
        </CardsWrappers>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  marginTop5: {
    marginTop: 5,
  },
});

export default SingleGrupos;
