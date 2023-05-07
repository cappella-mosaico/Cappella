export const FALLBACK = [
  {
    id: '4cf3974d-8a02-41f2-9b07-29152b6664f3',
    ministerio: 'MOSAIKIDS',
    nome: 'Historinha',
    inicio: '2023-05-14T10:00:00',
    equipes: [
      {
        nome: '516dcd6af4f3c798e391550adc7de5ea',
        lider: 'José',
        equipe: ['José', 'Maria'],
      },
    ],
    ebd: true,
  },
  {
    id: 'fd875821-711e-4e25-9382-4a4ad5db3d57',
    ministerio: 'MUSICA',
    nome: 'Louvor Culto',
    inicio: '2023-05-21T09:00:00',
    equipes: [
      {
        nome: 'b638fdfd5a7c609793639ab3299bac4b',
        lider: 'Joãozin',
        equipe: ['Joãozin', 'Luizin', 'Zezin'],
      },
    ],
    ebd: false,
  },
  {
    id: 'a528efe7-9802-41d4-97c4-505448b2612b',
    ministerio: 'MIDIA',
    nome: 'Midia Culto',
    inicio: '2023-05-14T09:00:00',
    equipes: [
      {
        nome: 'ca102399bdd6012792d4d01fe8fec553',
        lider: 'José',
        equipe: ['José', 'João', 'Maria'],
      },
    ],
    ebd: true,
  },
  {
    id: '2ce0d8da-6604-4bcd-9f40-3d8457e26441',
    ministerio: 'MUSICA',
    nome: 'Louvor Culto',
    inicio: '2023-05-21T18:00:00',
    equipes: [
      {
        nome: '3761bf9125c5023ad56fe1d8fdf125ef',
        lider: 'Joyce',
        equipe: ['Felipe', 'Joyce', 'Marcos', 'Ruither'],
      },
    ],
    ebd: false,
  },
  {
    id: '2ce0d8da-6604-4bcd-9f40-3d8457e26441',
    ministerio: 'MOSAIKIDS',
    nome: 'Louvor Culto',
    inicio: '2023-05-14T18:00:00',
    equipes: [
      {
        nome: 'Berçario',
        lider: 'Joyce',
        equipe: ['Felipe', 'Joyce', 'Marcos', 'Ruither'],
      },
      {
        nome: 'Historinha',
        lider: 'Eu',
        equipe: ['Tu', 'Ele', 'Nós', 'Vós', 'Eles'],
      },
    ],
    ebd: false,
  },
];

export enum TIPOS {
  ESCALA = 'ESCALA',
  EVENTO = 'EVENTO',
  REUNIAO = 'REUNIAO',
}

export const MINISTERIO = {
  MUSICA: 'MÚSICA',
  MIDIA: 'MÍDIA',
  MOSAIKIDS: 'MOSAIKIDS',
  DIACONOS: 'DIÁCONOS',
  ACAMPAMENTO: 'ACAMPAMENTO',
};
