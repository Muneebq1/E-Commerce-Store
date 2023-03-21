import axios from "axios";
import { BASE_URL } from "../constants";

const GetAllCarts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/carts`);
    console.log("response: ", response.data);
    return response.data.data;
  } catch (error) {
    console.log("error in getting all products", error);
  }
};

const DeleteCart = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${id}`);
    console.log("response: ", response.data);
  } catch (error) {
    console.log("error in getting all carts", error);
  }
};

const DeleteAllCarts = async (owner) => {
  try {
    const response = await axios.delete(`${BASE_URL}/carts/${owner}`);
    console.log("response: ", response.data);
  } catch (error) {
    console.log("error in getting all carts", error);
  }
};

const AddingOrder = async (value, eachCart) => {
  try {
    const response = await axios.put(`${BASE_URL}/cart/${eachCart._id}`, {
      order: value,
    });
    return response.data;
  } catch (error) {
    console.log("error in adding order", error);
  }
};


export { GetAllCarts, DeleteCart, AddingOrder, DeleteAllCarts };
