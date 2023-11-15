import { useState } from "react";

import { request } from '../utils/request';

/**
 * 
 * @returns {[{}, (id)]}
 */
export default function () {
    const [user, setUser] = useState();

    async function loadUser(id) {
        return request('/users/' + id, 'get')
            .then(({ data }) => setUser(data));
    }

    return [user, loadUser];
}