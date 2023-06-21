import {  Navigate, Route, Routes } from 'react-router-dom';
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

        <Route path="/admin" element={<Admin />} >
          <Route element={<Navigate to='products' />}  path="/admin"/>
          <Route path="/admin/products" element={<h1>Página de products</h1>} />
          <Route
            path="/admin/categories"
            element={<h1>Página de categories</h1>}
          />
          <Route path="/admin/users" element={<h1>Página de users</h1>} />
        </Route>

        <Route element={<Auth />} path="/admin/auth">
          <Route element={<Navigate to='login' />} path='/admin/auth'/>
          
          <Route element={<h1>Página de login</h1>} path='/admin/auth/login'/>
          <Route element={<h1>Pagina de signup</h1>} path="/admin/auth/sigup"></Route>
          <Route element={<h1>Pagina de recover</h1>} path="/admin/auth/recover"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
