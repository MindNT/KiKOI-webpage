import './App.css';
import { Route, Switch, Router } from 'wouter';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Galeria from './pages/Galeria';
import Promociones from './pages/Eventos';

function App() {
  return (
    <Router base="/KiKOI-webpage">
      <Switch>
        <Route path="/" component={Inicio} />
        <Route path="/menu" component={Menu} />
        <Route path="/galeria" component={Galeria} />
        <Route path="/promociones" component={Promociones} />
      </Switch>
      {/* Las clases Tailwind para navbar-fixed y footer-fixed ya están aplicadas en los componentes Navbar y Footer */}
    </Router>
  );
}

export default App;
