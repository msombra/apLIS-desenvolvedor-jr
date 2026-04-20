import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Medico from './pages/Medico';
import Paciente from './pages/Paciente';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Medico />} />
        <Route path='/medicos' element={<Medico />} />
        <Route path='/pacientes' element={<Paciente />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;