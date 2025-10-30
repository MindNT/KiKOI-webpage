import './App.css';
import { Route, Switch } from 'wouter';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Galeria from './pages/Galeria';
import Eventos from './pages/Eventos';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Inicio} />
        <Route path="/menu" component={Menu} />
        <Route path="/galeria" component={Galeria} />
        <Route path="/eventos" component={Eventos} />
      </Switch>
      {/* Las clases Tailwind para navbar-fixed y footer-fixed ya están aplicadas en los componentes Navbar y Footer */}
    </>
  );
}

export default App;
