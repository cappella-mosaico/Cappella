import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WOODSMOKE} from '../../styles/styles';
import {FlatList} from 'react-native';

interface Props {
  participantes: string[];
}

export const EquipeItem = ({participantes}: Props) => {
  return (
    <FlatList
      numColumns={1}
      data={participantes}
      renderItem={({item}) => (
        <View style={styles.containerEquipes} key={item}>
          <Text allowFontScaling={false} style={styles.equipe}>
            {item}
          </Text>
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
