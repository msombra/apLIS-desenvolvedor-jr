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

  // Rotina para listar dados (médicos ou pacientes)
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  const getData = async () => {
    try {
      setLoadList(true); // Inicia carregamento
      let res;

      if (activeTab === 'medicos') {
        res = await axios.get('http://localhost:8000/medicos');
        setMedicos(res.data);
      } else {
        res = await axios.get('http://localhost:3000/pacientes');
        setPacientes(res.data);
      }

      setLoadList(false);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar os dados', toastConfig);
      setLoadList(false); // Para carregamento mesmo em erro
    }
  }

  // Rotina para cadastrar e atualizar Médico
  const upsertMedico = async (data) => {
    let url = activeTab === 'medicos' ? 'http://localhost:8000/medicos' : 'http://localhost:3000/pacientes';

    if (data.id !== undefined && data.id !== null) {
      url += `/${data.id}`;
    }

    try {
      const res = await axios.post(url, data);
      getData();
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
  const openModalEdit = (isOpen, id) => {
    const url = activeTab === 'medicos' ? `http://localhost:8000/medicos/${id}` : `http://localhost:3000/pacientes/${id}`;
    setTypeModal('edit');

    axios.get(url)
      .then(res => {
        setDataEdit(res.data[0]);
        setShowModal(isOpen);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Rotina para deletar Médico
  const deleteData = async (id) => {
    const url = activeTab === 'medicos' ? `http://localhost:8000/medicos/${id}` : `http://localhost:3000/pacientes/${id}`;

    if (confirm('Deseja remover o registro?')) {
      try {
        const res = await axios.delete(url);
        
        getData();

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
    getData()
  }, [activeTab]);

  // Dados a serem renderizados na tabela
  const dataList = {
    medicos : medicos,
    pacientes : pacientes
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
            setDataEdit(''),
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
            deleteData={deleteData}
          />
        </div>
      </main>

      <FormModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        typePage={activeTab} 
        typeForm={typeModal}
        sendFormData={upsertMedico}
        formData={dataEdit}
      />

      <ToastContainer />
    </div>
  );
};

export default App;