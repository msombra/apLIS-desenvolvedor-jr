import React from 'react';
import { Stethoscope, User, LayoutDashboard } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
    <h4 className="text-center mb-4 d-flex align-items-center justify-content-center">
      <LayoutDashboard className="me-2" /> Painel
    </h4>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item mb-2">
        <button 
          onClick={() => setActiveTab('medicos')}
          className={`nav-link w-100 text-start d-flex align-items-center ${activeTab === 'medicos' ? 'active' : 'text-white'}`}
        >
          <Stethoscope className="me-2" size={18} /> Médicos
        </button>
      </li>
      <li>
        <button 
          onClick={() => setActiveTab('pacientes')}
          className={`nav-link w-100 text-start d-flex align-items-center ${activeTab === 'pacientes' ? 'active' : 'text-white'}`}
        >
          <User className="me-2" size={18} /> Pacientes
        </button>
      </li>
    </ul>
  </div>
);

export default Sidebar;