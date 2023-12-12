import { useContext, useMemo } from "react";

import UserHome from "./UserHome"
import { UserContext } from "../../context/UserContext";
import router from "../../data/router";
import flatLinks from "./flattenedNavigation";

export default function Home({ }) {
    const user = useContext(UserContext);
    const navigation = useMemo(() => {
        return flatLinks(null, router.children, user);
    }, [user]);

    return <>
        <UserHome>
            {navigation}
        </UserHome>
    </>
}