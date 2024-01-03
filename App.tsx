import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {TouchableOpacity, SafeAreaView, StyleSheet, Platform, StatusBar, View, Text } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import {LandingPage} from './src/views/LandingPage';
import {DetalhesItem} from './src/views/DetalhesItem';
import {Pastoral} from './src/views/Pastoral';

import {WHITE, TITLE, BLACKISH} from './src/styles/styles';
import {Evento} from './src/views/Eventos';
import {EventoDesc} from './src/views/Eventos/eventoDesc';
import {EventoForm} from './src/views/Eventos/eventoForm';
import {LogBox} from 'react-native';

import { IconIgreja, IconAoVivo, IconContribua } from './src/assets/images/Icons';

LogBox.ignoreLogs(['new NativeEventEmitter']);

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

const BottomBar = () => {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState({name: 'Landpage'});

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener('state', () => {
      const state = navigation.getState();
      const newRoute = state?.routes[state.index];
      setCurrentRoute(route => newRoute || route);
    });

    return unsubscribe;
  }, [navigation]);

  return (
      <View style={{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        backgroundColor: 'whitesmoke',
        height: hp('8%')}}>
        <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onPress={() => navigation.navigate('DetalhesItem', { id: 'contribua'})}>
          <SvgXml xml={IconContribua} height={hp(currentRoute.name == 'DetalhesItem' && currentRoute.params?.id === 'contribua' ? '5%' : '3.5%')} />
          <Text style={{fontSize: 10, color: BLACKISH, ...(currentRoute.name == 'DetalhesItem' && currentRoute.params?.id === 'contribua' ? {fontWeight: 'bold'} : {})}}>contribua</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onPress={() => navigation.navigate('Landpage')}>
          <SvgXml xml={IconAoVivo} height={hp(currentRoute.name == 'Landpage' ? '5%' : '3.5%')} />
          <Text style={{fontSize: 10, color: BLACKISH, ...(currentRoute.name == 'Landpage' ? {fontWeight: 'bold'} : {})}}>início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onPress={() => navigation.navigate('DetalhesItem', { id: 'contato' })}>
          <SvgXml xml={IconIgreja} height={hp(currentRoute.name == 'DetalhesItem' && currentRoute.params?.id === 'contato' ? '5%' : '3.5%')} />
          <Text style={{fontSize: 10, color: BLACKISH, ...(currentRoute.name == 'DetalhesItem' && currentRoute.params?.id === 'contato' ? {fontWeight: 'bold'} : {})}}>informações</Text>
        </TouchableOpacity>
        
      </View>
  );
}

export default App;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: WHITE
  },
});
