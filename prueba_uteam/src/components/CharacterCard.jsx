import './css/character-card.css';

// Componente que representa una tarjeta de personaje, mostrando detalles como nombre, imagen y descripción.
// Incluye botones para agregar a favoritos, modificar y eliminar el personaje, según el contexto en que se muestre.
const CharacterCard = ({ character, onAddToFavorites, onModify, onDelete, isFavorite }) => {
  return (
    <div className="card">
      <img src={character.thumbnail} alt={character.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5><span>id: {character.id}</span>
        <p className="card-text">{character.description || 'Sin descripción disponible.'}</p>
        
        {/* Renderiza el botón para agregar a favoritos solo si el personaje aún no es favorito */}
        {!isFavorite && (
          <button onClick={() => onAddToFavorites(character)} className="btn btn-primary">
            Agregar a Favoritos
          </button>
        )}
        
        {/* Si el personaje ya es favorito, muestra botones para modificar y eliminar */}
        {isFavorite && (
          <div className="d-flex justify-content-between mt-2">
            {/* Botón para abrir el modal de edición con los datos del personaje actual */}
            <button onClick={() => onModify(character)} className="btn btn-secondary btn-sm">
              Modificar
            </button>
            
            {/* Botón para eliminar el personaje de favoritos */}
            <button onClick={() => onDelete(character.id)} className="btn btn-danger btn-sm">
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
