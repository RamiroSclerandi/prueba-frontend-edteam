import { useState } from 'react';

import SearchForm from './components/SearchForm';
import CharacterCard from './components/CharacterCard';
import FavoriteList from './components/FavoriteList';
import EditCharacterModal from './components/EditCharacterModal';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente principal de la aplicación, el cual maneja toda la lógica de estados y funciones
const App = () => {
  // Estado para almacenar el personaje buscado actualmente
  const [character, setCharacter] = useState(null);
  // Estado para almacenar la lista de personajes favoritos
  const [favorites, setFavorites] = useState([]);
  // Estado para controlar si se está editando un personaje en el modal
  const [isEditing, setIsEditing] = useState(false);
  // Estado para almacenar el personaje que se está editando
  const [currentEditCharacter, setCurrentEditCharacter] = useState(null);

  // Variables para la autenticación de la API de Marvel
  const ts = '1';
  const apiKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const hash = import.meta.env.VITE_MARVEL_HASH;
  
  // Función para buscar un personaje por nombre en la API de Marvel
  const searchCharacter = async (name) => {
    // Verifica si el personaje ya está en favoritos antes de hacer la solicitud
    if (favorites.find((fav) => fav.name.toLowerCase() === name.toLowerCase())) {
      setCharacter(null);
      return alert('El personaje ya se encuentra en la lista de favoritos.');
    }
    
    // Construcción de la URL de solicitud a la API
    const url = `https://gateway.marvel.com/v1/public/characters?name=${name}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    
    try {
      // Realiza la solicitud a la API
      const response = await fetch(url);
      const data = await response.json();

      // Verifica si la API devolvió resultados y establece el estado con el personaje encontrado
      if (data.data.results.length) {
        const foundCharacter = data.data.results[0];
        setCharacter({
          id: foundCharacter.id,
          name: foundCharacter.name,
          description: foundCharacter.description || 'Sin descripción disponible.',
          thumbnail: `${foundCharacter.thumbnail.path}.${foundCharacter.thumbnail.extension}`,
        });
      } else {
        alert("Personaje no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el personaje:", error);
    }
  };

  // Función para agregar un personaje a la lista de favoritos y limpiar el resultado de búsqueda
  const addToFavorites = (character) => {
    // Verifica que el personaje no esté ya en favoritos antes de agregarlo
    if (!favorites.find((fav) => fav.id === character.id)) {
      setFavorites([...favorites, character]);
      setCharacter(null); // Limpia el personaje actual después de agregarlo a favoritos
    }
  };

  // Función para eliminar un personaje de la lista de favoritos
  const deleteFavorite = (id) => {
    setFavorites(favorites.filter((character) => character.id !== id));
  };

  // Función para abrir el modal de edición con el personaje seleccionado
  const editFavorite = (character) => {
    setCurrentEditCharacter(character);
    setIsEditing(true);
  };

  // Función para guardar los cambios de edición y cerrar el modal
  const saveEdit = (updatedCharacter) => {
    setFavorites(favorites.map((character) => 
      character.id === updatedCharacter.id ? updatedCharacter : character
    ));
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Buscador de personajes de Marvel</h1>
      
      {/* Componente de formulario de búsqueda */}
      <SearchForm onSearch={searchCharacter} />

      {/* Componente de carta de personaje con verificación si está en favoritos */}
      {character && (
        <CharacterCard 
          character={character} 
          onAddToFavorites={addToFavorites} 
          onModify={editFavorite} 
          onDelete={deleteFavorite} 
          isFavorite={favorites.some(fav => fav.id === character.id)} // Verifica si está en favoritos
        />
      )}

      {/* Lista de personajes favoritos */}
      <h2 className="mt-4">Favoritos</h2>
      <FavoriteList favorites={favorites} onModify={editFavorite} onDelete={deleteFavorite} />

      {/* Modal de edición de personaje */}
      {isEditing && (
        <EditCharacterModal
          character={currentEditCharacter}
          onSave={saveEdit}
          onClose={() => setIsEditing(false)}
        />
      )}
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
