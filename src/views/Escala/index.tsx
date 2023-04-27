import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

import {FALLBACK, MINISTERIO} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import {EscalaItem} from './escalaItem';
import {FONT_GILLSANS, WAIKAWAGREY, WHITE} from '../../styles/styles';

export interface Equipe {
  nome: string;
  lider: string;
  equipe: string[];
}

export type Escala = {
  id: string;
  nome: string;
  inicio: string;
  ministerio: string;
  equipes: Equipe[];
};

interface MenuEscalaItem {
  item: Escala;
  index: number;
}

export const Escala = () => {
  const isCarousel = useRef(null);
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
      <TouchableOpacity
        key={index}
        onPress={() => {
          setActiveIndex(index);
          setActiveMinisterio(item.ministerio);
        }}>
        <View style={styles.botaoContainer}>
          <Text allowFontScaling={false} style={styles.botaoTexto}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
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
            sliderWidth={400}
            itemWidth={160}
            useScrollView={true}
            onSnapToItem={(index) => setActiveIndex(index)}
            ref={isCarousel}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeIndex}
            carouselRef={isCarousel}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
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
  botaoContainer: {
    backgroundColor: WHITE,
    width: 160,
    height: 70,
    borderRadius: 10,
    borderColor: WAIKAWAGREY,
    borderWidth: 1,
    justifyContent: 'center',
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    marginTop: 17,
    marginBottom: 5,
  },
  botaoTexto: {
    fontFamily: FONT_GILLSANS,
    fontSize: 14,
    color: WAIKAWAGREY,
    textAlign: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    marginTop: -9.9,
    borderRadius: 5,
    marginHorizontal: 0,
  },
});
