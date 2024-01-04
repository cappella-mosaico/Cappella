import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BACKEND_URL} from '../../../../utils/utils';
import {Pastoral, getPastoralStyles} from '../../../Pastoral';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Botao} from '../../../../components/Botao';
import {BLACKISH, IRON, LIGHTERGRAY} from '../../../../styles/styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PastoralItem'
>;

export const PastoralItem = () => {
  const navigation: ProfileScreenNavigationProp = useNavigation();
  const textoCard = 'uma palavra pastoral';
  const [pastoral, setPastoral] = useState<Pastoral>();
  const styles = getPastoralStyles();

  useEffect(() => {
    fetch(`${BACKEND_URL}/pastorais?amount=1`)
      .then((response) => response.json())
      .then((json) => setPastoral(json[0]))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.mainItemView}>
      <Text style={{...styles.titulo, color: BLACKISH}}>
        {pastoral?.titulo?.toUpperCase()}
      </Text>
      <Text style={{...styles.autor, color: IRON}}>{pastoral?.autor}</Text>
      <Text style={{...styles.descricao, color: BLACKISH}}>
        {pastoral?.descricao
          .split('\n')[0]
          .substring(0, pastoral?.descricao.split('\n')[0].length - 1)
          .concat('...')}
      </Text>
      <View style={styles.keepReading}>
        <Botao
          titulo="continuar lendo"
          onPress={() => navigation.push('Pastoral', {textoCard})}
        />
      </View>
    </View>
  );
};
