const URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorTexts = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const loads = (route, errorText, method = Methods.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loads(Routes.GET_DATA, ErrorTexts.GET_DATA);

const sendData = (body) => loads(Routes.SEND_DATA, ErrorTexts.SEND_DATA, Methods.POST, body);

export { getData, sendData };
