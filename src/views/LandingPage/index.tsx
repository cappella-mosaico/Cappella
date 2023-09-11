import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Item} from './components/Item';
import {PastoralItem} from './components/PastoralItem';
import {SIZE_X_LARGE} from '../../styles/styles';
import {
  IconContribua,
  IconAgenda,
  IconIgreja,
  IconFinancas,
  IconComunidade,
  IconEscala,
} from '../../assets/images/Icons';

export const LandingPage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={DATA}
        ListHeaderComponent={<PastoralItem />}
        renderItem={({item}) => (
          <Item
            id={item.id}
            titulo={item.titulo}
            imagem={item.imagem}
            textoCard={item.textoCard}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZE_X_LARGE,
  },
  imagem: {
    height: 67,
  },
});

const DATA = [
  {
    id: 'contribua',
    textoCard: 'contribua',
    titulo: 'CONTRIBUA',
    imagem: IconContribua,
    url: '',
  },
  {
    id: 'agenda',
    textoCard: 'agenda',
    titulo: 'AGENDA',
    imagem: IconAgenda,
    url: '',
  },
  {
    id: 'financas',
    textoCard: 'finanças',
    titulo: 'FINANÇAS',
    imagem: IconFinancas,
    url: '',
  },
  {
    id: 'eventos',
    textoCard: 'eventos',
    titulo: 'eventos',
    imagem: IconComunidade,
    url: '',
  },
  {
    id: 'escala',
    textoCard: 'escala',
    titulo: 'ESCALA',
    imagem: IconEscala,
    url: '',
  },
  {
    id: 'escala',
    textoCard: 'escala',
    titulo: 'ESCALA',
    imagem: IconEscala,
    url: '',
  },
  {
    id: 'contato',
    textoCard: 'conheça a mosaico',
    titulo: 'MOSAICO',
    imagem: IconIgreja,
    url: '',
  },
];
