import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Plus } from "lucide-react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { PatternFormat } from 'react-number-format';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";

const Paciente = () => {
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
    const [pacientes, setPacientes] = useState([]);

    const getPacientes = () => {
        axios.get('http://localhost:3000/pacientes')
             .then(res => {
                setLoadList(false);
                setPacientes(res.data);
             })
             .catch(err => {
                console.error(err);
                toast.error('Erro ao carregar os dados', toastConfig);
             });
    };

    useEffect(() => {
        getPacientes()
    }, [setPacientes]);

    // lida com validação e envio dos dados do formulário
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ 
        defaultValues: {
            nome: '',
            dataNascimento: '',
            carteirinha: '',
            cpf: ''
        } 
    });

    // manipula o estado dos botões da modal
    const [buttonState, setButtonState] = useState();

    // abre a modal
    const openModal = (isOpen, id = null) => {
        // se tiver ID vai abrir o formulário de edit
        if (id !== null) {
            axios.get(`http://localhost:3000/pacientes/${id}`)
                 .then(res => {
                    const data = res.data[0];

                    // preenche o formulário
                    reset({
                        id: data.id,
                        nome: data.nome,
                        dataNascimento: data.dataNascimento,
                        carteirinha: data.carteirinha,
                        cpf: data.cpf
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
                dataNascimento: '',
                carteirinha: '',
                cpf: ''
            });

            setShowModal(isOpen);

            setButtonState({
                isDisabled: false,
                text: 'Salvar'
            });
        }
    };

    // rotina de criação e atualização de registro
    const upsertPaciente = data => {
        const { id } = data;

        // faz a inserção
        if (id === null || id === undefined) {
            setButtonState({
                isDisabled: true,
                text: 'Salvando'
            });

            axios.post('http://localhost:3000/pacientes', data)
                 .then(res => {
                    getPacientes(); // atualiza a tabela
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

            axios.put(`http://localhost:3000/pacientes/${id}`, data)
                .then(res => {
                    getPacientes(); // atualiza a tabela
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
    const deletePaciente = id => {
        if (confirm('Deseja remover o registro?')) {
            axios.delete(`http://localhost:3000/pacientes/${id}`)
                 .then(res => {
                    getPacientes(); // atualiza a listagem
                    toast.success(res.data.message, toastConfig); // exibe a mensagem de sucesso
                 })
                 .catch(err => {
                    console.error(err);
                    toast.error('Erro ao realizar o processo', toastConfig);
                 });
        }
    };

    // função que formata valor CPF
    const formatCPF = cpf => {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <main className="flex-grow-1 bg-light p-0">
                <Header page={'Paciente'} openModal={openModal} />

                <div className="container-fluid px-4">
                    <DataTable header={['Nome', 'Data Nasc.', 'Carteirinha', 'CPF']}>
                        {pacientes.length > 0 ?
                            pacientes.map((paciente, idx) => (
                                <tr key={idx}>
                                    <td>{paciente.nome}</td>
                                    <td>
                                        {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td>{paciente.carteirinha}</td>
                                    <td>{formatCPF(paciente.cpf)}</td>
                                    <td className="text-center">
                                        <ActionButtons 
                                            openModal={openModal} 
                                            dataId={paciente.id} 
                                            deleteData={deletePaciente}
                                        />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className='text-center'>
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
                    title={`${buttonState.text === 'Salvar' ? 'Cadastrar' : 'Editar'} Paciente`} 
                    closeModal={openModal} 
                    onSubmit={handleSubmit(upsertPaciente)}
                    buttonState={buttonState}
                >
                    {/* Form */}
                    <form onSubmit={handleSubmit(upsertPaciente)}>
                        {/* Input Nome */}
                        <div className="mb-3">
                            <label className="form-label">Nome Completo</label>
                            <input type="text" 
                                className={`form-control ${errors?.nome && 'is-invalid'}`} 
                                { ...register('nome', {required: true}) } 
                            />
                            {errors?.nome?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                        </div>
                        {/* Input Data Nasc */}
                        <div className="mb-3">
                            <label className="form-label">Data de Nascimento</label>
                            <input type="date" 
                                className={`form-control ${errors?.dataNascimento && 'is-invalid'}`} 
                                { ...register('dataNascimento', {required: true}) } 
                            />
                            {errors?.dataNascimento?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                        </div>
                        {/* Input Carteirinha */}
                        <div className="mb-3">
                            <label className="form-label">Carteirinha</label>
                            <input type="text" 
                                className={`form-control ${errors?.carteirinha && 'is-invalid'}`} 
                                { ...register('carteirinha', {required: true, minLength: 4, maxLength: 20}) } 
                            />
                            {errors?.carteirinha?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                            {errors?.carteirinha?.type === 'minLength' && <div className='invalid-feedback'>Mínimo 4 dígitos</div>}
                            {errors?.carteirinha?.type === 'maxLength' && <div className='invalid-feedback'>Máximo 20 dígitos</div>}
                        </div>
                        {/* Input CPF */}
                        <div className="mb-3">
                            <label className="form-label">CPF</label>
                            <Controller
                                name="cpf"
                                control={control}
                                rules={{ required: true, minLength: 11 }}
                                render={({ field: { onChange, value } }) => (
                                    <PatternFormat
                                        value={value}
                                        onValueChange={(values) => onChange(values.value)}
                                        displayType="input"
                                        format="###.###.###-##"
                                        mask="_"
                                        className={`form-control ${errors?.cpf && 'is-invalid'}`}
                                    />
                                )}
                            />
                            {errors?.cpf?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
                            {errors?.cpf?.type === 'minLength' && <div className='invalid-feedback'>CPF inválido</div>}
                        </div>
                    </form>
                </Modal>
            }

            {/* Toast */}
            <ToastContainer />
        </div>
    );
};

export default Paciente;