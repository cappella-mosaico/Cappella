import React from 'react';
import {Alert, Button, SafeAreaView, Text, TextInput, View} from 'react-native';

import {RouteProp} from '@react-navigation/core';
import {RootStackParamList, ProfileScreenNavigationProp} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';
import {Controller, useForm} from 'react-hook-form';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoForm'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoForm = ({route}: Props) => {
  const {evento} = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data) => Alert.alert(JSON.stringify(data));

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                // style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                // style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ContainerPage>
    </SafeAreaView>
  );
};
