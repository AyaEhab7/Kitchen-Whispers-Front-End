import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as recipeService from "../../services/recipeService";
import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import "./RecipeDetails.css";
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
    const newComment = await recipeService.createComment(
      recipeId,
      commentFormData
    );
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
    <main className="recipe-page">
      <section className="recipe-details">
        <h1 className="recipe-title">{recipe.title}</h1>
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
          <div className="recipe-actions">
            <Link to={`/recipes/${recipeId}/edit`} className="recipe-edit">
              Edit
            </Link>
            <button
              onClick={() => props.handleDeleteRecipe(recipeId)}
              className="recipe-delete"
            >
              Delete
            </button>
          </div>
        )}
      </section>
      <section className="recipe-comments">
        <h2 className="comments-title">Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!recipe.comments.length && (
          <p className="no-comments">No comments yet</p>
        )}
        {recipe.comments.map((comment) => (
          <article key={comment._id} className="comment">
            <header className="comment-header">
              <p>
                {comment.author.username} posted on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p className="comment-text">{comment.text}</p>
            {comment.author === user._id && (
              <div className="comment-actions">
                <Link
                  to={`/recipes/${recipeId}/comments/${comment._id}/edit`}
                  className="comment-edit"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="comment-delete"
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default RecipeDetails;
