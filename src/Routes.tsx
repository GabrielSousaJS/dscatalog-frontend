import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductsDetails';
import Admin from './pages/Admin';

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
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
