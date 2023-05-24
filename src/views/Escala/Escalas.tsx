import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Escala} from '.';
import Participante from './Participante';
import Lider from './Lider';
import Periodo from './Periodo';
import EscalaCarouselStyles from './EscalaCarousel.styles';

interface Grupo {
  periodo: string;
  groupedEscalas: Escala[];
}

const Escalas = ({periodo, groupedEscalas}: Grupo) => {
  const styles = EscalaCarouselStyles;

  return (
    <View key={periodo}>
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
    </View>
  );
};

export default Escalas;
