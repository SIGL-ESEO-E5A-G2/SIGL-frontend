import "../css/menu.css";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

import { UserContext } from "../context/UserContext";
import flatLinks from "./flattenedNavigation";

import logo from '../assets/images/logo.svg';
import router from "../data/router";
import { roles } from "../data/constantes";

export default function ({ deconnect }) {
    const user = useContext(UserContext);

    const userRole = roles
        .filter(role => user.roles?.includes(role.id))
        .map(role => role.name)
        .join(', ')

    const navigation = useMemo(() => {
        return flatLinks(null, router.children, user)
            .filter(row => row);
    }, [user]);

    return (
        <>
            <div className="menu">
                <div className="menu-container">
                    <Link to="/">
                        <div className="menu-block">
                            <img src={logo} alt="Home" />
                        </div>
                    </Link>

                    <div>
                        {
                            navigation.map(row => <Link
                                to={row.path}
                                className="menu-items menu-block"
                                key={row.path}
                            >
                                {row.name}
                            </Link>)
                        }
                    </div>
                </div>

                <div className="menu-logout">
                    <Button
                        className="menu-logout_btn"
                        type="button"
                        component={Link}
                        to="login"
                        radius="0"
                        onClick={deconnect}
                    >
                        Déconnexion
                    </Button>
                </div>
            </div>

            <div className="menu-user">
                <p className="menu-user_infos">
                    <b>{user.nom}</b> {user.prenom}
                </p>

                <p className="menu-user_infos">{userRole}</p>
            </div>
        </>
    );
}
