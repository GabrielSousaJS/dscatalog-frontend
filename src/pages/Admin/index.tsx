import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
      <Outlet />  
      </div>
      
    </div>
  );
};
export default Admin;
