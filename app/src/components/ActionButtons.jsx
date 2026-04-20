import { Pencil, Trash2 } from "lucide-react";

const ActionButtons = ({ openModal, dataId, deleteData }) => {

  return (
    <>
        <button 
            className="btn btn-outline-primary btn-sm me-2" 
            title="Editar"
            onClick={() => openModal(true, dataId)}
        >
            <Pencil size={18} />
        </button>
        <button 
            className="btn btn-outline-danger btn-sm" 
            title="Excluir"
            onClick={() => deleteData(dataId)}
        >
            <Trash2 size={18} />
        </button>
    </>
  );
};

export default ActionButtons;