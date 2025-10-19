// Функция проверки длины строки
function isStringWithinLength(string, maxLength) {
  return string.length <= maxLength;
}




// Функция проверки палиндрома
function isPalindrome(string) {
  // Убираем пробелы и приводим к нижнему регистру
  const normalized = string.replaceAll(' ', '').toLowerCase();
  // Разворачиваем строку
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}




//  Дополнительное задание — извлечение чисел из строки
function extractNumber(value) {
  // Приводим аргумент к строке (чтобы обработать числа)
  const str = value.toString();
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const parsed = parseInt(char, 10);
    // Проверяем, является ли символ цифрой
    if (!Number.isNaN(parsed)) {
      result += parsed;
    }
  }

  // Если не нашли цифр — возвращаем NaN
  return result ? parseInt(result, 10) : NaN;
}

