const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recipes`;

// ========= Protected Routes =========

//router.use(verifyToken);
//  All recipes
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// one recipe bt ID
const show = async (recipeID) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeID}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (recipeFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (recipeID, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeID}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// delete recipe

const deleteRecipe = async (recipeID) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(recipeId, recipeFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export {
  index,
  show,
  create,
  createComment,
  deleteRecipe,
  update,
};
