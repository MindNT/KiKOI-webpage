import './App.css';
import { Route, Switch, Router } from 'wouter';
import { useEffect, useState } from 'react';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Galeria from './pages/Galeria';
import Promociones from './pages/Eventos';
import Announcement from './components/pc/Announcement';

function App() {
  // Estado para el status de la tienda
  const [storeOpen, setStoreOpen] = useState(true);

  // Función para obtener el status de la tienda
  const fetchStoreStatus = () => {
    fetch('https://kikoi-management.mindnt.com.mx/settings/store-status')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStoreOpen(data.store_open);
        }
      })
      .catch(err => console.error('Error al obtener status de la tienda:', err));
  };

  // Polling cada 3 segundos para el status de la tienda
  useEffect(() => {
    // Carga inicial
    fetchStoreStatus();

    // Polling cada 3 segundos
    const intervalId = setInterval(() => {
      fetchStoreStatus();
    }, 3000);

    // Limpiar el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Mostrar anuncio si la tienda está cerrada */}
      {!storeOpen && <Announcement />}

      <Router base="/KiKOI-webpage">
        <Switch>
          <Route path="/" component={Inicio} />
          <Route path="/menu" component={Menu} />
          <Route path="/galeria" component={Galeria} />
          <Route path="/promociones" component={Promociones} />
        </Switch>
        {/* Las clases Tailwind para navbar-fixed y footer-fixed ya están aplicadas en los componentes Navbar y Footer */}
      </Router>
    </>
  );
}

export default App;
