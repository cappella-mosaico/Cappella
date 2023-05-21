import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  BLACK,
  CHELSEACUCUMBER,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  LIGHTTITLE,
  WHITE,
  WOODSMOKE,
} from '../../styles/styles';
import {EscalaByDay, ITEM_WIDTH} from '.';
import {
  domingoCheck,
  formatDatePT,
  groupByLocal,
  joinPeriodoValues,
} from '../../utils/utils';

interface EscalaItem {
  item: EscalaByDay;
  index: number;
}

const CarouselCardItem = ({item, index}: EscalaItem) => {
  const {dia, escalas} = item;
  const isNextDomingo = domingoCheck(dia);
  const styles = getStyles(isNextDomingo);
  const grupos = groupByLocal(escalas);

  console.log(dia);
  console.log(new Date(dia));

  return (
    <View style={styles.container} key={index}>
      <Text allowFontScaling={false} style={styles.white}>
        {isNextDomingo ? 'NESTE DOMINGO' : 'PROXIMA SEMANA'} -{' '}
        {formatDatePT(dia)}
      </Text>

      {grupos.map((grupo, grupoIndex) => {
        const {local, values} = grupo;
        const groupedPeriodos = joinPeriodoValues(values);

        return (
          <View key={`${local}-${grupoIndex}`}>
            <Text allowFontScaling={false} style={styles.titulo}>
              {local.toUpperCase()}
            </Text>
            <View style={styles.containerCards}>
              <View style={styles.containerTexts}>
                {groupedPeriodos.map((groupPeriodo, groupPeriodoIndex) => {
                  const {periodo, values} = groupPeriodo;

                  return (
                    <View key={`${periodo}-${groupPeriodoIndex}`}>
                      <Text style={styles.periodo}>
                        {periodo.toUpperCase()}
                      </Text>

                      {values.map((value, i) => {
                        const {equipe, nome} = value;
                        const {lider, participantes} = equipe;

                        return (
                          <View key={`${equipe}-${i}`}>
                            <View style={styles.liderMultipleEquipe}>
                              <Text style={styles.equipe}>{nome}</Text>
                              {participantes.length === 1 ? (
                                <Text
                                  allowFontScaling={false}
                                  style={styles.equipe}>
                                  {` - ${participantes[0]}`}
                                </Text>
                              ) : (
                                participantes.map((participante, ind) => {
                                  return (
                                    <View key={`${equipe}-${ind}`}>
                                      <View style={styles.liderMultipleEquipe}>
                                        <Text style={styles.liderEquipe}>
                                          LIDER:
                                        </Text>
                                        <Text style={styles.inicioLider}>
                                          {lider}
                                        </Text>
                                      </View>

                                      <Text
                                        allowFontScaling={false}
                                        style={styles.equipe}
                                        key={participante}>
                                        {` - ${participante}`}
                                      </Text>
                                    </View>
                                  );
                                })
                              )}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const getStyles = (isNextDomingo: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: isNextDomingo ? LIGHTTITLE : CHELSEACUCUMBER,
      borderRadius: 8,
      width: ITEM_WIDTH,
      paddingBottom: 40,
      shadowColor: BLACK,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    containerCards: {
      backgroundColor: WHITE,
      borderRadius: 8,
      shadowColor: BLACK,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      marginLeft: 11,
      marginRight: 11,
    },
    containerTexts: {
      marginLeft: 25,
      marginBottom: 15,
      marginTop: 10,
    },
    titulo: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginTop: 12,
      marginBottom: 10,
      marginLeft: 19,
    },
    periodo: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginTop: 10,
    },
    equipe: {
      color: WOODSMOKE,
      fontSize: 12,
    },
    liderEquipe: {
      color: WOODSMOKE,
      fontFamily: FONT_AVENIR_ROMAN,
      fontSize: 12,
      marginRight: 10,
    },
    inicioLider: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
    },
    liderMultipleEquipe: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
    },
    white: {
      color: WHITE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginTop: 12,
      marginBottom: 10,
      marginLeft: 19,
    },
  });
};

export default CarouselCardItem;
