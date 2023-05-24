import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../styles/styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CardsWrappers = ({children}: Props) => {
  return (
    <View style={styles.containerCards}>
      <View style={styles.containerTexts}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    backgroundColor: WHITE,
    borderRadius: 8,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginLeft: 11,
    marginRight: 11,
  },
  containerTexts: {
    marginLeft: 25,
    marginBottom: 15,
    marginTop: 10,
  },
});

export default CardsWrappers;
