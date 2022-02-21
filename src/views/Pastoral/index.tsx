import React, {useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BOOK,
  FONT_AVENIR_BLACK,
  IRON,
  SUBTEXT,
} from '../../styles/styles';
import {getSize} from '../../utils/utils';
import {FALLBACK} from './data/Pastoral';
import {ContainerPage} from '../../components/ContainerPage';
import {ContainerServer} from '../../components/ContainerServer';
import {PastoralCollection} from '../../../imports/api/pastoral';
import {handleIsConnected} from '../../utils/handleIsConnected';
import {Aguarde} from '../../components/Aguarde';

interface Pastoral {
  titulo: string;
  autor: string;
  descricao: string;
}

export const Pastoral = () => {
  const {height} = useWindowDimensions();
  const styles = getStyles(getSize(height));
  const [isConnected, setIsConnected] = useState(false);

  handleIsConnected().then((value) => {
    setIsConnected(Boolean(value));
  });

  const pastoralItems = (PASTORAL: Pastoral) => (
    <>
      <Text style={styles.titulo}>{PASTORAL.titulo?.toUpperCase()}</Text>
      <Text style={styles.autor}>{PASTORAL.autor}</Text>
      <Text style={styles.descricao}>{PASTORAL.descricao}</Text>
    </>
  );

  return (
    <ContainerPage>
      <View style={styles.containerPagina}>
        <ScrollView style={styles.container}>
          {isConnected ? (
            <ContainerServer collection={PastoralCollection}>
              {(collection: Pastoral[]) => {
                const PASTORAL = collection[0];

                return PASTORAL ? pastoralItems(PASTORAL) : <Aguarde />;
              }}
            </ContainerServer>
          ) : (
            pastoralItems(FALLBACK)
          )}
        </ScrollView>
      </View>
    </ContainerPage>
  );
};

const getHeight = (size: string) => {
  switch (size) {
    case 'small':
    case 'medium':
      return hp('69%');
    case 'large':
    case 'xlarge':
    case 'xxlarge':
    case 'xxxlarge':
      return hp('80%');
    default:
      break;
  }
};

const getStyles = (size: string) => {
  return StyleSheet.create({
    containerPagina: {
      alignItems: 'center',
    },
    container: {
      marginTop: hp('5%'),
      width: wp('90%'),
      height: getHeight(size),
    },
    titulo: {
      fontSize: wp('6%'),
      fontFamily: FONT_AVENIR_BLACK,
      alignSelf: 'center',
      textAlign: 'center',
      color: IRON,
    },
    autor: {
      fontSize: wp('3%'),
      fontFamily: FONT_AVENIR_BOOK,
      alignSelf: 'flex-end',
      color: SUBTEXT,
      lineHeight: wp('6.3%'),
    },
    descricao: {
      fontSize: wp('4.4%'),
      fontFamily: FONT_AVENIR_ROMAN,
      color: IRON,
      lineHeight: wp('6.3%'),
      textAlign: 'left',
      marginTop: hp('2%'),
    },
  });
};
