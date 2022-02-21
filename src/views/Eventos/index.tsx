import React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ContainerPage} from '../../components/ContainerPage';
import {EventoItem} from './eventoItem';
import {SemEvento} from './semEvento';
import {EVENTOS} from './data/Evento';
export interface Evento {
  titulo: string;
  dataInicial: Date;
  dataFim?: Date;
  imagemURL: string;
  sobre: string;
  valor: string;
  local: string;
  endereco: string;
}

export const Eventos = () => {
  const list = EVENTOS;

  const eventoList = (EVENTO: Evento[]) => {
    return (
      <FlatList
        style={styles.containerList}
        numColumns={1}
        data={EVENTO}
        renderItem={({item}) => <EventoItem evento={item} />}
        keyExtractor={(item) => item.titulo}
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
  containerList: {
    height: hp('80%'),
  },
});
