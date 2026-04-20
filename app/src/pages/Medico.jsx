import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Plus } from "lucide-react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";

const Medico = () => {
    const [showModal, setShowModal] = useState(false); // lida com a exibição da modal

    // configurações pré-definidas do toast
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

    // lista os dados na tabela
    const [loadList, setLoadList] = useState(true);
    const [medicos, setMedicos] = useState([]);

    const getMedicos = () => {
        axios.get('http://localhost:8000/medicos')
             .then(res => {
                setLoadList(false);
                setMedicos(res.data);
             })
             .catch(err => {
                console.error(err);
                toast.error('Erro ao carregar os dados', toastConfig);
             });
    };

    useEffect(() => {
        getMedicos()
    }, [setMedicos]);

    // opções do input UF CRM
    const ufs = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    // lida com validação e envio dos dados do formulário
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ 
        defaultValues: {
            nome: '',
            CRM: '',
            UFCRM: ''
        } 
    });

    // manipula o estado dos botões da modal
    const [buttonState, setButtonState] = useState();

    // abre a modal
    const openModal = (isOpen, id = null) => {
        // se tiver ID vai abrir o formulário de edit
        if (id !== null) {
            axios.get(`http://localhost:8000/medicos/${id}`)
                 .then(res => {
                    const data = res.data[0];

                    // preenche o formulário
                    reset({
                        id: data.id,
                        nome: data.nome,
                        CRM: data.CRM,
                        UFCRM: data.UFCRM
                    });

                    setShowModal(isOpen);
                 })
                 .catch(err => {
                    console.error(err);
                    toast.error('Erro ao carregar os dados', toastConfig);
                 });

            setButtonState({
                isDisabled: false,
                text: 'Atualizar'
            });
        } else { // se não, abre o formulário de create limpando todos os campos
            reset({
                nome: '',
                CRM: '',
                UFCRM: ''
            });

            setShowModal(isOpen);

            setButtonState({
                isDisabled: false,
                text: 'Salvar'
            });
        }
    };

    // rotina de criação e atualização de registro
    const upsertMedico = data => {
        const { id } = data;

        // faz a inserção
        if (id === null || id === undefined) {
            setButtonState({
                isDisabled: true,
                text: 'Salvando'
            });

            axios.post('http://localhost:8000/medicos', data)
                 .then(res => {
                    getMedicos(); // atualiza a tabela
                    setShowModal(false); // fecha a modal
                    toast.success(res.data.message, toastConfig); // exibe a mensagem de sucesso
                 })
                 .catch(err => {
                    console.error(err);
                    toast.error('Erro ao realizar o processo', toastConfig);
                 });
        } else { // faz a atualização
            setButtonState({
                isDisabled: true,
                text: 'Atualizando'
            });

            axios.put(`http://localhost:8000/medicos/${id}`, data)
                .then(res => {
                    getMedicos(); // atualiza a tabela
                    setShowModal(false); // fecha a modal
                    toast.success(res.data.message, toastConfig); // exibe a mensagem de sucesso
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Erro ao realizar o processo', toastConfig);
            });
        }
    };

    // deleta um registro
    const deleteMedico = id => {
        if (confirm('Deseja remover o registro?')) {
            axios.delete(`http://localhost:8000/medicos/${id}`)
                 .then(res => {
                    getMedicos(); // atualiza a listagem
                    toast.success(res.data.message, toastConfig); // exibe a mensagem de sucesso
                 })
                 .catch(err => {
                    console.error(err);
                    toast.error('Erro ao realizar o processo', toastConfig);
                 });
        }
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <main className="flex-grow-1 bg-light p-0">
                <Header page={'Médico'} openModal={openModal} />

                <div className="container-fluid px-4">
                    <DataTable header={['Nome', 'CRM', 'UFCRM']}>
                        {medicos.length > 0 ?
                            medicos.map((medico, idx) => (
                                <tr key={idx}>
                                    <td>{medico.nome}</td>
                                    <td>{medico.CRM}</td>
                                    <td>{medico.UFCRM}</td>
                                    <td className="text-center">
                                        <ActionButtons 
                                            openModal={openModal} 
                                            dataId={medico.id} 
                                            deleteData={deleteMedico}
                                        />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className='text-center'>
                                        {loadList ? 'Carregando dados' : 'Nenhum dado cadastrado.'}
                                    </td>
                                </tr>
                            )
                        }
                    </DataTable>
                </div>
            </main>

            {/* Modal */}
            {showModal && 
                <Modal 
                    title={`${buttonState.text === 'create' ? 'Cadastrar' : 'Editar'} Médico`} 
                    closeModal={openModal} 
                    buttonState={buttonState}
                    onSubmit={handleSubmit(upsertMedico)}
                >
                    {/* Form */}
                    <form>
                        {/* Input Nome */}
                        <div className="mb-3">
                            <label className="form-label">Nome Completo</label>
                            <input type="text" 
                                className={`form-control ${errors?.nome && 'is-invalid'}`} 
                                { ...register('nome', {required: true}) } 
                            />
                            {errors?.nome?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                        </div>
                        {/* Input CRM */}
                        <div className="mb-3">
                            <label className="form-label">CRM</label>
                            <input type="text" 
                                className={`form-control ${errors?.CRM && 'is-invalid'}`} 
                                { ...register('CRM', {required: true, maxLength: 10}) } 
                            />
                            {errors?.CRM?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                            {errors?.CRM?.type === 'maxLength' && <div className='invalid-feedback'>Máximo 10 dígitos</div>}
                        </div>
                        {/* Input UF CRM */}
                        <div className="mb-3">
                            <label className="form-label">UF CRM</label>
                            <select 
                                className={`form-select ${errors?.UFCRM && 'is-invalid'}`} 
                                { ...register('UFCRM', {required: true}) }
                            >
                            <option value="">Selecione</option>
                                {ufs.map((uf, idx) => (
                                    <option key={idx} value={uf}>{uf}</option>
                                ))}
                            </select>
                            {errors?.UFCRM?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                        </div>
                    </form>
                </Modal>
            }

            {/* Toast */}
            <ToastContainer />
        </div>
    );
};

export default Medico;