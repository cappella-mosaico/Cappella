import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {SIZE_X_LARGE, SIZE_XXX_SMALL, WHITE, ORANGE} from '../styles/styles';

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
  },
});
