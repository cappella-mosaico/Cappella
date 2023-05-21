import {Equipe, Escala} from '../views/Escala';

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

  const nextMonday = new Date(
    dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay()) % 7 || 7)),
  );

  return nextMonday;
};

export const domingoCheck = (nextEscala: string) => {
  const nextSunday = formatDate(getNextSunday(new Date()));

  if (nextEscala === nextSunday) {
    return true;
  } else {
    return false;
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

export function formatDatePT(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  const capitalizedMonth = formattedDate.replace(/(\b\w)/gi, (match) =>
    match.toUpperCase(),
  );
  return capitalizedMonth;
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
  values: Escala[];
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

  return Object.entries(grouped).map(([periodo, values]) => ({
    periodo,
    values,
  }));
};
