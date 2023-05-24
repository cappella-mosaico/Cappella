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
import {domingoCheck, formatDatePT, groupByLocal} from '../../utils/utils';
import MultipleGrupos from './MultipleGrupos';
import SingleGrupos from './SingleGrupos';

interface EscalaItem {
  item: EscalaByDay;
  index: number;
}

const CarouselCardItem = ({item, index}: EscalaItem) => {
  const {dia, escalas} = item;
  const isNextDomingo = domingoCheck(dia);
  const styles = getStyles(isNextDomingo);
  const grupos = groupByLocal(escalas);

  return (
    <View style={styles.container} key={index}>
      <Text allowFontScaling={false} style={styles.white}>
        {isNextDomingo ? 'NESTE DOMINGO' : 'PROXIMA SEMANA'} -{' '}
        {formatDatePT(dia)}
      </Text>

      {grupos.length > 1 ? (
        grupos.map((grupo) => {
          return <MultipleGrupos local={grupo.local} values={grupo.values} />;
        })
      ) : (
        <SingleGrupos local={grupos[0].local} values={grupos[0].values} />
      )}
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
    espace: {
      marginTop: 5,
    },
  });
};

export default CarouselCardItem;
