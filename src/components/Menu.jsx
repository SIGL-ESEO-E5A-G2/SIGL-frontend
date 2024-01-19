import "../css/menu.css";
import { Link } from "react-router-dom";
import { Button} from "@mantine/core";
import { useContext, useMemo, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import flatLinks from "./flattenedNavigation";
import router from "../data/router";
import UserHome from "./UserHome";

import { request } from '../utils/request.js';

import logo from '../assets/images/logo.svg'; 

export default function ({ deconnect }) {
    const user = useContext(UserContext);
    const [userRole, setUserRole] = useState('');
    console.log(user);
    const navigation = useMemo(() => {
        return flatLinks(null, router.children, user);
    }, [user]);

    useEffect(() => {
        request(`/utilisateurDetail/${user.id}/`)
            .then((res) => {
                setUserRole(res.data.roles[0].libelle);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
            });
    }, [user.id]);

    return (
        <>
            <div className="menu">
                <div className="menu-container">
                    <Link to="/">
                        <div className="menu-block">
                            <img src={logo} alt="Home" />
                        </div>
                    </Link>
                    <div className="menu-items"> 
                        <UserHome>
                            {navigation}
                        </UserHome>
                    </div>
                </div>
                <div className="menu-logout">
                    <Button className="menu-logout_btn" type="button" component={Link} to="login" onClick={deconnect}>
                        Déconnexion 
                    </Button>
                </div>
            </div>

            <div className="menu-user">
                <p className="menu-user_infos">
                    <b>{user.nom}</b> {user.prenom  }
                </p>
                <p className="menu-user_infos">{userRole}</p>
            </div>
        </>
    );
}
