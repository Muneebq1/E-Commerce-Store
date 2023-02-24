import axios from "axios";
import { BASE_URL } from "../constants";

const GetAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.data;
  } catch (error) {
    console.log("error in getting all products", error);
    return error;
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${id}`);
    console.log("response: ", response.data);
  } catch (error) {
    console.log("error in getting all products", error);
  }
};

const EditProducts = async (values, editingProduct) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/product/${editingProduct._id}`,
      {
        name: values.productName,
        price: values.productPrice,
        quantity: values.productQuantity,
        description: values.productDescription,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("error in editing product", error);
  }
};

export { GetAllProducts, DeleteProduct, EditProducts };
