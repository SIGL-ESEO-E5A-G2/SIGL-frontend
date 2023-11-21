import Menu from "./components/Menu";

import { UserContext } from "./context/UserContext";

import AppRouter from "./AppRouter";
import UnauthentifiedAppRouter from "./UnauthentifiedAppRouter";

import useUser from "./hooks/useUser";

function App() {
  const [user, loadUser, clearUser] = useUser();

  return <>
    {/* Header */}
    <>
      <link rel="icon" type="image/png" href="/images/favicon.svg"></link>
    </>

    {/* Application */}
    <UserContext.Provider value={user}>
      {
        user?.router ? <>
          <Menu deconnect={clearUser} />

          <div style={{ padding: "120px 0px 0px 30px" }}>
            <AppRouter user={user} />
          </div>
        </>
          : <UnauthentifiedAppRouter loadUser={loadUser} />
      }
    </UserContext.Provider>
  </>
}

export default App;
