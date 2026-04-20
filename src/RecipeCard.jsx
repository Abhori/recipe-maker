import React, { useState } from 'react';

function RecipeCard({ recipe, onFavorite, isFavorite }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <p>Category: {recipe.strCategory}</p>

      <div className="actions">
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Instructions" : "Show Instructions"}
        </button>
        <button 
          onClick={() => onFavorite(recipe)}
          className={isFavorite ? "fav-btn active" : "fav-btn"}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>
      </div>

      {showDetails && (
        <div className="instructions">
          <h4>How to cook:</h4>
          <p>{recipe.strInstructions.substring(0, 200)}...</p>
          <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch Video</a>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;