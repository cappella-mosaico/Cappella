import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

import {FALLBACK, MINISTERIO} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import {FONT_GILLSANS, WAIKAWAGREY, WHITE} from '../../styles/styles';
import CarouselCardItem from './CarouselCardItem';

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

export const SLIDER_WIDTH = Dimensions.get('window').width + 95;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const Escala = () => {
  const isCarousel = useRef(null);
  const [menuIndex, setMenuIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [activeMinisterio, setActiveMinisterio] = useState<string>(
    FALLBACK[0].ministerio,
  );

  const escalaMenuItem = ({item, index}: MenuEscalaItem) => {
    const title = (MINISTERIO as any)[item.ministerio];

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setMenuIndex(index);
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

  const data = FALLBACK.filter(
    (escala) => new Date(escala.inicio) >= new Date(),
  );

  const menuData = [...new Map(data.map((m) => [m.ministerio, m])).values()];
  const cardsData = data
    .filter((escala) => escala.ministerio === activeMinisterio)
    .sort(
      (a: Escala, b: Escala) =>
        new Date(a.inicio).valueOf() - new Date(b.inicio).valueOf(),
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ContainerPage titulo={'ESCALAS'}>
        <View style={styles.container}>
          <Carousel
            firstItem={menuIndex}
            layout="default"
            layoutCardOffset={9}
            data={menuData}
            renderItem={escalaMenuItem}
            sliderWidth={400}
            itemWidth={160}
            useScrollView={true}
            onSnapToItem={(index) => setMenuIndex(index)}
          />
          <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={cardsData}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(i) => setCardIndex(i)}
            useScrollView={true}
          />
          <Pagination
            dotsLength={cardsData.length}
            activeDotIndex={cardIndex}
            carouselRef={isCarousel}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
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
    marginTop: 50,
    marginBottom: 65,
  },
  botaoTexto: {
    fontFamily: FONT_GILLSANS,
    fontSize: 16,
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
