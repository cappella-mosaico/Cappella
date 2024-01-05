import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Item} from './components/Item';
import {PastoralItem} from './components/PastoralItem';
import {WHITE} from '../../styles/styles';
import {
  IconAgenda,
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
    backgroundColor: WHITE,
  },
});

const DATA = [
  {
    id: 'financas',
    textoCard: 'finanças',
    imagem: IconFinancas,
    url: '',
  },
  {
    id: 'eventos',
    textoCard: 'eventos',
    imagem: IconComunidade,
    url: '',
  },
  {
    id: 'escala',
    textoCard: 'escala',
    imagem: IconEscala,
    url: '',
  },
  {
<<<<<<< HEAD
    id: 'contato',
    textoCard: 'conheça a mosaico',
    titulo: 'MOSAICO',
    imagem: IconIgreja,
=======
    id: 'agenda',
    textoCard: 'pequenos grupos',
    imagem: IconAgenda,
>>>>>>> 001fcf11c34349bf88bc5a3f11cebf93675808d1
    url: '',
  },
];
