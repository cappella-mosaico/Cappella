import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BACKEND_URL, getSize} from '../../../../utils/utils';
import {GenericItem} from '../../../../components/GenericItem';
import { getPastoralStyles } from '../../../Pastoral';
import {Image, StyleSheet, View, Text, useWindowDimensions} from 'react-native';
import {RootStackParamList} from '../../../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { BotaoLaranja } from '../../../../components/Botao';
import { BRIGHT_GREEN, HIDDEN_GREEN, LOW_GREEN } from '../../../../styles/styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PastoralItem'
>;

export const PastoralItem = () => {
  const navigation: ProfileScreenNavigationProp = useNavigation();
  const textoCard = 'uma palavra pastoral';
  const {height} = useWindowDimensions();
  const [pastoral, setPastoral] = useState();
  const styles = getPastoralStyles(getSize(height));

  useEffect(() => {
    fetch(`${BACKEND_URL}/pastorais?amount=1`)
      .then((response) => response.json())
      .then((json) => setPastoral(json[0]))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{borderWidth: 1, flex: 1, padding: '5%', borderRadius: 10,
      borderColor: BRIGHT_GREEN, backgroundColor: LOW_GREEN, margin: 4, justifyContent: 'space-between'}}>
      <Text style={{...styles.titulo, color: HIDDEN_GREEN}}>{pastoral?.titulo?.toUpperCase()}</Text>
      <Text style={{...styles.autor, color: BRIGHT_GREEN}}>{pastoral?.autor}</Text>
      {/* style={{marginTop: 20, fontSize: 16, textAlign: 'justify'}} */}
      <Text style={{...styles.descricao, color: HIDDEN_GREEN}}>{pastoral?.descricao.split('\n')[0].substring(0, pastoral?.descricao.split('\n')[0].length-1).concat('...')}</Text>
      <View style={{width: '100%', display: 'flex', alignItems: 'flex-end'}}>
        <BotaoLaranja
              titulo="continuar lendo"
              onPress={() => navigation.push('Pastoral', { textoCard })}
            />
      </View>
    </View>
  );
};
