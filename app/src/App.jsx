import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DataTable from './components/DataTable';
import FormModal from './components/FormModal';

const App = () => {
  const [activeTab, setActiveTab] = useState('medicos');  // lida com o tipo da página (medicos ou pacientes)
  const [loadList, setLoadList] = useState(true); // lida com o carregamento dos dados da listagem
  const [typeModal, setTypeModal] = useState('create'); // lida com o tipo da modal (create ou edit)
  const [showModal, setShowModal] = useState(false); // lida com a exibição da modal

  // Configurações pré-definidas do toast
  const toastConfig = {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    };

  // Rotina para listar Médicos
  const [medicos, setMedicos] = useState([]);
  const [medicoEdit, setMedicoEdit] = useState([]);

  const getMedicos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/medicos');
      setMedicos(res.data)
      setLoadList(false)
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar os dados', toastConfig);
    }
  }

  // Rotina para cadastrar e atualizar Médico
  const upsertMedico = async (data) => {
    let url = 'http://localhost:8000/medicos';

    if (data.id !== undefined && data.id !== null) {
      url += `/${data.id}`;
    }

    try {
      const res = await axios.post(url, data);
      getMedicos();
      setShowModal(false);

      if (res.data.status === 'success') {
        toast.success(res.data.message, toastConfig);
      } else {
        toast.error('Erro ao realizar o processo', toastConfig);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Abre modal edit
  const openModalEdit = (isOpen, dataId) => {
    setTypeModal('edit');

    axios.get(`http://localhost:8000/medicos/${dataId}`)
      .then(res => {
        setMedicoEdit(res.data[0]);
        setShowModal(isOpen);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Rotina para deletar Médico
  const deleteMedico = async (id) => {
    if (confirm('Deseja remover o registro?')) {
      try {
        const res = await axios.delete(`http://localhost:8000/medicos/${id}`);
        
        getMedicos();

        if (res.data.status === 'success') {
          toast.success(res.data.message, toastConfig);
        } else {
          toast.error('Erro ao realizar o processo', toastConfig);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getMedicos()
  }, [setMedicos]);

  // Dados a serem renderizados na tabela
  const dataList = {
    medicos : medicos,
    pacientes : []
  };

  return (
    <div className="d-flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow-1 bg-light p-0">
        <nav className="navbar navbar-white bg-white border-bottom p-3">
          <span className="navbar-brand mb-0 h1 text-capitalize">
            Gestão de {activeTab}
          </span>
          <button className="btn btn-primary d-flex align-items-center" onClick={() => {
            setTypeModal('create'),
            setMedicoEdit(''),
            setShowModal(true)
          }}>
            <Plus size={18} className="me-1" /> Novo
          </button>
        </nav>

        <div className="container-fluid px-4">
          <DataTable 
            type={activeTab} 
            loadList={loadList}
            data={dataList[activeTab]} 
            openModalEdit={openModalEdit} 
            deleteMedico={deleteMedico}
          />
        </div>
      </main>

      <FormModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        typePage={activeTab} 
        typeForm={typeModal}
        sendFormData={upsertMedico}
        formData={medicoEdit}
      />

      <ToastContainer />
    </div>
  );
};

export default App;