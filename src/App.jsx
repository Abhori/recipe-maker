
import React, { useState, useEffect } from 'react';
import RecipeCard from "./RecipeCard";
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('chicken'); // Default search
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(search);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(search);
  };

  const toggleFavorite = (recipe) => {
    if (favorites.find(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="App">
      <h1>🍲 Recipe Finder</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for an ingredient (e.g. beef, pasta)..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="stats">
        <span>Favorites: {favorites.length} ❤️</span>
      </div>

      {loading ? <p>Stirring the pot... 🥣</p> : (
        <div className="recipe-grid">
          {recipes.length > 0 ? recipes.map(recipe => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe} 
              onFavorite={toggleFavorite}
              isFavorite={favorites.some(f => f.idMeal === recipe.idMeal)}
            />
          )) : <p>No recipes found. Try another ingredient!</p>}
        </div>
      )}
    </div>
  );
}

export default App;