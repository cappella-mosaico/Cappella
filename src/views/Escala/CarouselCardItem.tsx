import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  BLACK,
  CAPER,
  COLORCOMUNIDADE,
  COMET,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  LIGHTGRAY,
  WHITE,
} from '../../styles/styles';
import {Escala, ITEM_WIDTH} from '.';
import {MINISTERIO} from './data/Escala';

interface EscalaItem {
  item: Escala;
  index: number;
}

const CarouselCardItem = ({item, index}: EscalaItem) => {
  const {nome, inicio, ministerio, equipes} = item;

  const title = (MINISTERIO as any)[ministerio];

  return (
    <View style={styles.containerCarousel} key={index}>
      <Text allowFontScaling={false} style={styles.item}>
        {title}
      </Text>
      <Text allowFontScaling={false} style={styles.item}>
        {nome}
      </Text>
      <Text allowFontScaling={false} style={styles.item}>
        {inicio}
      </Text>
      {equipes.map((equipe) => (
        <Text allowFontScaling={false} style={styles.item} key={equipe.nome}>
          {`\u2022 ${equipe.equipe}`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCarousel: {
    backgroundColor: WHITE,
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: '80%',
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
  ano: {
    color: COMET,
    fontSize: wp('4%'),
    fontFamily: FONT_AVENIR_BLACK,
    textAlign: 'center',
    marginTop: hp('2.5%'),
  },
  container: {
    marginTop: hp('7%'),
    alignItems: 'center',
    backgroundColor: COLORCOMUNIDADE,
    borderColor: CAPER,
    borderWidth: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  acumulado: {
    color: COMET,
    fontSize: wp('4%'),
    fontFamily: FONT_AVENIR_ROMAN,
    textAlign: 'auto',
    marginTop: hp('3.5%'),
    marginLeft: wp('11%'),
  },
  containerAcumulado: {
    marginTop: -hp('3.5%'),
  },
  containerValores: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('80%'),
    height: hp('8%'),
    marginBottom: hp('1%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: LIGHTGRAY,
  },
  valor: {
    color: COMET,
    fontSize: wp('4%'),
    fontFamily: FONT_AVENIR_BLACK,
  },
  containerReceita: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('80%'),
    height: hp('8%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: LIGHTGRAY,
  },
  dados: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    marginTop: hp('4%'),
  },
  item: {
    color: COMET,
    fontSize: wp('4%'),
    fontFamily: FONT_AVENIR_ROMAN,
    textAlign: 'center',
    width: wp('70%'),
  },
});

export default CarouselCardItem;
