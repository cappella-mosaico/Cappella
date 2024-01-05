import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import {LandingPage} from './src/views/LandingPage';
import {DetalhesItem} from './src/views/DetalhesItem';
import {Pastoral} from './src/views/Pastoral';

import {WHITE, BLACKISH, LIGHTBLUE} from './src/styles/styles';
import {Evento} from './src/views/Eventos';
import {EventoDesc} from './src/views/Eventos/eventoDesc';
import {EventoForm} from './src/views/Eventos/eventoForm';
import {LogBox} from 'react-native';

import {IconIgreja, IconAoVivo, IconContribua} from './src/assets/images/Icons';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export type RootStackParamList = {
  Home: undefined;
  Landpage: undefined;
  PastoralItem: {textoCard: string};
  DetalhesItem: {id: string};
  EventoDesc: {evento: Evento};
  EventoItem: {evento: Evento};
  EventoForm: {evento: Evento};
  Item: undefined;
};

interface NavButtomProps {
  icon: string;
  text: string;
  selected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const HomeStack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      )}

      <NavigationContainer>
        <SafeAreaView style={styles.droidSafeArea}>
          <HomeStack.Navigator initialRouteName="Landpage">
            <HomeStack.Screen
              name="Landpage"
              component={LandingPage}
              options={{headerShown: false}}
            />
            <HomeStack.Screen
              name="DetalhesItem"
              component={DetalhesItem}
              options={{headerShown: false}}
            />
            <HomeStack.Screen
              name="Pastoral"
              component={Pastoral}
              options={{headerShown: false}}
            />
            <HomeStack.Screen
              name="EventoDesc"
              component={EventoDesc}
              options={{headerShown: false}}
            />
            <HomeStack.Screen
              name="EventoForm"
              component={EventoForm}
              options={{headerShown: false}}
            />
          </HomeStack.Navigator>
          <BottomBar />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

const NavButtom = ({icon, text, selected, onPress}: NavButtomProps) => {
  const navButtomStyles = getStyles(selected);

  return (
    <TouchableOpacity style={navButtomStyles.navButtom} onPress={onPress}>
      <SvgXml xml={icon} height={hp(selected ? '5%' : '4%')} />
      <Text style={navButtomStyles.navButtomText}>{text}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (selected: boolean) => {
  return StyleSheet.create({
    navButtom: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(selected
        ? {backgroundColor: LIGHTBLUE, borderRadius: 10, padding: 5}
        : {}),
    },
    navButtomText: {
      fontSize: 10,
      color: BLACKISH,
      ...(selected ? {fontWeight: 'bold'} : {}),
    },
  });
};

const BottomBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentRoute, setCurrentRoute] = useState({
    name: 'Landpage',
    params: {id: 'landpage'},
  });

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.getState();
      const newRoute = state?.routes[state.index];
      setCurrentRoute((route) => newRoute || route);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.bottomBarMainView}>
      <NavButtom
        icon={IconContribua}
        text="contribua"
        selected={
          currentRoute.name === 'DetalhesItem' &&
          currentRoute.params?.id === 'contribua'
        }
        onPress={() => navigation.navigate('DetalhesItem', {id: 'contribua'})}
      />

      <NavButtom
        icon={IconAoVivo}
        text="início"
        selected={currentRoute.name === 'Landpage'}
        onPress={() => navigation.navigate('Landpage')}
      />

      <NavButtom
        icon={IconIgreja}
        text="informações"
        selected={
          currentRoute.name === 'DetalhesItem' &&
          currentRoute.params?.id === 'contato'
        }
        onPress={() => navigation.navigate('DetalhesItem', {id: 'contato'})}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomBarMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    height: hp('9%'),
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: WHITE,
  },
});
