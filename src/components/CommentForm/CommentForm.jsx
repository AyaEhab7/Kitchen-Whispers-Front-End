import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as recipeService from "../../services/recipeService";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });
  const { recipeId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setFormData(
        recipeData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (recipeId && commentId) fetchRecipe();
  }, [recipeId, commentId]);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (recipeId && commentId) {
      recipeService.updateComment(recipeId, commentId, formData);
      navigate(`/recipes/${recipeId}`);
    } else {
      props.handleAddComment(formData);
      window.location.reload();
    }
    setFormData({ text: "" });
  };

  if (recipeId && commentId)
    return (
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Edit Comment</h1>
          <label htmlFor="text-input">Your comment:</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;
