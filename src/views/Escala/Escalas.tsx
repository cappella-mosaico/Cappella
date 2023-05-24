import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  WOODSMOKE,
} from '../../styles/styles';
import {Escala} from '.';
import Participante from './Participante';
import Lider from './Lider';
import Periodo from './Periodo';

interface Grupo {
  periodo: string;
  groupedEscalas: Escala[];
}

const Escalas = ({periodo, groupedEscalas}: Grupo) => {
  return (
    <>
      <Periodo periodo={periodo} />

      {groupedEscalas.map((value, i) => {
        const {equipe, nome} = value;
        const {lider, participantes} = equipe;

        return (
          <View key={`${nome}-${i}`}>
            <Text
              allowFontScaling={false}
              style={[styles.woodSmoke, styles.fontSize12]}>
              {nome}
            </Text>
            <Lider lider={lider} />
            <View style={styles.marginTop5}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.marginTop5,
                  styles.fontAvenirBlack,
                  styles.fontSize12,
                  styles.woodSmoke,
                ]}>
                Equipe:
              </Text>
              {participantes.length === 1 ? (
                <View style={[styles.liderMultipleEquipe, styles.marginTop5]}>
                  <Participante participante={participantes[0]} />
                </View>
              ) : (
                <FlatList
                  numColumns={1}
                  data={participantes}
                  renderItem={({item}) => (
                    <View style={styles.marginTop5} key={item}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.woodSmoke,
                          styles.fontAvenirRoman,
                          styles.fontSize12,
                        ]}>{`\u2022 ${item}`}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => `${item}${index}`}
                />
              )}
            </View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  titulo: {
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
  },
  periodo: {
    marginTop: 10,
    marginBottom: 5,
  },
  liderEquipe: {
    marginRight: 10,
  },
  liderMultipleEquipe: {
    display: 'flex',
    flexDirection: 'row',
  },
  fontAvenirBlack: {
    fontFamily: FONT_AVENIR_BLACK,
  },
  fontAvenirRoman: {
    fontFamily: FONT_AVENIR_ROMAN,
  },
  fontSize12: {
    fontSize: 12,
  },
  woodSmoke: {
    color: WOODSMOKE,
  },
  marginTop5: {
    marginTop: 5,
  },
});

export default Escalas;
