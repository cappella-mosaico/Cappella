import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Area,
  Chart,
  ChartDataPoint,
  HorizontalAxis,
  Line,
  Tooltip,
  VerticalAxis,
} from 'react-native-responsive-linechart';

import {BLACKISH, GREEN, HIDDEN_GREEN, LOW_GREEN, ORANGE, ORANGEBUTTON, OTHERGRAY, PIPER} from '../../styles/styles';
import {FinancasPorAno, Financeiro, months} from './common';

interface Props {
  meses: Financeiro[];
}

export interface FinanceiroItem {
  item: FinancasPorAno;
  index: number;
}

export const ChartFinanceiro = ({meses}: Props) => {
  const orcado = meses[0].orcado;

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

  return (
    <View style={styles.viewChart}>
      <Chart
        style={styles.chart}
        data={mapData(meses)}
        padding={{left: 75, bottom: 15, right: 46, top: 50}}
        xDomain={{min: 1, max: meses.length}}
        yDomain={{
          min: 0,
          max: orcado * 2,
        }}>
        <VerticalAxis
          tickValues={[orcado * 2, orcado * 1.5, orcado, orcado / 2]}
          theme={{
            labels: {
              label: {
                color: BLACKISH,
                dy: 0,
              },
              formatter: (v) => `R$${(Math.floor(v) / 1000).toFixed(0)} mil`,
            },
            axis: {visible: false},
          }}
        />
        <HorizontalAxis
          tickCount={meses.length}
          theme={{
            labels: {
              label: {
                color: BLACKISH,
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
              from: {color: GREEN},
              to: {color: LOW_GREEN, opacity: 0.5},
            },
          }}
        />
        <Line
          tooltipComponent={
            <Tooltip
              theme={{
                shape: {
                  color: ORANGE,
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
            stroke: {color: HIDDEN_GREEN, width: 5},
          }}
        />
        <Line
          smoothing="cubic-spline"
          data={mapDataOrcado(meses)}
          theme={{stroke: {color: ORANGE, width: 2}}}
        />
      </Chart>
    </View>
  );
};

const styles = StyleSheet.create({
  viewChart: {
    width: wp('98%'),
  },
  chart: {
    height: hp('30%'),
  },
});
