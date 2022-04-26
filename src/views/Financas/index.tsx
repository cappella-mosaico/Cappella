import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ContainerPage} from '../../components/ContainerPage';
import {FONT_AVENIR_ROMAN, PAMPAS, PIPER} from '../../styles/styles';

interface Props {
  titulo: string;
}

export const Financas = ({titulo}: Props) => {
  const styles = getStyles();

  return (
    <ContainerPage titulo={titulo}>
      <View style={styles.container}>
        <View style={styles.dados}>
          <Text style={styles.semEventos}>Ano Mês</Text>
          <Text>2022/04</Text>
        </View>
        <View style={styles.dados}>
          <Text style={styles.semEventos}>Entradas</Text>
          <Text>R$12.345</Text>
        </View>
        <View style={styles.dados}>
          <Text style={styles.semEventos}>Saídas</Text>
          <Text>R$12.000</Text>
        </View>
        <View style={styles.dados}>
          <Text style={styles.semEventos}>Orçado</Text>
          <Text>R$13.345</Text>
        </View>
      </View>
    </ContainerPage>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: hp('15%'),
      alignItems: 'center',
      backgroundColor: PAMPAS,
    },
    dados: {
      alignItems: 'center',
      marginBottom: hp('4%'),
      marginTop: hp('4%'),
    },
    semEventos: {
      color: PIPER,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
  });
};
