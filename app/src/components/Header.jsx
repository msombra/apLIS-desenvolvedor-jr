import { Plus } from "lucide-react";

const Header = ({ page, openModal }) => (
    <>
        <nav className="navbar navbar-white bg-white border-bottom p-3">
            <span className="navbar-brand mb-0 h1">
                Gestão de {page}
            </span>
            <button className="btn btn-primary d-flex align-items-center" onClick={() => openModal(true)}>
                <Plus size={18} className="me-1" /> Novo
            </button>
        </nav>
    </>
);

export default Header;