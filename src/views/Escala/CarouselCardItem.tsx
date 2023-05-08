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
import {ITEM_WIDTH, NewEscala} from '.';
import {EquipeItem} from './EquipeItem';
import {domingoCheck} from '../../utils/utils';

interface EscalaItem {
  item: NewEscala;
  index: number;
}

const CarouselCardItem = ({item, index}: EscalaItem) => {
  const {inicio, equipes} = item;
  const isNextDomingo = domingoCheck(inicio);
  const styles = getStyles(isNextDomingo);
  const lider = equipes.length === 1 ? equipes[0].lider : null;

  return (
    <View style={styles.container} key={index}>
      <Text allowFontScaling={false} style={styles.titulo}>
        {isNextDomingo ? 'NESTE DOMINGO' : 'PROXIMA SEMANA'}
      </Text>
      <View style={styles.containerCards}>
        <View style={styles.containerTexts}>
          {lider && (
            <>
              <Text allowFontScaling={false} style={styles.liderTitle}>
                LIDER
              </Text>

              <Text allowFontScaling={false} style={styles.lider}>
                {lider}
              </Text>
            </>
          )}
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
        <View style={styles.containerTexts}>
          {equipes.length > 1 ? (
            equipes.map((equipe, i) => {
              return (
                <View key={`${equipe}-${i}`}>
                  <Text style={styles.equipeTitle}>
                    {equipe.nome.toUpperCase()} {equipe.ebd && ' - EBD'}
                  </Text>
                  <View style={styles.liderMultipleEquipe}>
                    <Text style={styles.liderEquipe}>LIDER:</Text>
                    <Text style={styles.inicioLider}>{equipe.lider}</Text>
                  </View>

                  <Text
                    allowFontScaling={false}
                    style={styles.equipe}
                    key={equipe.nome}>
                    {`EQUIPE: ${equipe.equipe}`}
                  </Text>
                </View>
              );
            })
          ) : (
            <FlatList
              numColumns={1}
              data={equipes}
              renderItem={({item}) => <EquipeItem equipe={item.equipe} />}
              keyExtractor={(item, index) => `${item}${index}`}
            />
          )}
        </View>
      </View>
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
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginTop: 17,
      marginBottom: 12,
      marginLeft: 19,
    },
    liderTitle: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_ROMAN,
      marginBottom: 5,
    },
    lider: {
      color: WOODSMOKE,
      fontSize: 16,
      fontFamily: FONT_AVENIR_BLACK,
      marginBottom: 15,
    },
    inicioTitle: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginBottom: 2,
    },
    inicio: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_ROMAN,
    },
    equipeTitle: {
      color: WOODSMOKE,
      fontSize: 12,
      fontFamily: FONT_AVENIR_BLACK,
      marginBottom: 10,
      marginTop: 10,
    },
    equipe: {
      color: WOODSMOKE,
      fontSize: 12,
      marginBottom: 5,
      marginTop: 5,
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
    },
  });
};

export default CarouselCardItem;
