import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {MosaicoOnlineItem} from './mosaicoOnlineItem';
import {
  faFacebook,
  faInstagram,
  faSpotify,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {FALLBACK} from './data/Comunidade';

interface Comunidade {
  facebook: string;
  instagram: string;
  whatsapp: string;
  youtube: string;
  spotify: string;
  site: string;
}

export const MosaicoOnline = () => {
  const styles = getStyles();

  const getMappedRedes = (collection: Comunidade) => {
    const redes = Object.keys(collection);

    return redes.map((item) => {
      switch (item) {
        case 'facebook':
          return {
            url: collection[item],
            icon: faFacebook,
          };
        case 'instagram':
          return {
            url: collection[item],
            icon: faInstagram,
          };
        case 'whatsapp':
          return {
            url: collection[item],
            icon: faWhatsapp,
          };
        case 'youtube':
          return {
            url: collection[item],
            icon: faYoutube,
          };
        case 'spotify':
          return {
            url: collection[item],
            icon: faSpotify,
          };
        case 'site':
          return {
            url: collection[item],
            icon: require('../../assets/images/mosaicoLogo.png'),
          };
        default:
          break;
      }
    });
  };

  const comunidadeList = (collection: Comunidade) => {
    const mappedRedes = getMappedRedes(collection);

    return (
      <FlatList
        style={styles.flatList}
        numColumns={Math.ceil(mappedRedes.length / 2)}
        data={mappedRedes}
        renderItem={({item}) =>
          item ? <MosaicoOnlineItem url={item.url} icon={item.icon} /> : <></>
        }
        keyExtractor={(item) => (item && item.url ? item.url : 'item')}
      />
    );
  };

  return <>{comunidadeList(FALLBACK)}</>;
};

const getStyles = () => {
  return StyleSheet.create({
    flatList: {
      alignContent: 'center',
      alignSelf: 'center',
    },
  });
};
