
/**
 * Check if the object in paramater is a function
 *
 * @param {*} obj
 * @return {boolean}
 */
export function isFunc(obj) {
  const fn = () => { };
  return obj instanceof fn;
}
