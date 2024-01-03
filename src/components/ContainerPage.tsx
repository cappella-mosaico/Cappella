import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  SIZE_XXX_SMALL,
  WHITE,
  GRAY,
  HIDDEN_GREEN,
  ORANGE,
} from '../styles/styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ContainerPage = ({children}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={ORANGE}
            size={20}
            style={styles.imagemSeta}
          />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagemSeta: {
    marginLeft: SIZE_X_LARGE,
    marginTop: SIZE_XXX_SMALL,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: WHITE,
  }
});
