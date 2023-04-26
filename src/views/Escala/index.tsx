import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {FALLBACK} from './data/Escala';
import {ContainerPage} from '../../components/ContainerPage';
import CarouselCardItem from './CarouselCardItem';
import {Text} from 'react-native';
import {
  CAPER,
  COLORCOMUNIDADE,
  FONT_AVENIR_ROMAN,
  PIPER,
} from '../../styles/styles';

export interface Equipe {
  nome: string;
  lider: string;
  equipe: string[];
}

export type Escala = {
  id: string;
  nome: string;
  inicio: string;
  imagem: string;
  ministerio: string;
  tipo: string | null;
  equipes: Equipe[];
};

export const SLIDER_WIDTH = Dimensions.get('window').width + 95;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const Escala = () => {
  const styles = getStyles();
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  const escalaItems = (financeiros: Escala[]) => {
    if (!financeiros) {
      return (
        <View style={styles.container}>
          <View style={styles.containerSemOrcamentos}>
            <Image
              source={require('../../assets/images/semEventos.png')}
              style={styles.imagem}
              resizeMode="contain"
            />
            <Text style={styles.semOrcamentos}>
              Sem orçamentos para apresentar no momento.
            </Text>
          </View>
        </View>
      );
    }

    const data = [...new Map(FALLBACK.map((m) => [m.ministerio, m])).values()];

    return (
      <View style={styles.containerCarousel}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={FALLBACK}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(i) => setIndex(i)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    );
  };

  return (
    <ContainerPage titulo={'ESCALAS'}>{escalaItems(FALLBACK!)}</ContainerPage>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: hp('7%'),
      alignItems: 'center',
      backgroundColor: COLORCOMUNIDADE,
      borderColor: CAPER,
      borderWidth: 1,
      borderRadius: 10,
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    containerCarousel: {
      marginTop: hp('3%'),
      alignItems: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    aguarde: {
      alignItems: 'center',
      marginBottom: hp('4%'),
      marginTop: hp('15%'),
    },
    imagem: {
      height: hp('40%'),
    },
    semOrcamentos: {
      color: PIPER,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
    containerSemOrcamentos: {
      alignItems: 'center',
      marginBottom: hp('4%'),
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
  });
};
