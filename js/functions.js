/**
 * Проверяет, укладывается ли встреча в рамки рабочего дня
 * @param {string} workStart - начало рабочего дня ('8:00')
 * @param {string} workEnd - конец рабочего дня ('17:30')
 * @param {string} meetingStart - начало встречи ('14:00')
 * @param {number} duration - длительность встречи в минутах
 * @returns {boolean} true — если встреча в пределах рабочего дня, иначе false
 */
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, duration) {
  // Функция для перевода "часы:минуты" → минуты от начала дня
  const toMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  // Проверяем, что встреча начинается и заканчивается в рабочее время
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

isMeetingWithinWorkHours();
