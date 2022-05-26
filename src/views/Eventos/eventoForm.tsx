import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';
import {Controller, useForm} from 'react-hook-form';
import {EventoDescPadrao} from './eventoDescPadrao';
import {TextInputMask} from 'react-native-masked-text';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CheckBox from '@react-native-community/checkbox';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoForm'>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventoForm'
>;

type Dependente = {
  nome: string;
};

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoForm = ({route}: Props) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {evento} = route.params;
  const [dependentes, setDependentes] = useState<Dependente[]>([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      cpf: '',
      dependentes: '',
    },
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify({...data, dependentes}));
    Alert.alert('Sucesso', 'Você foi cadastrado com sucesso!', [
      {text: 'OK', onPress: () => navigation.popToTop()},
    ]);
  };

  const handleAddClick = () => {
    setDependentes([...dependentes, {nome: ''}]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...dependentes];
    list.splice(index, 1);
    setDependentes(list);
  };

  return (
    <SafeAreaView>
      <ContainerPage titulo={'EVENTOS'}>
        <EventoDescPadrao evento={evento} />
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nome"
              />
            )}
            name="nome"
          />
          {errors.nome && <Text>Este campo é obrigatório.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputMask
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Telefone"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                type={'cel-phone'}
              />
            )}
            name="telefone"
          />
          {errors.telefone && <Text>Este campo é obrigatório.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && <Text>Este campo é obrigatório.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputMask
                type={'cpf'}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="CPF"
              />
            )}
            name="cpf"
          />
          {errors.cpf && <Text>Este campo é obrigatório.</Text>}
          <View style={styles.toggleDependentes}>
            <CheckBox
              disabled={false}
              value={Boolean(dependentes.length)}
              onValueChange={(newValue) => {
                newValue ? handleAddClick() : setDependentes([]);
              }}
            />
            <Text style={styles.textDependente}>Tem Dependente?</Text>
          </View>

          {dependentes?.length > 0 &&
            dependentes.map((dependente, index) => (
              <View style={styles.dependente}>
                <TextInput
                  style={styles.inputDependente}
                  onChangeText={(e) => {
                    dependente.nome = e;
                    setDependentes([...dependentes]);
                  }}
                  value={dependente.nome}
                  placeholder="Nome"
                />
                <Button title="+" onPress={() => handleAddClick()} />
                <Button title="-" onPress={() => handleRemoveClick(index)} />
              </View>
            ))}

          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
        </View>
      </ContainerPage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
  },
  button: {
    marginTop: 40,
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
    margin: 10,
    marginLeft: 0,
  },
  toggleDependentes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dependente: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDependente: {
    margin: 10,
  },
  inputDependente: {
    backgroundColor: 'white',
    height: 40,
    width: 300,
    padding: 10,
    borderRadius: 4,
    margin: 10,
    marginLeft: 0,
  },
});
