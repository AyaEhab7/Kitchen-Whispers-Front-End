import { Link } from "react-router-dom";
import "./RecipeList.css";
const RecipeList = (props) => {
  return (
    <>
      <main>
        <h1>Recipes List</h1>

        {props.recipes.map((recipe) => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
            <header>
              <div>
                <ul>
                  <li>{recipe.title}</li>
                </ul>
              </div>
            </header>
          </Link>
        ))}
      </main>
    </>
  );
};
export default RecipeList;
