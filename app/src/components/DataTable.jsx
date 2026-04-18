import { Pencil, Trash2 } from 'lucide-react';

const DataTable = ({ type, loadList, data, openModalEdit, deleteMedico }) => {
  const isMedico = type === 'medicos'; // lida com o tipo da página (medicos ou pacientes)

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <table className="table table-hover">
          <thead className="table-light">
            {isMedico ? (
              // Cabeçalho Tabela de Médicos
              <tr>
                <th>Nome</th>
                <th>CRM</th>
                <th>UFCRM</th>
                <th className="text-center">Ações</th>
              </tr>
            ) : (
              // Cabeçalho Tabela de Pacientes
              <tr>
                <th>Nome</th>
                <th>Data de Nasc.</th>
                <th>Carteirinha</th>
                <th>CPF</th>
                <th className="text-center">Ações</th>
              </tr>
            )}
          </thead>
          <tbody>
            {data.length > 0 ? 
              data.map((item, index) => (
                <tr key={index}>
                  {isMedico ? (
                    // Listagem de Médicos
                    <>
                      <td>{item.nome}</td>
                      <td>{item.CRM}</td>
                      <td>{item.UFCRM}</td>
                    </>
                  ) : (
                    // Listagem de Pacientes
                    <>
                      <td>{item.nome}</td>
                      <td>{item.dataNasc}</td>
                      <td>{item.carteirinha}</td>
                      <td>{item.cpf}</td>
                    </>
                  )}
                  {/* Botões de Ação */}
                  <td className="text-center">
                    <button 
                      className="btn btn-outline-primary btn-sm me-2" 
                      title="Editar"
                      onClick={() => openModalEdit(true, item.id)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm" 
                      title="Excluir"
                      onClick={() => deleteMedico(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={isMedico ? 4 : 5} className='text-center'>
                    {loadList ? 'Carregando dados' : 'Nenhum dado cadastrado.'}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;