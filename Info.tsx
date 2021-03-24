import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {withTracker} from '@meteorrn/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handlePress} from './src/utils/handlePress';
import {LinksCollection} from './imports/api/links';

export const Info = () => {
  const links = withTracker(() => {
    return LinksCollection.find().fetch();
  });

  return (
    <View>
      <Text>Learn Meteor!</Text>
      <FlatList
        numColumns={1}
        data={links}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item.url)}>
            {item.title}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
