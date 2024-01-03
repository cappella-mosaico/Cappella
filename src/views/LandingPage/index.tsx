import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Item} from './components/Item';
import {PastoralItem} from './components/PastoralItem';
import {BLUE, LIGHTBLUE, LIGHTERGRAY, LIGHTGRAY, SIZE_X_LARGE, WHITE} from '../../styles/styles';
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE
  }
});

const DATA = [
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
    id: 'agenda',
    textoCard: 'pequenos grupos',
    titulo: 'AGENDA',
    imagem: IconAgenda,
    url: '',
  },
];
