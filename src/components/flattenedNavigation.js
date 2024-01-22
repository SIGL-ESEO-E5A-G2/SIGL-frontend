import { isRouteAllowed } from "../utils/userRights";

export default function flatLinks(parent, current, user) {
    if (!Array.isArray(current)) return [];

    return current.reduce((flattened, item) => {
        if (!item || !item.name || item.disabled || !isRouteAllowed(item, user)) {
            return flattened;
        }

        const newItem = {
            ...item,
            path: (parent?.path || "") + "/" + (item.path || ""),
        };

        return flattened
            .concat([newItem])
            .concat(flatLinks(newItem, item.children, user));
    }, []);
}