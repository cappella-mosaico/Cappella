import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Area,
  Chart,
  ChartDataPoint,
  HorizontalAxis,
  Line,
  Tooltip,
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
  PIPER,
  ORANGEBUTTON,
  WHITE,
  FONT_AVENIR_BLACK,
  OTHERGRAY,
  COMET,
  COLORCOMUNIDADE,
  CAPER,
  LIGHTGRAY,
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

  var months = [
    undefined,
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  useEffect(() => {
    fetch('http://admin.ipmosaico.com:8889/financeiro/public/latest?amount=5')
      .then((response) => response.json())
      .then((json) => {
        setFinanceiroList(json);
      })
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

  const mapDataOrcado = (financeiros: Financeiro[]): ChartDataPoint[] => {
    return financeiros.map((financeiro: Financeiro) => ({
      x: financeiro.anoMes[1],
      y: financeiro.orcado,
    }));
  };

  const financeiroItems = (financeiros: Financeiro[]) => {
    return (
      <>
        <>
          {!financeiros ? (
            <View style={styles.dados}>
              <Text style={styles.item}>
                Sem orçamentos para apresentar no momento.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.ano}>{financeiros[0].anoMes[0]}</Text>
              <Text style={styles.acumulado}>Acumulado:</Text>
              <View style={styles.container}>
                <View style={styles.containerAcumulado}>
                  <View style={styles.containerValores}>
                    <Text style={styles.valor}>orçado</Text>
                    <Text style={styles.valor}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(
                        financeiros.reduce((a, b) => a + (b.orcado || 0), 0),
                      )}
                    </Text>
                  </View>
                  <View style={styles.containerValores}>
                    <Text style={styles.valor}>receita</Text>
                    <Text style={styles.valor}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(
                        financeiros.reduce((a, b) => a + (b.entradas || 0), 0),
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.viewChart}>
                  <Chart
                    style={styles.chart}
                    data={mapData(financeiros)}
                    padding={{left: 65, bottom: 15, right: 45, top: 50}}
                    xDomain={{min: 1, max: financeiros.length}}
                    yDomain={{
                      min: 0,
                      max: financeiros[0].orcado * (1 + 0.2),
                    }}>
                    <VerticalAxis
                      tickValues={[
                        financeiros[0].orcado * (1 + 0.2),
                        financeiros[0].orcado,
                        financeiros[0].orcado / 2,
                      ]}
                      theme={{
                        labels: {
                          label: {
                            color: '#A3A3A3',
                            dy: 0,
                          },
                          formatter: (v) =>
                            `R$${(Math.floor(v) / 1000).toFixed(0)} mil`,
                        },
                        axis: {visible: false},
                      }}
                    />
                    <HorizontalAxis
                      tickCount={financeiros.length}
                      theme={{
                        labels: {
                          label: {
                            color: '#A3A3A3',
                            textAnchor: 'start',
                          },
                          formatter: (v) => (v ? `${months[v]}` : ''),
                        },
                        grid: {visible: false},
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
                      tooltipComponent={
                        <Tooltip
                          theme={{
                            shape: {
                              color: PIPER,
                              width: 60,
                              rx: 10,
                            },
                            formatter: ({y}) =>
                              `R$${(Math.floor(y) / 1000).toFixed(0)} mil`,
                          }}
                          position={{x: 500, y: 250}}
                        />
                      }
                      theme={{
                        stroke: {color: ORANGEBUTTON, width: 5},
                      }}
                    />
                    <Line
                      smoothing="cubic-spline"
                      data={mapDataOrcado(financeiros)}
                      theme={{stroke: {color: OTHERGRAY, width: 2}}}
                    />
                  </Chart>
                </View>
              </View>
              <View style={styles.dados}>
                <Text style={styles.item}>
                  {`R$ ${(Math.floor(financeiros[0].orcado) / 1000).toFixed(
                    0,
                  )} mil`}{' '}
                  mensais é a previsão para atender os compromissos assumidos
                  pela igreja em {financeiros[0].anoMes[0]}
                </Text>
              </View>
            </>
          )}
        </>
      </>
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
      marginTop: hp('6%'),
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
      color: COMET,
      fontSize: wp('4%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
      width: wp('70%'),
    },
    ano: {
      color: COMET,
      fontSize: wp('4%'),
      fontFamily: FONT_AVENIR_BLACK,
      textAlign: 'center',
      marginTop: hp('2.5%'),
    },
    acumulado: {
      color: COMET,
      fontSize: wp('4%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'auto',
      marginTop: hp('3.5%'),
      marginLeft: wp('11%'),
    },
    viewChart: {
      width: wp('105%'),
    },
    chart: {
      height: hp('35%'),
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
    containerAcumulado: {
      marginTop: -hp('3.5%'),
    },
  });
};
