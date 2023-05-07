import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WOODSMOKE} from '../../styles/styles';
import {FlatList} from 'react-native';

interface Props {
  equipe: string[];
}

export const EquipeItem = ({equipe}: Props) => {
  return (
    <FlatList
      numColumns={1}
      data={equipe}
      renderItem={({item}) => (
        <View style={styles.containerEquipes} key={item}>
          <Text style={styles.equipe}>{item}</Text>
        </View>
      )}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  containerEquipes: {
    marginTop: 5,
    marginBottom: 5,
  },
  equipe: {
    color: WOODSMOKE,
    fontSize: 12,
  },
});
