import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as recipeService from "../../services/recipeService";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";

import CommentForm from "../CommentForm/CommentForm";

const RecipeDetails = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      console.log("recipeData", recipeData);
      setRecipe(recipeData);
    };
    fetchRecipe();
  }, [recipeId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await recipeService.createComment(recipeId, commentFormData);
    setRecipe({ ...recipe, comments: [...recipe.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    await recipeService.deleteComment(recipeId, commentId);
    setRecipe({
      ...recipe,
      comments: recipe.comments.filter((comment) => comment._id !== commentId),
    });
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
            <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
          </>
        )}
      </section>
      <section>
        <h2>Comment</h2>
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
            {/* Show delete button only if the logged-in user is the author of the comment */}
            {comment.author === user._id && (
              <>
                <Link to={`/recipes/${recipeId}/comments/${comment._id}/edit`}>Edit</Link>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default RecipeDetails;
