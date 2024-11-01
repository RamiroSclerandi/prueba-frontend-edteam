import CharacterCard from './CharacterCard';
import './css/character-card.css';


// Componente de lista de favoritos que recibe una lista de personajes favoritos
// y funciones para modificar o eliminar un personaje
const FavoriteList = ({ favorites, onModify, onDelete }) => {
  return (
    <div className="favorite-cards-container">
      {favorites.length === 0 ? (
        <p>No tienes personajes en favoritos.</p>
      ) : (
        // Si hay personajes favoritos, los mapea y renderiza un componente CharacterCard por cada uno
        favorites.map((character) => (
          <div key={character.id} className="favorite-card">
            <CharacterCard 
              character={character}       // Pasa el objeto personaje al componente CharacterCard
              onAddToFavorites={() => {}} // Esta función está vacía porque en los favoritos no se usa
              onModify={onModify}         // Pasa la función para editar el personaje
              onDelete={onDelete}         // Pasa la función para eliminar el personaje
              isFavorite={true}           // Marca el personaje como favorito para cualquier renderizado condicional
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteList;
