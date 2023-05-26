import React from 'react';
import {Escala} from '.';
import {getSize, joinPeriodoValues} from '../../utils/utils';
import CardsWrappers from './CardsWrappers';
import Local from './Local';
import Escalas from './Escalas';
import {View, useWindowDimensions} from 'react-native';
import getStyles from './EscalaCarousel.styles';

interface Grupo {
  local: string;
  values: Escala[];
}

const SingleGrupos = ({local, values}: Grupo) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);
  const groupedPeriodos = joinPeriodoValues(values);

  return (
    <>
      <Local local={local} />
      {groupedPeriodos.length > 1 ? (
        groupedPeriodos.map((groupPeriodo, index) => {
          return (
            <View key={index} style={styles.marginTop5}>
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

export default SingleGrupos;
