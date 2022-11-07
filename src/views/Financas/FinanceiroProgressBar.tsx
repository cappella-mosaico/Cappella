import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  COMET,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  ORANGEBUTTON,
} from '../../styles/styles';
import {Financeiro} from '.';

interface Props {
  janeiro: Financeiro;
}

const FinanceiroProgressBar = ({janeiro}: Props) => {
  return (
    <View style={styles.progressBar}>
      <Text style={styles.valor}>Janeiro</Text>

      <Progress.Bar
        progress={janeiro.entradas / janeiro.orcado}
        width={200}
        height={15}
        color={ORANGEBUTTON}
        animationType="timing"
      />
      <View style={styles.janeiro}>
        <Text style={styles.valorJaneiro}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(janeiro.entradas)}
        </Text>
        <Text style={styles.valorJaneiro}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(janeiro.orcado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  valor: {
    color: COMET,
    fontSize: wp('4%'),
    fontFamily: FONT_AVENIR_BLACK,
  },
  progressBar: {
    height: hp('15%'),
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  janeiro: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('80%'),
    height: hp('4%'),
    marginBottom: hp('1%'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valorJaneiro: {
    color: COMET,
    fontSize: wp('3%'),
    fontFamily: FONT_AVENIR_ROMAN,
  },
});

export default FinanceiroProgressBar;
