import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as recipeService from "../../services/recipeService";

import CommentForm from '../CommentForm/CommentForm';

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

  const handleAddComment = async (commentFormData) => {
    console.log('commentFormData', commentFormData);
  };


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
          <strong>Steps:</strong> {recipe.steps}
        </p>
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </p>
        <p>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </p>
      </section>
      <section>
        <h2>Comments</h2><CommentForm />
        {!recipe.comments.length && <p>No comments yet</p>}
        {recipe.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default RecipeDetails;
