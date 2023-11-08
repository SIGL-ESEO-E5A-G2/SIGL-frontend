import {Outlet} from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <>
    <NavBar />
    <Outlet />
  </>;
}

export default App;
