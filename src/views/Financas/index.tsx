import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Aguarde} from '../../components/Aguarde';

import {ContainerPage} from '../../components/ContainerPage';
import {
  FONT_AVENIR_ROMAN,
  PIPER,
  COLORCOMUNIDADE,
  CAPER,
} from '../../styles/styles';
// import {FINANCEIROS} from './data/Financas';
import CarouselCardItem from './CarouselCardItem';
import {BACKEND_URL} from '../../utils/utils';
import {Financeiro, ITEM_WIDTH} from './common';

interface Props {
  titulo: string;
}

export const Financas = ({titulo}: Props) => {
  const styles = getStyles();
  const [isLoading, setLoading] = useState(true);
  const [financeiroList, setFinanceiroList] = useState<Financeiro[]>();

  // const financeiroList = FINANCEIROS;
  // const isLoading = false;

  useEffect(() => {
    fetch(`${BACKEND_URL}/financeiro?amount=99999`)
      .then((response) => response.json())
      .then((json) => {
        setFinanceiroList(json);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const financeiroItems = (financeiros: Financeiro[]) => {
    if (!financeiros) {
      return (
        <View style={styles.container}>
          <View style={styles.containerSemOrcamentos}>
            <Image
              source={require('../../assets/images/semEventos.png')}
              style={styles.imagem}
              resizeMode="contain"
            />
            <Text style={styles.semOrcamentos}>
              Sem orçamentos para apresentar no momento.
            </Text>
          </View>
        </View>
      );
    }

    const financasPorAno = financeiros.map((financeiro) => ({
      ano: financeiro.anoMes[0],
      ...financeiro,
    }));

    const financasAgrupadas: any = Object.values(
      financasPorAno.reduce((acc: any, item) => {
        if (!acc[item.ano]) {
          acc[item.ano] = {
            ano: item.ano,
            meses: [],
          };
        }
        acc[item.ano].meses.push({...item});
        return acc;
      }, {}),
    );

    return (
      <View style={styles.containerCarousel}>
        <Carousel
          width={ITEM_WIDTH}
          data={financasAgrupadas.reverse()}
          renderItem={CarouselCardItem}
        />
      </View>
    );
  };

  return (
    <ContainerPage titulo={titulo}>
      {isLoading ? (
        <View style={styles.aguarde}>
          <Aguarde />
        </View>
      ) : (
        financeiroItems(financeiroList!)
      )}
    </ContainerPage>
  );
};

const getStyles = () => {
  return StyleSheet.create({
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
    containerCarousel: {
      marginTop: hp('3%'),
      alignItems: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    aguarde: {
      alignItems: 'center',
      marginBottom: hp('4%'),
      marginTop: hp('15%'),
    },
    imagem: {
      height: hp('40%'),
    },
    semOrcamentos: {
      color: PIPER,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
    containerSemOrcamentos: {
      alignItems: 'center',
      marginBottom: hp('4%'),
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
  });
};
