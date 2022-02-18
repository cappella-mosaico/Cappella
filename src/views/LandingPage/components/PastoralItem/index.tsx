import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GenericItem} from '../../../../components/GenericItem';
import {Image, StyleSheet} from 'react-native';
import {ProfileScreenNavigationProp} from '../../../../../App';

export const PastoralItem = () => {
  const navigation: ProfileScreenNavigationProp = useNavigation();
  const textoCard = 'uma palavra pastoral';

  return (
    <GenericItem
      textoCard={textoCard}
      icon={
        <Image
          source={require('../../../../assets/images/pastoral.png')}
          style={styles.imagem}
          resizeMode="contain"
        />
      }
      width={wp('84%')}
      height={hp('30%')}
      onNavigate={() =>
        navigation.push('Pastoral', {
          textoCard,
        })
      }
    />
  );
};

const styles = StyleSheet.create({
  imagem: {
    width: wp('80%'),
    height: hp('15%'),
  },
});
