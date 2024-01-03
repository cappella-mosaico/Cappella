import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {PEACH, BLOOD_RED, FONT_AVENIR_BLACK, WHITE, HIDDEN_GREEN} from '../styles/styles';
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
      backgroundColor: HIDDEN_GREEN,
      width: 175,
      height: 45,
      borderRadius: 10,
      justifyContent: 'center',
    },
    botaoTexto: {
      fontFamily: FONT_AVENIR_BLACK,
      fontSize: 14,
      color: WHITE,
      textAlign: 'center',
    },
  });
};
