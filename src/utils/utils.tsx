import {Escala} from '../views/Escala';

export const getSize = (height: number) => {
  let size = 'xsmall';

  if (height < 534) {
    size = 'small';
  } else if (height > 534 && height < 597) {
    size = 'medium';
  } else if (height > 597 && height < 697) {
    size = 'large';
  } else if (height > 697 && height < 797) {
    size = 'xlarge';
  } else if (height > 797 && height < 897) {
    size = 'xxlarge';
  } else if (height > 897) {
    size = 'xxxlarge';
  }

  return size;
};

export const isSmall = (size: string) => {
  switch (size) {
    case 'small':
    case 'medium':
    case 'large':
      return true;
    case 'xlarge':
    case 'xxlarge':
    case 'xxxlarge':
      return false;
    default:
      break;
  }
};

export const validURL = (str: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

export const BACKEND_URL = 'https://admin.ipmosaico.com:9090';

const getNextSunday = (date = new Date()) => {
  const dateCopy = new Date(date.getTime());

  const nextSunday = new Date(
    dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay()) % 7 || 7)),
  );

  return nextSunday;
};

export const domingoCheck = (nextEscala: string) => {
  const today = new Date();

  if (
    new Date(nextEscala).toDateString() === new Date().toDateString() &&
    today.getDay() === 0
  ) {
    return false;
  }

  const nextSunday = formatDate(getNextSunday(today));

  if (nextEscala === nextSunday) {
    return 'nextSunday';
  } else {
    return nextEscala > nextSunday ? 'sundayAfter' : 'pastSunday';
  }
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${padTo2Digits(
    date.getMonth() + 1,
  )}-${padTo2Digits(date.getDate())}`;
};

export function formatDatePT(dateString: string) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const [year, month, day] = dateString.split('-');
  const formattedDate = `${parseInt(day, 10)} de ${
    months[parseInt(month, 10) - 1]
  } de ${year}`;

  return formattedDate;
}

export const createSetFromArray = (
  dataArray: Escala[],
): Map<string, Escala[]> => {
  const resultSet = new Map();

  // Iterate over the array
  for (const item of dataArray) {
    const inicio = item.inicio.split('T')[0]; // Extract only the date part

    // Check if the 'inicio' key already exists in the set
    if (resultSet.has(inicio)) {
      // Append the item to the existing array value
      const existingValue = resultSet.get(inicio);
      resultSet.set(inicio, [...existingValue, item]);
    } else {
      // Create a new array value with the item
      resultSet.set(inicio, [item]);
    }
  }

  return resultSet;
};

export const groupByLocal = (
  escalas: Escala[],
): {local: string; values: Escala[]}[] => {
  const grouped: {[local: string]: Escala[]} = {};
  escalas.forEach((item) => {
    const {local, ...rest} = item;
    if (!grouped[local]) {
      grouped[local] = [];
    }
    grouped[local].push(rest as Escala);
  });
  return Object.entries(grouped).map(([local, values]) => ({local, values}));
};

export const joinPeriodoValues = (
  escalas: Escala[],
): {
  periodo: string;
  groupedEscalas: Escala[];
}[] => {
  const grouped: {
    [key: string]: Escala[];
  } = {};

  escalas.forEach((item) => {
    const {periodo, ...rest} = item;

    if (!grouped[periodo]) {
      grouped[periodo] = [];
    }

    grouped[periodo].push(rest as Escala);
  });

  return Object.entries(grouped).map(([periodo, groupedEscalas]) => ({
    periodo,
    groupedEscalas,
  }));
};

export function compareDate(dateInicio: Date, dateFim: Date) {
  // Extract the day, month, and year from the input date
  const inputDay = dateInicio.getDate();
  const inputMonth = dateInicio.getMonth();
  const inputYear = dateInicio.getFullYear();

  // Extract the day, month, and year from the current date
  const currentDay = dateFim.getDate();
  const currentMonth = dateFim.getMonth();
  const currentYear = dateFim.getFullYear();

  // Compare the day, month, and year
  if (
    inputYear > currentYear ||
    (inputYear === currentYear && inputMonth > currentMonth) ||
    (inputYear === currentYear &&
      inputMonth === currentMonth &&
      inputDay >= currentDay)
  ) {
    // The input date is in the present or future
    return true;
  } else {
    // The input date is in the past
    return false;
  }
}

export function checkInicioFimDifferent(escalas: Escala[]) {
  for (let i = 0; i < escalas.length; i++) {
    const obj = escalas[i];

    return !compareDate(new Date(obj.inicio), new Date(obj.fim));
  }
}
