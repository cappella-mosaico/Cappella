import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FONT_AVENIR_BLACK, BLUE} from '../../styles/styles';
import {FALLBACK} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import {EscalaItem} from './escalaItem';

export interface Equipe {
  equipe: string[];
}

type Escala = {
  id: string;
  nome: string;
  inicio: string;
  imagem: string;
  ministerio: string;
  tipo: string;
  equipes: Equipe[];
};

export const Escala = () => {
  const escalaList = (escalas: Escala[]) => (
    <FlatList
      numColumns={1}
      data={escalas}
      renderItem={({item}) => <EscalaItem {...item} />}
      keyExtractor={(item) => item.nome}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ContainerPage titulo={'AGENDA'}>
        <View style={styles.container}>{escalaList(FALLBACK)}</View>
      </ContainerPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  containerList: {
    marginTop: hp('5%'),
  },
  dia: {
    color: BLUE,
    fontSize: wp('4.8%'),
    fontFamily: FONT_AVENIR_BLACK,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginRight: wp('3%'),
    alignSelf: 'flex-end',
  },
});
