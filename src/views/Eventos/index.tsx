import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Aguarde} from '../../components/Aguarde';
import {ContainerPage} from '../../components/ContainerPage';
import {BACKEND_URL} from '../../utils/utils';
import {EventoItem} from './eventoItem';
import {SemItem} from '../../components/SemItem';
// import {EVENTOS} from './data/Evento';
export interface Evento {
  id: number;
  titulo: string;
  dataInicial: Date;
  dataFim?: Date;
  imagem: string;
  sobre: string;
  valor: string;
  local: string;
  endereco: string;
}

export const Eventos = () => {
  const [isLoading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>();

  // const eventos = EVENTOS;
  // const isLoading = false;

  useEffect(() => {
    fetch(`${BACKEND_URL}/eventos`)
      .then((response) => response.json())
      .then((json) => setEventos(json))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const existeEventoFuturo = () => {
    return eventos?.find(
      (evento) => new Date(evento.dataInicial) >= new Date(),
    );
  };

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        {isLoading ? (
          <View style={styles.aguarde}>
            <Aguarde />
          </View>
        ) : (
          <View style={styles.container}>
            {eventos?.length && existeEventoFuturo() ? (
              eventoList(
                eventos.filter((e) => new Date(e.dataInicial) >= new Date()),
              )
            ) : (
              <SemItem texto="Nenhum evento programado" />
            )}
          </View>
        )}
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
  aguarde: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    marginTop: hp('15%'),
  },
});
