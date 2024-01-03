import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  FONT_AVENIR_BOOK,
  FONT_GEORGIA_BOLD,
  FONT_GEORGIA,
  IRON,
  SUBTEXT,
  BLACK,
} from '../../styles/styles';
import {BACKEND_URL, getSize} from '../../utils/utils';
import {FALLBACK} from './data/Pastoral';
import {ContainerPage} from '../../components/ContainerPage';
import {Aguarde} from '../../components/Aguarde';

interface Pastoral {
  titulo: string;
  autor: string;
  descricao: string;
  pequenoTitulo: string;
}
interface SharedPastoral {
  message: string;
  url: string;
  title: string;
}

export const Pastoral = () => {
  const [isLoading, setLoading] = useState(true);
  const [pastoral, setPastoral] = useState<Pastoral>();
  const [isFallback, setFallback] = useState(false);
  const {height} = useWindowDimensions();
  const styles = getPastoralStyles(getSize(height));

  useEffect(() => {
    setFallback(false);

    fetch(`${BACKEND_URL}/pastorais?amount=1`)
      .then((response) => response.json())
      .then((json) => setPastoral(json[0]))
      .catch((error) => {
        console.error(error);
        setFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const onShare = ({message, url, title}: SharedPastoral) => async () => {
    try {
      const result = await Share.share({
        message,
        url,
        title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const pastoralItems = (PASTORAL: Pastoral) => {
    const url = `${BACKEND_URL}/pastorais/${PASTORAL.pequenoTitulo}`;
    const shareMessage = `Você vai gostar dessa pastoral da Igreja Presbiteriana Mosaico: ${url}`;
    return (
      <>
        <Text style={styles.titulo}>{PASTORAL.titulo?.toUpperCase()}</Text>
        <Text style={styles.autor}>{PASTORAL.autor}</Text>
        <Text style={styles.descricao}>{PASTORAL.descricao}</Text>
        <Button
          onPress={onShare({
            message: shareMessage,
            url,
            title: PASTORAL.titulo,
          })}
          title="Compartilhar"
        />
      </>
    );
  };

  return (
    <ContainerPage>
      <View style={styles.containerPagina}>
        <ScrollView style={styles.container}>
          {isFallback ? (
            pastoralItems(FALLBACK)
          ) : isLoading ? (
            <Aguarde />
          ) : (
            pastoralItems(pastoral!)
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

export const getPastoralStyles = (size: string) => {
  return StyleSheet.create({
    containerPagina: {
      alignItems: 'center',
      backgroundColor: 'white'
    },
    container: {
      marginTop: hp('5%'),
      marginBottom: hp('5%'),
      width: wp('90%'),
    },
    titulo: {
      fontSize: wp('6%'),
      fontFamily: FONT_GEORGIA,
      fontWeight: 'bold',
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
      fontFamily: FONT_GEORGIA,
      color: IRON,
      lineHeight: wp('6.3%'),
      textAlign: 'left',
      marginTop: hp('2%'),
    },
  });
};
