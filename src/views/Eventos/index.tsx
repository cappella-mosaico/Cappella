import React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {ContainerPage} from '../../components/ContainerPage';
import {EventoItem} from './eventoItem';
import {SemEvento} from './semEvento';
import {EVENTOS} from './data/Evento';
export interface Evento {
  evento: string;
  data: string;
  imagemURL: string;
}

export const Eventos = () => {
  const list = EVENTOS;

  const eventoList = (EVENTO: Evento[]) => {
    return (
      <FlatList
        numColumns={1}
        data={EVENTO}
        renderItem={({item}) => <EventoItem evento={item} />}
        keyExtractor={(item) => item.evento}
      />
    );
  };

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <View style={styles.container}>
          {list.length ? eventoList(list) : <SemEvento />}
        </View>
      </ContainerPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
