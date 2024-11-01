import { useState } from 'react';

import './css/search-form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchForm = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState('');

  // Maneja el envío del formulario y llama a la función onSearch pasada como prop
  const handleSubmit = (e) => {
    e.preventDefault();    // Previene el comportamiento predeterminado del formulario
    onSearch(searchTerm);  // Llama a la función de búsqueda con el término actual
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label className="form-label">Ingrese el personaje de Marvel a buscar:</label>
      <div className="d-flex justify-content-center align-items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Actualiza el estado con el valor ingresado
          className="form-control me-2"
          placeholder="Nombre del personaje"
        />
        <button type="submit" className="btn btn-primary search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
