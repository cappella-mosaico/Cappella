import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Aguarde} from '../../components/Aguarde';

import {ContainerPage} from '../../components/ContainerPage';
import {FONT_AVENIR_ROMAN, PAMPAS, PIPER} from '../../styles/styles';

interface Props {
  titulo: string;
}

interface Financeiro {
  anoMes: string;
  entradas: string;
  saidas: string;
  orcado: string;
}

export const Financas = ({titulo}: Props) => {
  const styles = getStyles();
  const [isLoading, setLoading] = useState(true);
  const [financeiro, setFinanceiro] = useState<Financeiro>();

  useEffect(() => {
    fetch('http://admin.ipmosaico.com:8889/financeiro/public/latest?amount=1')
      .then((response) => response.json())
      .then((json) => setFinanceiro(json[0]))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const financeiroItems = (FINANCEIRO: Financeiro) => {
    return (
      <ContainerPage titulo={titulo}>
        <View style={styles.container}>
          <View style={styles.dados}>
            <Text style={styles.semEventos}>Ano Mês</Text>
            <Text>{FINANCEIRO.anoMes}</Text>
          </View>
          <View style={styles.dados}>
            <Text style={styles.semEventos}>Entradas</Text>
            <Text>{FINANCEIRO.entradas}</Text>
          </View>
          <View style={styles.dados}>
            <Text style={styles.semEventos}>Saídas</Text>
            <Text>{FINANCEIRO.saidas}</Text>
          </View>
          <View style={styles.dados}>
            <Text style={styles.semEventos}>Orçado</Text>
            <Text>{FINANCEIRO.orcado}</Text>
          </View>
        </View>
      </ContainerPage>
    );
  };

  return <View>{isLoading ? <Aguarde /> : financeiroItems(financeiro!)}</View>;
};

const getStyles = () => {
  return StyleSheet.create({
    containerPagina: {
      alignItems: 'center',
    },
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
