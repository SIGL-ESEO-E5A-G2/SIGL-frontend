
/**
 * Check if a route is allowed
 * 
 * @param {*} route 
 * @param {*} user 
 * @returns {boolean}
 */
export function isRouteAllowed(route, user) {
    return !!route && !route.disabled && (!route?.roles?.length || userHasRole(user, route.roles));
}

/**
 * Check if user has one of the roles allowed
 * 
 * @param {{roles: [number]}} user 
 * @param {[number]} roles 
 * @returns {boolean} true if user has one of the role or if roles is empty
 */
export function userHasRole(user = { roles: [] }, roles = []) {
    return roles.length <= 0 || user.roles.some(role => roles.includes(role));
}
