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

interface Grupo {
  local: string;
  values: Escala[];
}

const MultipleGrupos = ({local, values}: Grupo) => {
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
      <CardsWrappers>
        {groupedPeriodos.map((groupPeriodo, groupPeriodoIndex) => {
          const {periodo, groupedEscalas} = groupPeriodo;

          return (
            <View key={`${periodo}-${groupPeriodoIndex}`}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.periodo,
                  styles.fontAvenirBlack,
                  styles.fontSize12,
                  styles.woodSmoke,
                ]}>
                {periodo.toUpperCase()}
              </Text>

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
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.marginTop5,
                            styles.fontAvenirRoman,
                            styles.fontSize12,
                            styles.woodSmoke,
                          ]}>
                          {` - ${participantes[0]}`}
                        </Text>
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
                            Lider:
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
                            {lider}
                          </Text>
                        </View>
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

export default MultipleGrupos;
