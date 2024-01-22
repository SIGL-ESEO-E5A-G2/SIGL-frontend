import { locale } from '../data/constantes';

/**
 *
 * @param {Date} date
 * @return {string}
 */
export function dateString(date) {
  return date?.toLocaleDateString(locale);
}

export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
  const day = currentDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}


/**
 * Renvoie une date simplifiée (au format EN)
 * @param {Date} date 
 * @return date au format "YYYY-MM-DD"
 */
export function getSimpleDate(date) {
  const dateISO = date.toISOString()?.split('T');
  return dateISO ? dateISO[0] : null;
}

/**
 * 
 * @param {Date} date 
 * @returns 
 */
export function getMonthName(date) {
  if (!date) return "";
  return date.toLocaleDateString(locale, { month: "long" });
}

export function getDayName(date) {
  if (!date) return "";
  return date.toLocaleDateString("fr-FR", { weekday: "long" });
}