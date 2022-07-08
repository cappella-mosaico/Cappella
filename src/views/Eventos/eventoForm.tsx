import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../../../App';
import {ContainerPage} from '../../components/ContainerPage';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {EventoDescPadrao} from './eventoDescPadrao';
import {TextInputMask} from 'react-native-masked-text';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CheckBox from 'expo-checkbox';
import {isValidCPF, isValidEmail} from './formValidators';
import {ScrollView} from 'react-native-gesture-handler';
import {getSize} from '../../utils/utils';
import {IRON} from '../../styles/styles';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoForm'>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventoForm'
>;

type Dependente = {
  nome: string;
};

type Participante = {
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  dependentes: Dependente[];
};

interface Props {
  route: ProfileScreenRouteProp;
}

export const EventoForm = ({route}: Props) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {evento} = route.params;
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const {height} = useWindowDimensions();
  const styles = getStyles(getSize(height));

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
      dependentes: [],
    },
  });

  const onSubmit: SubmitHandler<Participante> = async (data: Participante) => {
    const participante: Participante = data;

    try {
      const response = await fetch(
        'http://admin.ipmosaico.com:8888/eventos/participante',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventoId: evento.id,
            ...participante,
            dependentes,
          }),
        },
      );

      const json = await response.json();
      console.log(json);

      if (response.ok && response.status === 200) {
        Alert.alert('Sucesso', 'Você foi cadastrado com sucesso!', [
          {text: 'OK', onPress: () => navigation.popToTop()},
        ]);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro no seu cadastro.');
      }
    } catch (error) {
      console.error(error);
    }
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
        <ScrollView style={styles.containerScrollView}>
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
                  placeholderTextColor={IRON}
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
                  placeholderTextColor={IRON}
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
                validate: (email) => isValidEmail(email),
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  placeholderTextColor={IRON}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && <Text>Email Inválido!</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (cpf) => isValidCPF(cpf),
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputMask
                  type={'cpf'}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="CPF"
                  placeholderTextColor={IRON}
                />
              )}
              name="cpf"
            />
            {errors.cpf && <Text>CPF Inválido!</Text>}
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
                <View style={styles.dependente} key={index}>
                  <TextInput
                    style={styles.inputDependente}
                    onChangeText={(e) => {
                      dependente.nome = e;
                      setDependentes([...dependentes]);
                    }}
                    value={dependente.nome}
                    placeholder="Nome"
                    placeholderTextColor={IRON}
                  />
                  <Button title="+" onPress={() => handleAddClick()} />
                  <Button title="-" onPress={() => handleRemoveClick(index)} />
                </View>
              ))}

            <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </ContainerPage>
    </SafeAreaView>
  );
};

const getHeight = (size: string) => {
  switch (size) {
    case 'small':
    case 'medium':
      return hp('69%');
    case 'large':
    case 'xlarge':
    case 'xxlarge':
    case 'xxxlarge':
      return hp('80%');
    default:
      break;
  }
};

const getStyles = (size: string) => {
  return StyleSheet.create({
    container: {
      margin: wp('6%'),
    },
    containerScrollView: {
      height: getHeight(size),
    },
    input: {
      backgroundColor: 'white',
      height: hp('5.75%'),
      fontSize: wp('3.5%'),
      padding: wp('3%'),
      borderRadius: 4,
      margin: wp('2%'),
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
      margin: wp('3%'),
    },
    inputDependente: {
      backgroundColor: 'white',
      fontSize: wp('3.5%'),
      height: hp('5.75%'),
      width: wp('70%'),
      padding: wp('3%'),
      borderRadius: 4,
      margin: wp('3%'),
      marginLeft: 0,
    },
  });
};
