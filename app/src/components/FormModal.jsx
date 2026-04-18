import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FormModal = ({ isOpen, onClose, typePage, typeForm, sendFormData, formData }) => {
  if (!isOpen) return null;
  const isMedico = typePage === 'medicos'; // lida com o tipo da página (medicos ou pacientes)
  const isCreate = typeForm === 'create'; // lida com o tipo do formulário (create ou edit)

  // lida com o estado do botão de submit
  const [sendButtonState, setSendButtonState] = useState({
    text : isCreate ? 'Salvar' : 'Atualizar',
    isDisabled : false
  });

  // opções do input UF CRM do formulário de médicos
  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // lida com validação e envio dos dados do formulário
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nome: formData?.nome || '',
      CRM: formData?.CRM || '',
      UFCRM: formData?.UFCRM || '',
    }
  });

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset({
        nome: formData.nome || '',
        CRM: formData.CRM || '',
        UFCRM: formData.UFCRM || '',
      });
    }
  }, [formData, reset]);

  const onSubmit = data => {
    setSendButtonState({
      text : isCreate ? 'Salvando' : 'Atualizando',
      isDisabled : true
    });

    if(!isCreate) data.id = formData.id;

    sendFormData(data);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isCreate ? 'Cadastrar' : 'Editar'} {isMedico ? 'Médico' : 'Paciente'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">

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
              {isMedico ? (
                // Form Medico
                <>
                  {/* Input CRM */}
                  <div className="mb-3">
                    <label className="form-label">CRM</label>
                    <input type="text" 
                      className={`form-control ${errors?.CRM && 'is-invalid'}`} 
                      { ...register('CRM', {required: true}) } 
                    />
                    {errors?.CRM?.type === 'required' && <div className='invalid-feedback'>Preenchimento obrigatório</div>}
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
                </>
              ) : (
                // Form Paciente
                <>
                  {/* Input Data Nasc. */}
                  <div className="mb-3">
                    <label className="form-label">Data de Nascimento</label>
                    <input type="date" className="form-control" />
                  </div>
                  {/* Input Carteirinha */}
                  <div className="mb-3">
                    <label className="form-label">Nº Carteirinha</label>
                    <input type="text" className="form-control" />
                  </div>
                  {/* Input CPF */}
                  <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" placeholder="000.000.000-00" />
                  </div>
                </>
              )}
            </form>

          </div>
          <div className="modal-footer">
            {/* Buttons */}
            <button className="btn btn-secondary" disabled={sendButtonState.isDisabled} onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" disabled={sendButtonState.isDisabled} onClick={() => handleSubmit(onSubmit)()}>
              {sendButtonState.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;