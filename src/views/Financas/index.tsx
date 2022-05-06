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
  // const [mes, setMes] = useState<number>(0);

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
        // setMes(json.length);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));

    // const json = [
    //   {orcado: 54000, entradas: 32000, saidas: 1234, anoMes: [2022, 1]},
    //   {orcado: 54000, entradas: 30000, saidas: 1234, anoMes: [2022, 2]},
    //   {orcado: 54000, entradas: 45000, saidas: 1234, anoMes: [2022, 3]},
    //   {orcado: 54000, entradas: 58000, saidas: 1234, anoMes: [2022, 4]},
    // ];

    // setFinanceiroList(json);
    // setLoading(false);
    // // setMes(json.length);
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
                  // onTooltipSelect={(value: ChartDataPoint, _index: number) =>
                  //   setMes(value.x)
                  // }
                  theme={{
                    stroke: {color: ORANGEBUTTON, width: 5},
                    // scatter: {
                    //   default: {
                    //     width: 8,
                    //     height: 8,
                    //     rx: 4,
                    //     color: ACTIVE_GREEN,
                    //   },
                    //   selected: {color: 'red'},
                    // },
                  }}
                />
                <Line
                  smoothing="cubic-spline"
                  data={mapDataOrcado(financeiros)}
                  theme={{stroke: {color: OTHERGRAY, width: 2}}}
                />
              </Chart>
            </View>
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
      backgroundColor: '#f3f5ec',
      borderColor: '#B2C588',
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
      color: PIPER,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
    viewChart: {
      width: 420,
    },
    chart: {
      height: 300,
    },
    containerValores: {
      display: 'flex',
      flexDirection: 'row',
      width: 305,
      height: 67,
      marginBottom: hp('1%'),
      justifyContent: 'space-around',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: WHITE,
      borderColor: '#D1D1D1',
    },
    valor: {
      color: '#6C6C6D',
      fontSize: 16,
      fontFamily: FONT_AVENIR_BLACK,
    },
    containerAcumulado: {
      marginTop: -30,
    },
  });
};
