import "../css/menu.css";

import { Link } from "react-router-dom";
import { Button, Menu } from "@mantine/core";
import { HouseDoorFill, Person } from "react-bootstrap-icons";

import { applicationTitle } from "../data/constantes";

import eseoLetter from '../assets/images/4-ESEO-E-RVB.png';

export default function ({ deconnect }) {
    return <div className="menu-container">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="menu-title">
                {/* <HouseDoorFill size="40px" /> */}
                <img className="menu-image" src={eseoLetter} alt="Home" style={{ width: "40px" }} />
                <h1>{applicationTitle}</h1>
            </div>
        </Link>

        <div className="menu-user">
            <Menu>
                <Menu.Target>
                    <Button color="white" h="max-content" variant="outline">
                        <Person size="48px" />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item component={Link} to="profil">
                        Modifier mot de passe
                    </Menu.Item>
                    <Menu.Item component={Link} to="login" onClick={deconnect}>
                        Déconnexion
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    </div>
}