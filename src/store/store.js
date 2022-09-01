import { configureStore } from "@reduxjs/toolkit";
import { exercisesRapid } from "../services/ExercisesRapid";
import { recipes } from "../services/getRecipes";

export default configureStore({
  reducer: {
    [exercisesRapid.reducerPath]: exercisesRapid.reducer,
    [recipes.reducerPath]: recipes.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exercisesRapid.middleware,recipes.middleware)
    
});