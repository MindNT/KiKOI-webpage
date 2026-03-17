import './App.css';
import { Route, Switch, Router } from 'wouter';
import { useEffect, useState } from 'react';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Galeria from './pages/Galeria';
import Promociones from './pages/Eventos';
import Wallet from './pages/Wallet';
import Welcome from './components/pc/Welcome';
import { useCartStore } from './cartStore';

function App() {
  // Estado para controlar si se muestra la pantalla de bienvenida
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  // Usar el store para el estado de la tienda
  const setStoreOpen = useCartStore(state => state.setStoreOpen);
  const initializeFromSession = useCartStore(state => state.initializeFromSession);

  // Verificar sesión al cargar la app y periódicamente
  useEffect(() => {
    const checkSession = () => {
      const sessionExists = initializeFromSession();
      setHasActiveSession(sessionExists);
    };

    // Check inicial
    checkSession();

    // Check cada segundo para detectar cambios de sesión
    const sessionCheckInterval = setInterval(checkSession, 1000);

    return () => clearInterval(sessionCheckInterval);
  }, [initializeFromSession]);

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

  // Ocultar pantalla de bienvenida después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Si se debe mostrar la pantalla de bienvenida
  if (showWelcome) {
    return <Welcome />;
  }

  return (
    <>
      <Router base="/KiKOI-webpage">
        <Switch>
          <Route path="/" component={Inicio} />
          <Route path="/menu">
            {hasActiveSession ? <Menu /> : <Inicio />}
          </Route>
          <Route path="/galeria">
            {hasActiveSession ? <Galeria /> : <Inicio />}
          </Route>
          <Route path="/promociones">
            {hasActiveSession ? <Promociones /> : <Inicio />}
          </Route>
          <Route path="/wallet">
            {hasActiveSession ? <Wallet /> : <Inicio />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
