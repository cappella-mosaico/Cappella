import React from 'react';
import {FlatList, StyleSheet, View, Image} from 'react-native';
import {Item} from './components/Item';
import {PastoralItem} from './components/PastoralItem';
import {SIZE_X_LARGE} from '../../styles/styles';
import {
  IconContribua,
  IconAgenda,
  IconIgreja,
  IconFinancas,
  IconComunidade,
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
  },
  {
    id: 'agenda',
    textoCard: 'agenda',
    titulo: 'AGENDA',
    imagem: IconAgenda,
  },
  {
    id: 'financas',
    textoCard: 'finanças',
    titulo: 'FINANÇAS',
    imagem: IconFinancas,
  },
  {
    id: 'eventos',
    textoCard: 'eventos',
    titulo: 'eventos',
    imagem: IconComunidade,
  },
  {
    id: 'contato',
    textoCard: 'conheça a mosaico',
    titulo: 'MOSAICO',
    imagem: IconIgreja,
  },
];
