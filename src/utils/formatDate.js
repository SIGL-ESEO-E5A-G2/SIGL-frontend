import { locale } from '../data/constantes';

/**
 *
 * @param {Date} date
 * @return {string}
 */
export function dateString(date) {
  return date?.toLocaleDateString(locale);
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