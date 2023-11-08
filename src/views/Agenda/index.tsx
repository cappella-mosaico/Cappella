import React from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {AgendaItem} from './agendaItem';
import {FONT_AVENIR_BLACK, BLUE} from '../../styles/styles';
import {FALLBACK} from './data/Agenda';
import {ContainerPage} from '../../components/ContainerPage';

interface data {
  atividade: string;
  horario: string;
}
interface Agenda {
  dia: string;
  data: data[];
}

export const Agenda = () => {
  const agendaList = (sections: Agenda[]) => (
    <SectionList
      style={styles.containerList}
      sections={sections}
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={({item}) => <AgendaItem {...item} />}
      renderSectionHeader={({section: {dia, data}}) => {
        return data.length ? <Text style={styles.dia}>{dia}</Text> : <></>;
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ContainerPage>
        <View style={styles.container}>{agendaList(FALLBACK)}</View>
      </ContainerPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    height: hp('80%'),
  },
  containerList: {
    marginTop: hp('5%'),
  },
  dia: {
    color: BLUE,
    fontSize: wp('3.8%'),
    fontFamily: FONT_AVENIR_BLACK,
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
    marginRight: wp('3%'),
    alignSelf: 'flex-end',
  },
});
