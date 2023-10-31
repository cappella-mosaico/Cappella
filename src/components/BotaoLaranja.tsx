import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {WHITE, ORANGE, FONT_AVENIR_BLACK} from '../styles/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Props {
  titulo: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const BotaoLaranja = ({titulo, onPress}: Props) => {
  const styles = getStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.botaoContainer}>
        <Text allowFontScaling={false} style={styles.botaoTexto}>
          {titulo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    botaoContainer: {
      backgroundColor: '#ffdec7',
      padding: wp('4%'),
      width: 175,
      height: 45,
      borderRadius: 10,
      opacity: 0.56,
      justifyContent: 'center',
    },
    botaoTexto: {
      fontFamily: FONT_AVENIR_BLACK,
      fontSize: 14,
      color: '#5c1b05',
      textAlign: 'center',
    },
  });
};
