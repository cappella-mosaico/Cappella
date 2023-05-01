import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  BLACK,
  CHELSEACUCUMBER,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  LIGHTTITLE,
  WHITE,
  WOODSMOKE,
} from '../../styles/styles';
import {Escala, ITEM_WIDTH} from '.';
import {EquipeItem} from './EquipeItem';
import {domingoCheck} from '../../utils/utils';

interface EscalaItem {
  item: Escala;
  index: number;
}

const CarouselCardItem = ({item, index}: EscalaItem) => {
  const {inicio, equipes} = item;
  const isNextDomingo = domingoCheck(inicio);
  const styles = getStyles(isNextDomingo);

  return equipes.map((equipe) => (
    <View style={styles.container} key={index}>
      <Text allowFontScaling={false} style={styles.titulo}>
        {isNextDomingo ? 'NESTE DOMINGO' : 'PROXIMA SEMANA'}
      </Text>
      <View style={styles.containerCards}>
        <View style={styles.containerTexts}>
          <Text allowFontScaling={false} style={styles.liderTitle}>
            LIDER
          </Text>
          <Text allowFontScaling={false} style={styles.lider}>
            {equipe.lider}
          </Text>
          <Text allowFontScaling={false} style={styles.inicioTitle}>
            INÍCIO:
          </Text>
          <Text allowFontScaling={false} style={styles.inicio}>
            {new Intl.DateTimeFormat('pt-br', {
              hour: '2-digit',
            })
              .format(new Date(inicio))
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase(),
              )}
            {'h - '}
            {new Intl.DateTimeFormat('pt-br', {
              dateStyle: 'full',
            })
              .format(new Date(inicio))
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase(),
              )}
          </Text>
        </View>
      </View>
      <Text allowFontScaling={false} style={styles.titulo}>
        EQUIPE
      </Text>

      <View style={styles.containerCards}>
        <FlatList
          numColumns={1}
          data={equipe.equipe}
          renderItem={({item}) => <EquipeItem equipe={item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  ));
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
      marginLeft: 33,
      marginTop: 21,
      marginBottom: 21,
    },
    containerEquipes: {
      marginLeft: 33,
      marginTop: 21,
      marginBottom: 21,
    },
    titulo: {
      color: WOODSMOKE,
      fontSize: 10,
      fontFamily: FONT_AVENIR_BLACK,
      marginTop: 17,
      marginBottom: 12,
      marginLeft: 19,
    },
    liderTitle: {
      color: WOODSMOKE,
      fontSize: 10,
      fontFamily: FONT_AVENIR_ROMAN,
      marginBottom: 5,
    },
    lider: {
      color: WOODSMOKE,
      fontSize: 14,
      fontFamily: FONT_AVENIR_BLACK,
      marginBottom: 15,
    },
    inicioTitle: {
      color: WOODSMOKE,
      fontSize: 10,
      fontFamily: FONT_AVENIR_BLACK,
      marginBottom: 2,
    },
    inicio: {
      color: WOODSMOKE,
      fontSize: 10,
      fontFamily: FONT_AVENIR_ROMAN,
    },
    equipe: {
      color: WOODSMOKE,
      fontSize: 10,
    },
  });
};

export default CarouselCardItem;
