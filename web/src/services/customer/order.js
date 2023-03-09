import axios from "axios";
import { BASE_URL } from "../constants";

const AddOrder = (data) => {
    axios.post(`${BASE_URL}/orders`, {
        id: data._id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        pictureUrl: data.pictureUrl,
      })
      .then((response) => {
        console.log("response: ", response.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const GetAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      return response.data.data;
    } catch (error) {
      console.log("error in getting all orders", error);
      return error;
    }
  };

  const GetUserOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order`);
      return response.data.data;
    } catch (error) {
      console.log("error in getting user orders", error);
      return error;
    }
  };
  export {AddOrder , GetAllOrders , GetUserOrders}