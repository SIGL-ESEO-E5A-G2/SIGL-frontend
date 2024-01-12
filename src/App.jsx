// import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'react-quill/dist/quill.snow.css';
import './css/main.css';

import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

import Menu from "./components/Menu";

import { UserContext } from "./context/UserContext";

import AppRouter from "./AppRouter";
import UnauthentifiedAppRouter from "./UnauthentifiedAppRouter";

import useUser from "./hooks/useUser";
import theme from './data/theme';

const themeMantine = createTheme(theme);

function App() {
  const [user, loadUser, clearUser] = useUser();

  function deconnect() {
    clearUser();
    window.location.reload();
  }

  return <MantineProvider theme={themeMantine}>
    <Notifications />

    <UserContext.Provider value={user}>
      <BrowserRouter>
        {
          user?.id ? <>
            <Menu deconnect={deconnect} />

            <div className="app" style={{ padding: "120px 30px 0px 30px" }}>
              <AppRouter user={user} />
            </div>
          </>
            : <UnauthentifiedAppRouter loadUser={loadUser} />
        }
      </BrowserRouter>
    </UserContext.Provider>
  </MantineProvider>
}

export default App;
