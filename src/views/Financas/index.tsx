import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Area,
  Chart,
  ChartDataPoint,
  HorizontalAxis,
  Line,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Aguarde} from '../../components/Aguarde';

import {ContainerPage} from '../../components/ContainerPage';
import {
  FONT_AVENIR_ROMAN,
  PAMPAS,
  PIPER,
  ORANGEBUTTON,
  ACTIVE_GREEN,
} from '../../styles/styles';

interface Props {
  titulo: string;
}

interface Financeiro {
  anoMes: number[];
  entradas: number;
  saidas: number;
  orcado: number;
}

export const Financas = ({titulo}: Props) => {
  const styles = getStyles();
  const [isLoading, setLoading] = useState(true);
  const [financeiroList, setFinanceiroList] = useState<Financeiro[]>();

  useEffect(() => {
    fetch('http://admin.ipmosaico.com:8889/financeiro/public/latest?amount=5')
      .then((response) => response.json())
      .then((json) => setFinanceiroList(json))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const mapData = (financeiros: Financeiro[]): ChartDataPoint[] => {
    return financeiros.map((financeiro: Financeiro) => ({
      x: financeiro.anoMes[1],
      y: financeiro.entradas,
    }));
  };

  // const kFormatter = (num: number) =>
  //   Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
  //     : Math.sign(num) * Math.abs(num);

  const financeiroItems = (financeiros: Financeiro[]) => {
    return (
      <View style={styles.container}>
        {!financeiros ? (
          <View style={styles.dados}>
            <Text style={styles.item}>Orçamento ainda não cadastrado.</Text>
          </View>
        ) : (
          <>
            <Chart
              style={styles.chart}
              data={mapData(financeiros)}
              padding={{left: 40, bottom: 20, right: 20, top: 20}}
              xDomain={{min: 1, max: 6}}
              yDomain={{min: 0, max: financeiros[0].orcado}}>
              <VerticalAxis
                tickCount={10}
                theme={{
                  labels: {
                    formatter: (v) => {
                      return `${(Math.abs(v) / 1000).toFixed(0)} K`;
                    },
                  },
                }}
              />
              <HorizontalAxis
                tickCount={6}
                theme={{
                  labels: {
                    formatter: (v) => {
                      switch (v) {
                        case 1:
                          return 'Jan';
                        case 2:
                          return 'Fev';
                        case 3:
                          return 'Mar';
                        case 4:
                          return 'Abr';
                        case 5:
                          return 'Mai';
                        case 6:
                          return 'Jun';
                        default:
                          return '';
                      }
                    },
                  },
                }}
              />
              <Area
                theme={{
                  gradient: {
                    from: {color: ORANGEBUTTON},
                    to: {color: ORANGEBUTTON, opacity: 0.2},
                  },
                }}
              />
              <Line
                theme={{
                  stroke: {color: ORANGEBUTTON, width: 5},
                  scatter: {
                    default: {width: 8, height: 8, rx: 4, color: ACTIVE_GREEN},
                    selected: {color: 'red'},
                  },
                }}
              />
            </Chart>
            <Chart
              style={styles.chart}
              data={mapData(financeiros)}
              padding={{left: 40, bottom: 20, right: 20, top: 20}}
              xDomain={{min: 7, max: 12}}
              yDomain={{min: 0, max: financeiros[0].orcado}}>
              <VerticalAxis
                tickCount={10}
                theme={{
                  labels: {
                    formatter: (v) => {
                      return `${(Math.abs(v) / 1000).toFixed(0)} K`;
                    },
                  },
                }}
              />
              <HorizontalAxis
                tickCount={6}
                theme={{
                  labels: {
                    formatter: (v) => {
                      switch (v) {
                        case 7:
                          return 'Jul';
                        case 8:
                          return 'Ago';
                        case 9:
                          return 'Set';
                        case 10:
                          return 'Out';
                        case 11:
                          return 'Nov';
                        case 12:
                          return 'Dez';
                        default:
                          return '';
                      }
                    },
                  },
                }}
              />
              <Area
                theme={{
                  gradient: {
                    from: {color: '#44bd32'},
                    to: {color: '#44bd32', opacity: 0.2},
                  },
                }}
              />
              <Line
                theme={{
                  stroke: {color: '#44bd32', width: 5},
                  scatter: {
                    default: {width: 8, height: 8, rx: 4, color: '#44ad32'},
                    selected: {color: 'red'},
                  },
                }}
              />
            </Chart>
            {/*<View style={styles.dados}>
              <Text style={styles.item}>Ano Mês</Text>
              <Text>{financeiros[0].anoMes}</Text>
            </View>
             <View style={styles.dados}>
              <Text style={styles.item}>Entradas</Text>
              <Text>{FINANCEIRO.entradas}</Text>
            </View>
            <View style={styles.dados}>
              <Text style={styles.item}>Saídas</Text>
              <Text>{FINANCEIRO.saidas}</Text>
            </View>
            <View style={styles.dados}>
              <Text style={styles.item}>Orçado</Text>
              <Text>{FINANCEIRO.orcado}</Text>
            </View> */}
          </>
        )}
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
    aguarde: {
      alignItems: 'center',
      marginBottom: hp('4%'),
      marginTop: hp('15%'),
    },
    item: {
      color: PIPER,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
    chart: {
      height: 200,
      width: 400,
    },
  });
};
