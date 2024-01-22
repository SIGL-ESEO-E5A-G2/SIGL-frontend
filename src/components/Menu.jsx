import "../css/menu.css";
import { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Flex, Group } from "@mantine/core";

import { UserContext } from "../context/UserContext";
import flatLinks from "./flattenedNavigation";

import logo from '../assets/images/logo.svg';
import router from "../data/router";
import { roles } from "../data/constantes";
import { Person } from "react-bootstrap-icons";

export default function ({ deconnect }) {
    const user = useContext(UserContext);

    const userRole = roles
        .filter(role => user.roles?.includes(role.id))
        .map(role => role.name)
        .join(', ');

    const location = useLocation();
    const currentLinkSelected = useMemo(() => {
        const pathname = location.pathname.split('/');
        return pathname[pathname.length - 1];
    }, [location]);

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
                            navigation.map(row => {
                                let id = row.path.split('/');
                                id = id[id.length - 1];

                                return <Link
                                    to={row.path}
                                    className={"menu-items menu-block" + (id === currentLinkSelected ? " menu-items-selected" : "")}
                                    key={row.path}
                                >
                                    {row.name}
                                </Link>
                            })
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

            <Link to="reset-password">
                <div className="menu-user">
                    <Group p="md">
                        <Person size="4rem" />

                        <div>
                            <p className="menu-user_infos">
                                <b>{user.nom}</b> {user.prenom}
                            </p>

                            <p className="menu-user_infos">{userRole}</p>
                        </div>
                    </Group>
                </div>
            </Link>
        </>
    );
}
