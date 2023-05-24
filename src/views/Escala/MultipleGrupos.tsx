import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  BLACK,
  FONT_AVENIR_BLACK,
  FONT_AVENIR_ROMAN,
  WHITE,
  WOODSMOKE,
} from '../../styles/styles';
import {Escala} from '.';
import {joinPeriodoValues} from '../../utils/utils';

interface Grupo {
  local: string;
  values: Escala[];
}

const MultipleGrupos = ({local, values}: Grupo) => {
  const groupedPeriodos = joinPeriodoValues(values);

  return (
    <View>
      <Text allowFontScaling={false} style={styles.titulo}>
        {local.toUpperCase()}
      </Text>
      <View style={styles.containerCards}>
        <View style={styles.containerTexts}>
          {groupedPeriodos.map((groupPeriodo, groupPeriodoIndex) => {
            const {periodo, values} = groupPeriodo;

            return (
              <View key={`${periodo}-${groupPeriodoIndex}`}>
                <Text style={styles.periodo}>{periodo.toUpperCase()}</Text>

                {values.map((value, i) => {
                  const {equipe, nome} = value;
                  const {lider, participantes} = equipe;
                  const result = participantes.join(', ');

                  return (
                    <View key={`${nome}-${i}`}>
                      {participantes.length === 1 ? (
                        <View style={styles.liderMultipleEquipe}>
                          <Text style={styles.equipe}>{nome}</Text>
                          <Text allowFontScaling={false} style={styles.equipe}>
                            {` - ${participantes[0]}`}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.espace}>
                          <Text style={styles.inicioLider}>{nome}</Text>
                          <View style={styles.liderMultipleEquipe}>
                            <Text style={styles.liderEquipe}>Lider:</Text>
                            <Text style={styles.liderEquipe}>{lider}</Text>
                          </View>
                          <View style={styles.liderMultipleEquipe}>
                            <Text style={styles.liderEquipe}>Equipe:</Text>
                            <Text style={styles.liderEquipe}>{result}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
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
  titulo: {
    color: WOODSMOKE,
    fontSize: 12,
    fontFamily: FONT_AVENIR_BLACK,
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 19,
  },
  periodo: {
    color: WOODSMOKE,
    fontSize: 12,
    fontFamily: FONT_AVENIR_BLACK,
    marginTop: 10,
  },
  equipe: {
    color: WOODSMOKE,
    fontSize: 12,
  },
  liderEquipe: {
    color: WOODSMOKE,
    fontFamily: FONT_AVENIR_ROMAN,
    fontSize: 12,
    marginRight: 10,
  },
  inicioLider: {
    color: WOODSMOKE,
    fontSize: 12,
    fontFamily: FONT_AVENIR_BLACK,
  },
  liderMultipleEquipe: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  espace: {
    marginTop: 5,
  },
});

export default MultipleGrupos;
