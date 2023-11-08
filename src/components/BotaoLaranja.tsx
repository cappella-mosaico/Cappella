import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {PEACH, BLOOD_RED, FONT_AVENIR_BLACK} from '../styles/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
      backgroundColor: PEACH,
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
      color: BLOOD_RED,
      textAlign: 'center',
    },
  });
};
