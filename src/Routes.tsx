import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductsDetails';
import Admin from './pages/Admin';
import Auth from './pages/Admin/Auth';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Catalog />} path="/products" />
        <Route element={<ProductDetails />} path="/products/:productId" />
        <Route element={<Admin />} path="/admin">
          <Route element={<h1>Página de produtos</h1>} path="/admin/products" />
          <Route
            element={<h1>Página de categorias</h1>}
            path="/admin/categories"
          />
          <Route element={<h1>Página de usuários</h1>} path="/admin/users" />
        </Route>
        <Route element={<Auth />} path="/admin/auth">
          <Route element={<h1>Pagina de signup</h1>} path="/admin/auth/sigup"></Route>
          <Route element={<h1>Pagina de recover</h1>} path="/admin/auth/recover"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
