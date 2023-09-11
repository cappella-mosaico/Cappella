import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {Escala} from '.';
import {getSize, joinPeriodoValues} from '../../utils/utils';
import CardsWrappers from './CardsWrappers';
import Local from './Local';
import Periodo from './Periodo';
import Participante from './Participante';
import Lider from './Lider';
import getStyles from './EscalaCarousel.styles';
import {MINISTERIO} from './data/Escala';

interface Grupo {
  local: string;
  values: Escala[];
}

const MultipleGrupos = ({local, values}: Grupo) => {
  const {height} = useWindowDimensions();
  const size = getSize(height);
  const styles = getStyles(size);
  const groupedPeriodos = joinPeriodoValues(values);

  return (
    <>
      <Local local={local} />
      <CardsWrappers>
        {groupedPeriodos.map((groupPeriodo, groupPeriodoIndex) => {
          const {periodo, groupedEscalas} = groupPeriodo;

          return (
            <View key={`${periodo}-${groupPeriodoIndex}`}>
              <Periodo periodo={periodo} />

              {groupedEscalas.map((value, i) => {
                const {equipe, nome} = value;
                const {lider, participantes} = equipe;
                const result = participantes.join(', ');

                return (
                  <View key={`${nome}-${i}`}>
                    {value.ministerio === MINISTERIO.MOSAIKIDS ? (
                      <View style={styles.liderMultipleEquipe}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.marginTop5,
                            styles.fontAvenirRoman,
                            styles.fontSize12,
                            styles.woodSmoke,
                          ]}>
                          {`${nome}: `}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.liderEquipe,
                            styles.fontAvenirRoman,
                            styles.fontSize12,
                            styles.woodSmoke,
                            styles.marginTop5,
                          ]}>
                          {result}
                        </Text>
                      </View>
                    ) : participantes.length === 1 ? (
                      <View style={styles.liderMultipleEquipe}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.marginTop5,
                            styles.fontAvenirRoman,
                            styles.fontSize12,
                            styles.woodSmoke,
                          ]}>
                          {nome}
                        </Text>
                        <Participante participante={participantes[0]} />
                      </View>
                    ) : (
                      <View key={`${lider}${i}`} style={styles.marginTop5}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.woodSmoke,
                            styles.fontSize12,
                            styles.fontAvenirBlack,
                          ]}>
                          {nome}
                        </Text>
                        <Lider lider={lider} />
                        <View style={styles.liderMultipleEquipe}>
                          <Text
                            allowFontScaling={false}
                            style={[
                              styles.liderEquipe,
                              styles.fontAvenirBlack,
                              styles.fontSize12,
                              styles.woodSmoke,
                              styles.marginTop5,
                            ]}>
                            Equipe:
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={[
                              styles.liderEquipe,
                              styles.fontAvenirBlack,
                              styles.fontSize12,
                              styles.woodSmoke,
                              styles.marginTop5,
                            ]}>
                            {result}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </CardsWrappers>
    </>
  );
};

export default MultipleGrupos;
