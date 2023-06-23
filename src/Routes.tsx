import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductsDetails';
import Admin from './pages/Admin';
import Auth from './pages/Admin/Auth';
import Login from './pages/Admin/Auth/Login';
import Users from './pages/Admin/Users';
import { PrivateRoute } from './components/PrivateRoute';
import Products from './pages/Admin/Products';
import List from './pages/Admin/Products/List';
import Form from './pages/Admin/Products/Form';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Catalog />} path="/products" />
        <Route element={<ProductDetails />} path="/products/:productId" />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route element={<Navigate to="products" />} path="/admin" />
          <Route path="/admin/products" element={<Products />}>
            <Route element={ <List />} path='/admin/products' />
            <Route path='/admin/products' element={<List />}></Route>
            <Route path='/admin/products/:productId' element={<Form />}></Route>
          </Route>
          <Route
            path="/admin/categories"
            element={
              <PrivateRoute>
                <h1>Página de categories</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <Users />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<Auth />} path="/admin/auth">
          <Route element={<Navigate to="login" />} path="/admin/auth" />
          <Route element={<Login />} path="/admin/auth/login" />
          <Route
            element={<h1>Pagina de signup</h1>}
            path="/admin/auth/sigup"
          ></Route>
          <Route
            element={<h1>Pagina de recover</h1>}
            path="/admin/auth/recover"
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
