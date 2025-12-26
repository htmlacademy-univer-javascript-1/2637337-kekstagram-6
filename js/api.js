const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  const response = await fetch(`${API_URL}/data`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }

  return await response.json();
};

const sendData = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.status}`);
  }

  return await response.json();
};

export { getData, sendData };
