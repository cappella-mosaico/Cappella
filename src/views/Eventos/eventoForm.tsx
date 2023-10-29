import React, {useState} from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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
import {BACKEND_URL, getSize} from '../../utils/utils';
import {IRON} from '../../styles/styles';
import {ScrollView} from 'react-native-gesture-handler';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EventoForm'>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EventoForm'
>;

type Dependente = {
  nome: string;
  idade: string;
};

type Participante = {
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  idade: string;
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
    setFocus,
  } = useForm({
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      cpf: '',
      idade: '',
      dependentes: [],
    },
  });

  const onSubmit: SubmitHandler<Participante> = async (data: Participante) => {
    const participante: Participante = data;

    try {
      const response = await fetch(`${BACKEND_URL}/eventos/participante`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventoId: evento.id,
          ...participante,
          dependentes,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (response.ok && response.status === 200) {
        Alert.alert('Sucesso', 'Você foi cadastrado com sucesso.', [
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
    setDependentes([...dependentes, {nome: '', idade: ''}]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...dependentes];
    list.splice(index, 1);
    setDependentes(list);
  };

  return (
    <ContainerPage titulo={'EVENTOS'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    onSubmitEditing={() => setFocus('telefone')}
                    blurOnSubmit={false}
                  />
                )}
                name="nome"
              />
              {errors.nome && <Text>O campo Nome é obrigatório.</Text>}
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
                    onSubmitEditing={() => setFocus('email')}
                    blurOnSubmit={false}
                  />
                )}
                name="telefone"
              />
              {errors.telefone && <Text>O campo Telefone é obrigatório.</Text>}
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
                    onSubmitEditing={() => setFocus('cpf')}
                    blurOnSubmit={false}
                  />
                )}
                name="email"
              />
              {errors.email && <Text>Email Inválido.</Text>}
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
                    onSubmitEditing={() => setFocus('idade')}
                    blurOnSubmit={false}
                  />
                )}
                name="cpf"
              />
              {errors.cpf && <Text>CPF Inválido.</Text>}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInputMask
                    type={'only-numbers'}
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Idade"
                    placeholderTextColor={IRON}
                    onSubmitEditing={() => setFocus('dependentes')}
                    blurOnSubmit={false}
                  />
                )}
                name="idade"
              />
              {errors.idade && <Text>O campo Idade é obrigatório.</Text>}
              <View style={styles.numberDependentesFlag}>
                <Button title="Adicionar Dependente" onPress={() => handleAddClick()} />
              </View>

              {dependentes?.length > 0 &&
                <View>
                {dependentes?.length > 0 && <Text>{dependentes?.length} dependente{dependentes?.length < 2 ? '' : 's'}</Text>}
                {dependentes.map((dependente, index) => (
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
                    <TextInputMask
                      type={'only-numbers'}
                      style={styles.inputIdade}
                      onChangeText={(e) => {
                        dependente.idade = e;
                        setDependentes([...dependentes]);
                      }}
                      value={dependente.idade}
                      placeholder="Idade"
                      placeholderTextColor={IRON}
                    />
                    <Button
                      title="🗑"
                      color="whitesmoke"
                      onPress={() => handleRemoveClick(index)}
                    />
                  </View>
                ))}
               </View>
}

              <Button title={dependentes?.length ? 'Inscrever Família' : 'Inscrever'}
                      onPress={handleSubmit(onSubmit)} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ContainerPage>
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
      margin: wp('1%'),
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
      marginRight: wp('10%'),
    },
    dependente: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textDependente: {
      margin: wp('3%')
    },

    inputDependente: {
      flex: 2,
      backgroundColor: 'white',
      fontSize: wp('3.5%'),
      height: hp('5.75%'),
      padding: wp('3%'),
      borderRadius: 4,
      margin: wp('3%'),
      marginLeft: 0,
    },

    inputIdade: {
      flex: 1,
      backgroundColor: 'white',
      fontSize: wp('3.5%'),
      height: hp('5.75%'),
      padding: wp('3%'),
      borderRadius: 4,
      margin: wp('3%'),
      marginLeft: 0,
    },

    numberDependentesFlag: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5
    }
  });
};
