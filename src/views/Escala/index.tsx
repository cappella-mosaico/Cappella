import React, {useState} from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

import {FONT_AVENIR_BLACK, BLUE} from '../../styles/styles';
import {FALLBACK, MINISTERIO} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import {EscalaItem} from './escalaItem';

export interface Equipe {
  nome: string;
  lider: string;
  equipe: string[];
}

type Escala = {
  id: string;
  nome: string;
  inicio: string;
  imagem: string;
  ministerio: string;
  tipo: string | null;
  equipes: Equipe[];
};

interface MenuEscalaItem {
  item: Escala;
  index: number;
}

export const Escala = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMinisterio, setActiveMinisterio] = useState<string>(
    FALLBACK[0].ministerio,
  );

  const escalaList = (escalas: Escala[]) => (
    <FlatList
      numColumns={1}
      data={escalas}
      renderItem={({item}) => <EscalaItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );

  const escalaMenuItem = ({item, index}: MenuEscalaItem) => {
    const title = (MINISTERIO as any)[item.ministerio];

    return (
      <Button
        title={title}
        onPress={() => {
          setActiveIndex(index);
          setActiveMinisterio(item.ministerio);
        }}
        key={index}
      />
    );
  };

  const data = [...new Map(FALLBACK.map((m) => [m.ministerio, m])).values()];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ContainerPage titulo={'ESCALAS'}>
        <View style={styles.container}>
          <Carousel
            firstItem={activeIndex}
            layout="default"
            layoutCardOffset={9}
            data={data}
            renderItem={escalaMenuItem}
            sliderWidth={300}
            itemWidth={100}
            useScrollView={true}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
          {escalaList(
            FALLBACK.filter(
              (escala) => escala.ministerio === activeMinisterio,
            ).sort(
              (a: Escala, b: Escala) =>
                new Date(b.inicio).valueOf() - new Date(a.inicio).valueOf(),
            ),
          )}
        </View>
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
