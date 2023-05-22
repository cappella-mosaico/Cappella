import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {MINISTERIO} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import {FONT_GILLSANS, WAIKAWAGREY, WHITE} from '../../styles/styles';
import CarouselCardItem from './CarouselCardItem';
import {BACKEND_URL, createSetFromArray} from '../../utils/utils';
import {Aguarde} from '../../components/Aguarde';

export interface Equipe {
  nome: string;
  lider: string;
  participantes: string[];
}

export interface Escala {
  id: string;
  ministerio: string;
  nome: string;
  inicio: string;
  equipe: Equipe;
  local: string;
  periodo: string;
}

export interface EscalaByDay {
  dia: string;
  escalas: Escala[];
}

interface MenuEscalaItem {
  item: Escala;
  index: number;
}

export const SLIDER_WIDTH = Dimensions.get('window').width + 95;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const Escala = () => {
  const isCarousel = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [menuIndex, setMenuIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [escalaList, setEscalaList] = useState<Escala[]>([]);
  const [activeMinisterio, setActiveMinisterio] = useState<string>();

  useEffect(() => {
    fetch(`${BACKEND_URL}/compromissos`)
      .then((response) => response.json())
      .then((json) => {
        setEscalaList(
          json.sort((a: Escala, b: Escala) => {
            if (a.ministerio < b.ministerio) {
              return -1;
            }
            if (a.ministerio > b.ministerio) {
              return 1;
            }
            return 0;
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (escalaList.length > 0) {
      setActiveMinisterio(escalaList[0].ministerio);
    }
  }, [escalaList]);

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

  const data = escalaList
    .filter((escala) => new Date(escala.inicio) >= new Date())
    .sort((a: Escala, b: Escala) => {
      if (new Date(a.inicio) < new Date(b.inicio)) {
        return -1;
      }
      if (new Date(a.inicio) > new Date(b.inicio)) {
        return 1;
      }
      return 0;
    });

  const menuData = [...new Map(data.map((m) => [m.ministerio, m])).values()];
  let cardsData = data.filter(
    (escala) => escala.ministerio === activeMinisterio,
  );
  const resultMap = createSetFromArray(cardsData);
  const escalasByDay: EscalaByDay[] = Array.from(
    resultMap,
    ([dia, escalas]) => ({
      dia,
      escalas,
    }),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ContainerPage titulo={'ESCALAS'}>
        {isLoading ? (
          <View style={styles.aguarde}>
            <Aguarde />
          </View>
        ) : (
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
              data={escalasByDay}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={(i) => setCardIndex(i)}
              useScrollView={true}
            />
            <Pagination
              dotsLength={escalasByDay.length}
              activeDotIndex={cardIndex}
              carouselRef={isCarousel}
              dotStyle={styles.dotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </View>
        )}
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
    height: 50,
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
    marginTop: 15,
    marginBottom: 15,
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
  aguarde: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    marginTop: hp('15%'),
  },
});
