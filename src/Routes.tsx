import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';

const RoutesApp = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Catalog} path="/products" />
        <Route Component={Admin} path="/admin" />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
