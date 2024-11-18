import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as recipeService from "../../services/recipeService";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();
  //   console.log(recipeId);
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchHoot = async () => {
      const recipeData = await recipeService.show(recipeId);
      console.log("recipeData", recipeData);
      setRecipe(recipeData);
    };
    fetchHoot();
  }, [recipeId]);
  if (!recipe) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <section>
        <h1>{recipe.title}</h1>
        <p>
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </p>
        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>
      </section>
    </main>
  );
};

export default RecipeDetails;
