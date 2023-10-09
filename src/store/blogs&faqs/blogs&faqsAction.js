// action - state management
import * as actionTypes from './blogs&faqsType';
import { Get, Post, Delete, Patch } from '../../helpers/apicalls/apicalls';

export const GetAllBlogs_News = (data) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoading });
    Get(`news-FAQ/type/newsAndBlog`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.getBlogsSuccess,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.getBlogsFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.getBlogsFailed });
      });
  };
};

export const AddBlogsNnews = (data, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingadd });
    Post(`news-FAQ/`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.addBlogsSuccess,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.addBlogsFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        setLoading(false);
        dispatch({ type: actionTypes.addBlogsFailed });
      });
  };
};

export const DeleteBlogsNnews = (data, id, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingdelete });
    Delete(`news-FAQ/${id}`, data)
      .then(function (response) {
        if (response?.isSuccess) {
          dispatch({
            type: actionTypes.deleteBlogsSuccess,
            payload: response?.data
          });
          onSuccess();
        } else {
          dispatch({ type: actionTypes.deleteBlogsFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.deleteBlogsFailed });
      });
  };
};

export const EditBlogsNnews = (id, data, token, onSuccess) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.isLoadingupdate });
    Patch(`news-FAQ/${id}`, data, token)
      .then(function (response) {
        console.log(response, 'response');
        if (response?.isSuccess) {
          onSuccess();
          dispatch({
            type: actionTypes.updateBlogsSuccess,
            payload: response?.data
          });
        } else {
          dispatch({ type: actionTypes.updateBlogsFailed });
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        dispatch({ type: actionTypes.updateBlogsFailed });
      });
  };
};
