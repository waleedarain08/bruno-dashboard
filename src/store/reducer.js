import { combineReducers } from 'redux';
import AuthReducer from './auth/authReducer';

// reducer import
import customizationReducer from './customizationReducer';
import UsersReducer from './users/usersReducer';
import PetsReducer from './pets/petsReducer';
import PromosReducer from './promos/promosReducer';
import RecipeReducer from './recipe/recipeReducer';
import IngredientsReducer from './ingredients/ingredientsReducer';
import CategoryReducer from './categories/categoriesReducer';
import BlogsfaqsReducer from './blogs&faqs/blogs&faqsReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  AuthReducer: AuthReducer,
  UsersReducer: UsersReducer,
  PetsReducer: PetsReducer,
  PromosReducer: PromosReducer,
  RecipeReducer: RecipeReducer,
  IngredientsReducer: IngredientsReducer,
  CategoryReducer: CategoryReducer,
  BlogsfaqsReducer: BlogsfaqsReducer
});

export default reducer;
