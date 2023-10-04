import { BASE_URL } from "./constants/constants";
import axios from "axios";

async function Post(path, data, token) {
  let url = BASE_URL + path;
  var config = {
    method: "post",
    url: url,
    headers: token
      ? {
<<<<<<< HEAD
        "Content-Type": "application/json",
        Authorization: `${token}`
      }
      : {
        "Content-Type": "application/json"
=======
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      : {
        'Content-Type': 'application/json'
>>>>>>> feature/Recipe
      },
    data: data
  };

  let response = await axios(config);

  return response.data;
}

async function Get(path, token) {
  let url = BASE_URL + path;
  var config = {
    method: "get",
    url: url,
    headers: token
      ? {
<<<<<<< HEAD
        Accept: "multipart/form-data",
        Authorization: `${token}`
      }
      : {
        Accept: "application/json"
=======
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      : {
        Accept: 'application/json'
>>>>>>> feature/Recipe
      }
  };
  let response = await axios(config);
  return response.data;
}

async function Put(path, data, token) {
  let url = BASE_URL + path;
  let response = await axios.put(url, data, {
    headers: token
      ? {
<<<<<<< HEAD
        Accept: "multipart/form-data",
        Authorization: `${token}`
      }
      : {
        Accept: "application/json"
=======
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      : {
        Accept: 'application/json'
>>>>>>> feature/Recipe
      }
  });

  return response.data;
}

async function Delete(path, token) {
  let url = BASE_URL + path;

  let response = await axios.delete(url, {
    headers: token
      ? {
<<<<<<< HEAD
        Accept: "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
      : {
        Accept: "application/json"
=======
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      : {
        Accept: 'application/json'
>>>>>>> feature/Recipe
      }
  });

  return response.data;
}

async function Patch(path, data, token) {
  let url = BASE_URL + path;
  let response = await axios.patch(url, data, {
    headers: token
      ? {
<<<<<<< HEAD
        Accept: "multipart/form-data",
        Authorization: `${token}`
      }
      : {
        Accept: "application/json"
=======
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      : {
        Accept: 'application/json'
>>>>>>> feature/Recipe
      }
  });

  return response.data;
}
export { Post, Get, Put, Delete, Patch };
