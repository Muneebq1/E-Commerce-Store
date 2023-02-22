import axios from "axios";
const BASE_URL = window.location.href.includes("localhost")
  ? `http://localhost:5001/api/v1`
  : `/api/v1`;

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
export { GetAllCarts, DeleteCart };
