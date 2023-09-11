import React, {useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {ContainerPage} from '../../components/ContainerPage';
import {
  TITLE,
  FONT_AVENIR_BOOK,
  BEIGE,
  EXTRAORANGE,
  WHITE,
  IRON,
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BLACK,
  RED,
} from '../../styles/styles';
import {getSize} from '../../utils/utils';
import {FALLBACK} from './data/Contribua';

const handlePress = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

interface Contribua {
  nomeBanco: string;
  banco: string;
  agencia: string;
  cc: string;
  igreja: string;
  cnpj: string;
  chavePix: string;
}

export const Contribua = () => {
  const [chavePixCopiada, setChavePixCopiada] = useState(false);
  const {height} = useWindowDimensions();
  const styles = getStyles(getSize(height));

  const copyToClipboard = (cnpj: string) => {
    Clipboard.setString(cnpj);
    setChavePixCopiada(true);
  };

  const contribuaItems = (CONTRIBUA: Contribua) => {
    const {nomeBanco, banco, agencia, cc, igreja, cnpj, chavePix} = CONTRIBUA;

    return (
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.titulo}>
          DEPÓSITO EM CONTA
        </Text>
        <View style={styles.containerConta}>
          <View style={styles.banco}>
            <Text allowFontScaling={false} style={styles.conta}>
              {nomeBanco}
            </Text>
          </View>
          <View style={styles.containerBanco}>
            <Text allowFontScaling={false} style={styles.conta}>
              {banco}
            </Text>
            <Text allowFontScaling={false} style={styles.conta}>
              {agencia}
            </Text>
            <Text allowFontScaling={false} style={styles.conta}>
              {cc}
            </Text>
          </View>
        </View>

        <Text allowFontScaling={false} style={styles.titulo}>
          TRANSFERÊNCIA POR PIX
        </Text>
        <View style={styles.containerConta}>
          <View style={styles.containerPix}>
            <TouchableOpacity onPress={() => copyToClipboard(chavePix)}>
              <Text
                allowFontScaling={false}
                style={styles.conta}>{`Chave:  ${chavePix}`}</Text>
            </TouchableOpacity>
            {chavePixCopiada && (
              <Text allowFontScaling={false} style={styles.copiedText}>
                {'Chave Pix copiada'}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.containerPixInfo}
          onPress={() =>
            handlePress('https://www.bcb.gov.br/estabilidadefinanceira/pix')
          }>
          <Text allowFontScaling={false} style={styles.pix}>
            clique aqui e saiba mais sobre o pix
          </Text>
          <Image
            source={require('../../assets/images/logoPix.png')}
            style={styles.pixImg}
          />
        </TouchableOpacity>
        <View style={styles.containerIgreja}>
          <Text allowFontScaling={false} style={styles.detalhesIgreja}>
            {igreja}
          </Text>
          <Text
            allowFontScaling={false}
            style={styles.detalhesIgreja}>{`cnpj ${cnpj}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <ContainerPage titulo={'CONTRIBUA'}>
        {contribuaItems(FALLBACK)}
      </ContainerPage>
    </SafeAreaView>
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
      return hp('77%');
    default:
      break;
  }
};

const getStyles = (size: string) => {
  return StyleSheet.create({
    banco: {
      width: wp('73%'),
      height: wp('9%'),
      backgroundColor: WHITE,
      borderColor: EXTRAORANGE,
      borderWidth: 0.5,
      justifyContent: 'center',
      shadowOpacity: 0.1,
      elevation: 1,
    },
    conta: {
      color: EXTRAORANGE,
      fontSize: wp('4.5%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
      lineHeight: wp('6.3%'),
    },
    container: {
      width: wp('100%'),
      height: getHeight(size),
      alignItems: 'center',
      paddingVertical: hp('7%'),
    },
    containerBanco: {
      width: wp('73%'),
      height: hp('14%'),
      backgroundColor: BEIGE,
      justifyContent: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    containerConta: {
      margin: wp('7.5%'),
    },
    containerIgreja: {
      marginTop: hp('4%'),
    },
    containerPix: {
      width: wp('73%'),
      height: hp('6%'),
      backgroundColor: BEIGE,
      justifyContent: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    containerPixInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: wp('73%'),
    },
    cnpj: {
      color: TITLE,
      fontFamily: FONT_AVENIR_BOOK,
      textAlign: 'center',
    },
    copiedText: {
      color: RED,
      textAlign: 'center',
    },
    droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 5 : 0,
    },
    detalhesIgreja: {
      color: IRON,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_BOOK,
      textAlign: 'center',
      lineHeight: wp('7.2%'),
    },
    titulo: {
      color: EXTRAORANGE,
      fontSize: wp('5%'),
      fontFamily: FONT_AVENIR_BLACK,
    },
    pixImg: {
      width: wp('8%'),
      height: hp('4%'),
    },
    pix: {
      color: TITLE,
      fontSize: wp('3.9%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
    },
  });
};
