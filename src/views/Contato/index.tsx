import React, {useState} from 'react';
import Collapsible from 'react-native-collapsible';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {BotaoBranco} from '../../components/BotaoBranco';
import {ContainerPage} from '../../components/ContainerPage';
import {
  ALTO,
  JUMBO,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  FONT_AVENIR_BOOK,
  IRON,
  ORANGEBUTTON,
  SUBTEXT,
} from '../../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faUserTie,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {handlePress} from '../../utils/handlePress';
import {FALLBACK} from './data/Contato';
import {MosaicoOnline} from './mosaicoOnline';
import {Missao} from './missao';

interface Contato {
  endereco: string;
  telefone: string;
  email: string;
  localizacao: string;
  missao: string;
  horarios: string;
  pastor: string;
}

export const Contato = () => {
  const styles = getStyles();
  const logo = require('../../assets/images/mosaico.png');
  const [collapsed, setCollapsed] = useState(true);

  const containerMissao = (missao: string, horarios: string) => {
    return (
      <View style={styles.containerMissao}>
        <Image source={logo} style={styles.imagem} resizeMode="contain" />
        <View>
          <Text allowFontScaling={false} style={styles.missao}>
            {horarios}
          </Text>
        </View>
      </View>
    );
  };

  const containerInfo = (
    pastor: string,
    email: string,
    telefone: string,
    endereco: string,
    localizacao: string,
  ) => {
    return (
      <View style={styles.containerTexto}>
        <Text allowFontScaling={false} style={styles.title}>
          Informação de contato
        </Text>
        <View style={styles.containerInfo}>
          <FontAwesomeIcon icon={faUserTie} color={ORANGEBUTTON} size={10} />
          <Text allowFontScaling={false} style={styles.text}>
            {pastor}
          </Text>
        </View>
        <View style={styles.containerInfo}>
          <FontAwesomeIcon icon={faEnvelope} color={ORANGEBUTTON} size={10} />
          <Text allowFontScaling={false} style={styles.text}>
            {email}
          </Text>
        </View>
        <View style={styles.containerInfo}>
          <FontAwesomeIcon icon={faPhoneAlt} color={ORANGEBUTTON} size={10} />
          <Text allowFontScaling={false} style={styles.text}>
            {telefone}
          </Text>
        </View>
        <View style={styles.containerEndereco}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color={ORANGEBUTTON}
            size={11}
          />
          <Text
            allowFontScaling={false}
            style={[styles.text, styles.textEndereco]}>
            {endereco}
          </Text>
          <BotaoBranco
            titulo={'Ver no mapa'}
            onPress={() => handlePress(localizacao)}
          />
        </View>
      </View>
    );
  };

  const containerMosaicoOnline = () => {
    return (
      <View style={styles.containerTexto}>
        <Text allowFontScaling={false} style={styles.title}>
          Mosaico online
        </Text>
        <MosaicoOnline />
      </View>
    );
  };

  const containerMissionarios = () => {
    return (
      <>
        <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
          <View style={styles.header}>
            <Text style={styles.title}>Missionários</Text>
            <FontAwesomeIcon
              icon={collapsed ? faChevronDown : faChevronUp}
              color={JUMBO}
              size={13}
              style={styles.chevron}
            />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="center">
          <Missao />
        </Collapsible>
        <Text style={styles.conselho}>
          Para acessar mais informações, favor contatar o conselho missionário
          da Igreja Presbiteriana Mosaico
        </Text>
      </>
    );
  };

  const contatoItems = (CONTATO: Contato) => {
    const {
      endereco,
      telefone,
      email,
      localizacao,
      missao,
      horarios,
      pastor,
    } = CONTATO;

    return (
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            {containerMissao(missao, horarios)}
            {containerInfo(pastor, email, telefone, endereco, localizacao)}
            {containerMosaicoOnline()}
          </>
        }
        ListFooterComponent={containerMissionarios()}
        data={[]}
        renderItem={({item}) => item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <ContainerPage>{contatoItems(FALLBACK)}</ContainerPage>
    </SafeAreaView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    droidSafeArea: {
      flex: 1,
    },
    container: {
      marginTop: hp('4%'),
    },
    containerTexto: {
      width: wp('73%'),
      alignSelf: 'center',
      marginTop: hp('3.5%'),
    },
    imagem: {
      width: wp('43%'),
      alignSelf: 'center',
    },
    containerInfo: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    containerEndereco: {
      flexDirection: 'row',
    },
    text: {
      color: SUBTEXT,
      marginLeft: wp('3%'),
      textAlign: 'left',
      fontFamily: FONT_AVENIR_ROMAN,
      fontSize: wp('3.1%'),
      lineHeight: hp('1.7%'),
    },
    textEndereco: {
      width: wp('48%'),
    },
    title: {
      color: JUMBO,
      marginLeft: wp('5%'),
      textAlign: 'left',
      fontFamily: FONT_AVENIR_BLACK,
      fontSize: wp('4%'),
      marginBottom: hp('3.5%'),
    },
    chevron: {
      marginLeft: wp('2%'),
    },
    containerMissao: {
      display: 'flex',
      flexDirection: 'row',
      height: hp('15%'),
      backgroundColor: ALTO,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0.2,
        height: 0.2,
      },
      shadowOpacity: 0.2,
      elevation: 2,
    },
    missao: {
      width: wp('48%'),
      color: IRON,
      fontSize: wp('3.3%'),
      fontFamily: FONT_AVENIR_ROMAN,
      textAlign: 'center',
      lineHeight: hp('1.7%'),
    },
    conselho: {
      width: wp('56%'),
      color: IRON,
      fontSize: wp('3.1%'),
      fontFamily: FONT_AVENIR_BOOK,
      textAlign: 'center',
      justifyContent: 'center',
      marginLeft: wp('20%'),
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: hp('3.5%'),
      marginLeft: wp('14%'),
      justifyContent: 'flex-start',
    },
  });
};
