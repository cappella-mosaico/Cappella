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
import {FinancasPorAno, ITEM_WIDTH} from '.';
import {ChartFinanceiro} from './ChartFinanceiro';
import FinanceiroProgressBar from './FinanceiroProgressBar';

export interface FinanceiroItem {
  item: FinancasPorAno;
  index: number;
}

const CarouselCardItem = ({item, index}: FinanceiroItem) => {
  const {ano, meses} = item;
  const orcado = meses[0].orcado;

  return (
    <View style={styles.containerCarousel} key={index}>
      <Text style={styles.ano}>{item.ano}</Text>
      <Text style={styles.acumulado}>Acumulado:</Text>
      <View style={styles.container}>
        <View style={styles.containerAcumulado}>
          <View style={styles.containerValores}>
            <Text style={styles.valor}>orçado</Text>
            <Text style={styles.valor}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(meses.reduce((a, b) => a + (b.orcado || 0), 0))}
            </Text>
          </View>
          <View style={styles.containerReceita}>
            <Text style={styles.valor}>receita</Text>
            <Text style={styles.valor}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(meses.reduce((a, b) => a + (b.entradas || 0), 0))}
            </Text>
          </View>
        </View>
        {meses.length > 1 ? (
          <ChartFinanceiro meses={meses} />
        ) : (
          <FinanceiroProgressBar janeiro={meses[0]} />
        )}
      </View>
      <View style={styles.dados}>
        <Text style={styles.item}>
          {`R$ ${(Math.floor(orcado) / 1000).toFixed(0)} mil`} mensais é a
          previsão para atender os compromissos assumidos pela igreja em {ano}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCarousel: {
    backgroundColor: WHITE,
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
