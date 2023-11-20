import "../css/menu.css";

import Dropdown from "react-bootstrap/Dropdown";
import { HouseDoorFill, Person } from "react-bootstrap-icons";

import { applicationTitle } from "../data/constantes";

export default function ({ deconnect }) {
    return <div className="menu-container">
        <div className="menu-title">
            <HouseDoorFill size="40px" />
            <h1>{applicationTitle}</h1>
        </div>

        <div className="menu-user">
            <Dropdown>
                <Dropdown.Toggle variant="transparent">
                    <Person size="48px" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/login" onClick={deconnect}>
                        Déconnexion
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
}