import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {handlePress} from '../utils/handlePress';
import {
  WHITE,
  SHADOW_BEIGE,
  SUBTEXT,
  FONT_AVENIR_BLACK,
  LIGHTERGRAY,
  BLACK,
  GRAY,
  DARKORANGE,
  IRON,
  BLACKISH,
  ORANGE,
  BROWN,
  HIDDEN_GREEN,
} from '../styles/styles';

interface Props {
  textoCard?: string;
  icon: JSX.Element;
  width: number;
  height: number;
  url?: string;
  onNavigate: (event: GestureResponderEvent) => void;
}

export const GenericItem = ({
  textoCard,
  icon,
  width,
  height,
  url,
  onNavigate,
}: Props) => {
  const styles = getStyles(width, height);

  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={url ? () => handlePress(url) : onNavigate}>
      {icon}
      {textoCard!! && (
        <Text allowFontScaling={false} 
              style={styles.texto}>
          {textoCard}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (width: number, height: number) => {
  return StyleSheet.create({
    containerItem: {
      width,
      height,
      backgroundColor: WHITE,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: GRAY,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4,
    },
    imagem: {
      height: 84,
    },
    texto: {
      marginTop: 8,
      fontFamily: FONT_AVENIR_BLACK,
      fontSize: wp('3.5%'),
      color: HIDDEN_GREEN,
    },
  });
};
