import { locale } from "../data/constantes";

/**
 * 
 * @param {Date} date 
 * @returns {string}
 */
export function dateString(date) {
    return date?.toLocaleDateString(locale);
}