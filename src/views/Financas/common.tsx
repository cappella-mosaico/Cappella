import { Dimensions } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 95;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export interface Financeiro {
  anoMes: number[];
  entradas: number;
  saidas: number;
  orcado: number;
}

export interface FinancasPorAno {
  ano: number;
  meses: Financeiro[];
}

export interface FinanceiroItem {
  item: FinancasPorAno;
  index: number;
}

export const months = [
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