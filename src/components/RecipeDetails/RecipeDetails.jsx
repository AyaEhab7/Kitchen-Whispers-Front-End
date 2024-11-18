import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as recipeService from "../../services/recipeService";
import { AuthedUserContext } from "../../App";

import CommentForm from "../CommentForm/CommentForm";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchHoot = async () => {
      const recipeData = await recipeService.show(recipeId);
      console.log("recipeData", recipeData);
      setRecipe(recipeData);
    };
    fetchHoot();
  }, [recipeId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await recipeService.createComment(
      recipeId,
      commentFormData
    );
    setRecipe({ ...recipe, comments: [...recipe.comments, newComment] });
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

        {recipe.author._id === user._id && (
          <>
            {" "}
            <button>Delete</button>{" "}
          </>
        )}
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!recipe.comments.length && <p>No comments yet</p>}
        {recipe.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default RecipeDetails;
