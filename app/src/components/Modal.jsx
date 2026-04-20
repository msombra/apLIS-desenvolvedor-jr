const Modal = ({ children, title, closeModal, buttonState, onSubmit }) => {

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {title}
                        </h5>
                        <button type="button" className="btn-close" onClick={() => closeModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {/* Buttons */}
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            disabled={buttonState.isDisabled} 
                            onClick={() => closeModal(false)}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            disabled={buttonState.isDisabled} 
                            onClick={onSubmit}
                        >
                            {buttonState.text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;