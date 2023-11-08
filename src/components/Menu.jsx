import "../css/menu.css";

import Dropdown from "react-bootstrap/Dropdown";
import { HouseDoorFill, Person } from "react-bootstrap-icons";

export default function ({ }) {
    return <div className="menu-container">
        <div className="menu-title">
            <HouseDoorFill size="40px" />
            <h1>Journal de Formation</h1>
        </div>

        <div className="menu-user">
            <Dropdown>
                <Dropdown.Toggle variant="transparent">
                    <Person size="48px" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/">Déconnexion</Dropdown.Item>
                    <Dropdown.Item href="/">Paramètres</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
}