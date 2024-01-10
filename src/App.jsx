import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import Menu from "./components/Menu";

import { UserContext } from "./context/UserContext";

import AppRouter from "./AppRouter";
import UnauthentifiedAppRouter from "./UnauthentifiedAppRouter";

import useUser from "./hooks/useUser";

function App() {
  const [user, loadUser, clearUser] = useUser();

  function deconnect() {
    clearUser();
    window.location.reload();
  }

  return <MantineProvider>
    <UserContext.Provider value={user}>
      <BrowserRouter>
        {
          user?.id ? <>
            <Menu deconnect={deconnect} />

            <div style={{ padding: "120px 0px 0px 30px" }}>
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
