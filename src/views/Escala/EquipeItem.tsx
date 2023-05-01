import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WOODSMOKE} from '../../styles/styles';

interface Props {
  equipe: string;
}

export const EquipeItem = ({equipe}: Props) => {
  return (
    <View style={styles.containerEquipes} key={equipe}>
      <Text style={styles.equipe}>{equipe}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEquipes: {
    marginTop: 5,
    marginBottom: 5,
  },
  equipe: {
    color: WOODSMOKE,
    fontSize: 10,
  },
});
