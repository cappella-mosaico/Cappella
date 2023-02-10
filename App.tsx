import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LandingPage} from './src/views/LandingPage';
import {DetalhesItem} from './src/views/DetalhesItem';
import {Pastoral} from './src/views/Pastoral';

import {COR_DE_FUNDO, TITLE} from './src/styles/styles';
import {Evento} from './src/views/Eventos';
import {EventoDesc} from './src/views/Eventos/eventoDesc';
import {EventoForm} from './src/views/Eventos/eventoForm';

export type RootStackParamList = {
  Home: undefined;
  PastoralItem: {textoCard: string};
  DetalhesItem: {titulo: string; id: string};
  EventoDesc: {evento: Evento};
  EventoItem: {evento: Evento};
  EventoForm: {evento: Evento};
  Item: undefined;
};

const HomeStack = createStackNavigator();

const App = () => {
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
            <HomeStack.Screen
              name="EventoForm"
              component={EventoForm}
              options={{headerShown: false}}
            />
          </HomeStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: COR_DE_FUNDO,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
