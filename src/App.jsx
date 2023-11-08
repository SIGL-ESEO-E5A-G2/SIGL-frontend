import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from "react-router-dom";

import Menu from "./components/Menu";
import UserConnected from "./components/UserConnected";

function App() {
  return <>
    <UserConnected>
      <Menu />
    </UserConnected>

    <div style={{ padding: "120px 0px 0px 30px" }}>
      <Outlet />
    </div>
  </>
}

export default App;
