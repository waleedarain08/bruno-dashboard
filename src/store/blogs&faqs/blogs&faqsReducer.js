// action - state management
import * as actionTypes from './blogs&faqsType';

export const initialState = {
  isLoading: false,
  data: [],
  addLoading: false,
  addData: [],
  deleteLoading: false,
  deleteData: [],
  updateLoading: false,
  updateData: [],
};

// ==============================|| UsersReducer REDUCER ||============================== //

const BlogsfaqsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.isLoading:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.getBlogsSuccess:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case actionTypes.getBlogsFailed:
      return {
        ...state,
        isLoading: false
      };
    //////////////////////////////////////////////////////////////
    case actionTypes.isLoadingadd:
      return {
        ...state,
        addLoading: true
      };
    case actionTypes.addBlogsSuccess:
      return {
        ...state,
        addLoading: false,
        addData: action.payload
      };
    case actionTypes.addBlogsFailed:
      return {
        ...state,
        addLoading: false
      };
    //////////////////////////////////////////////////////////////
    case actionTypes.isLoadingdelete:
      return {
        ...state,
        deleteLoading: true
      };
    case actionTypes.deleteBlogsSuccess:
      return {
        ...state,
        deleteLoading: false,
        deleteData: action.payload
      };
    case actionTypes.deleteBlogsFailed:
      return {
        ...state,
        deleteLoading: false
      };
    //////////////////////////////////////////////////////////////
    case actionTypes.isLoadingupdate:
      return {
        ...state,
        addLoading: true
      };
    case actionTypes.updateBlogsSuccess:
      return {
        ...state,
        addLoading: false,
        updateData: action.payload
      };
    case actionTypes.updateBlogsFailed:
      return {
        ...state,
        addLoading: false
      };
    default:
      return state;
  }
};

export default BlogsfaqsReducer;
