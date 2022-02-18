import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  InteractionManager,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

const Meteor = require('@socialize/react-native-meteor');
import NetInfo from '@react-native-community/netinfo';
import Storage from '@react-native-community/async-storage';
const {
  unstable_batchedUpdates,
} = require('react-native/Libraries/Renderer/shims/ReactNative');

import {LandingPage} from './src/views/LandingPage';
import {DetalhesItem} from './src/views/DetalhesItem';
import {Pastoral} from './src/views/Pastoral';

import {COR_DE_FUNDO, TITLE} from './src/styles/styles';
import AsyncStorage from '@react-native-community/async-storage';
import {Evento} from './src/views/Eventos';
import {EventoDesc} from './src/views/Eventos/eventoDesc';

export type RootStackParamList = {
  Home: undefined;
  Pastoral: {textoCard: string};
  DetalhesItem: {id: string};
  EventoDesc: {evento: Evento};
  Item: undefined;
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Item'
>;

Meteor.configureOptionalDeps({
  InteractionManager,
  unstable_batchedUpdates,
  NetInfo,
  Storage,
});

Meteor.connect('wss://cappella.meteorapp.com/websocket');

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    console.log(e);
  }
};

Meteor.ddp.on('disconnected', () => {
  storeData('disconnected');
});

Meteor.ddp.on('connected', () => {
  storeData('connected');
});

const HomeStack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar backgroundColor={TITLE} barStyle="dark-content" />
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
          </HomeStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: COR_DE_FUNDO,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
