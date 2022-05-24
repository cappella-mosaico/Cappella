import {Evento} from '..';

export const EVENTOS: Evento[] = [
  {
    titulo: 'acampamento',
    dataInicial: new Date(2021, 12, 8, 20, 0),
    dataFim: new Date(2021, 12, 8),
    imagemURL: 'https://reactjs.org/logo-og.png',
    sobre:
      'A Igreja Presbiteriana Mosaico existe para acolher pessoas e formar discípulos de Cristo através de relacionamentos saudáveis e uma pregação bíblica contemporânea no bairro Setor Bueno, na cidade de Goiânia e no mundo',
    valor: 'R$ 15,00 adulto R$ 10,00 até 12 anos',
    local: 'Na Igreja Presbiteriana Mosaico',
    endereco: 'Rua T-53, 480, Setor Bueno Goiânia/Go - Cep 74810-210',
  },
];
