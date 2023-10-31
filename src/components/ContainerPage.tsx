import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {
  FONT_AVENIR_BLACK,
  IRON,
  ORANGEBUTTON,
  SIZE_XX_SMALL,
  SIZE_X_LARGE,
  SIZE_XXX_LARGE,
} from '../styles/styles';

interface Props {
  titulo?: string;
  children: JSX.Element | JSX.Element[];
}

export const ContainerPage = ({titulo, children}: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}
                          style={styles.setaContainer}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={ORANGEBUTTON}
            size={20}
            style={styles.imagemSeta}
          />
        </TouchableOpacity>
              {titulo && (
        <Text allowFontScaling={false} style={styles.titulo}>
          {titulo}
        </Text>
      )}
      </View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    color: IRON,
    fontSize: wp('5%'),
    fontFamily: FONT_AVENIR_BLACK,
    marginTop: SIZE_XX_SMALL,
    marginLeft: SIZE_X_LARGE,
  },
  imagemSeta: {
    marginLeft: SIZE_X_LARGE,
    marginTop: SIZE_XX_SMALL,
  },
  setaContainer: {

  }
});
