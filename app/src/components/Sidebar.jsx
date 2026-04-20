import { Stethoscope, User, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="text-center mb-4 d-flex align-items-center justify-content-center">
        <LayoutDashboard className="me-2" /> Painel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to={'/medicos'} className={`nav-link w-100 text-start d-flex align-items-center ${(pathname === '/medicos') || (pathname === '/') ? 'active' : 'text-white'}`}>
            <Stethoscope className="me-2" size={18} /> Médicos
          </Link>
        </li>
        <li>
          <Link to={'/pacientes'} className={`nav-link w-100 text-start d-flex align-items-center ${pathname === '/pacientes' ? 'active' : 'text-white'}`}>
            <User className="me-2" size={18} /> Pacientes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;