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

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${padTo2Digits(
    date.getMonth() + 1,
  )}-${padTo2Digits(date.getDate())}`;
};

export const domingoCheck = (inicio: string) => {
  const nextSunday = formatDate(getNextSunday(new Date()));
  const nextEscala = formatDate(new Date(inicio));

  if (nextEscala === nextSunday) {
    return true;
  } else {
    return false;
  }
};
