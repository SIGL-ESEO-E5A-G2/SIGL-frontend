
/**
 * Check if the object in paramater is a function
 * 
 * @param {*} obj 
 * @returns {boolean}
 */
function isFunc(obj) {
    const fn = () => { };
    return obj instanceof fn;
}