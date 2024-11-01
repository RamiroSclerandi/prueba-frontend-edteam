import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const EditCharacterModal = ({ character, onSave, onClose }) => {
  // Estados para almacenar el nombre y la descripción del personaje en edición
  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);

  // Maneja la acción de guardar y envía los datos actualizados del personaje al componente padre
  const handleSave = () => {
    // Pasa el personaje actualizado a través de la función onSave
    onSave({ ...character, name, description });
    onClose();  // Cierra el modal después de guardar
  };

  return (
    // Contenedor del modal usando clases Bootstrap para que aparezca visible y centrado
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Personaje</h5>
            <button onClick={onClose} className="btn-close"></button>
          </div>
          <div className="modal-body">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control mb-2"
            />
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            ></textarea>
          </div>
          <div className="modal-footer">
            <button onClick={handleSave} className="btn btn-primary">Guardar</button>
            <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCharacterModal;
