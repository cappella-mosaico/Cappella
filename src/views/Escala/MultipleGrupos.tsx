import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  WOODSMOKE,
} from '../../styles/styles';
import {Escala} from '.';
import {joinPeriodoValues} from '../../utils/utils';
import CardsWrappers from './CardsWrappers';
import Local from './Local';
import Periodo from './Periodo';
import Participante from './Participante';
import Lider from './Lider';

interface Grupo {
  local: string;
  values: Escala[];
}

const MultipleGrupos = ({local, values}: Grupo) => {
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
                    {participantes.length === 1 ? (
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

const styles = StyleSheet.create({
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

export default MultipleGrupos;
