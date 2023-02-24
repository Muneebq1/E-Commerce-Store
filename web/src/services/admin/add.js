import axios from "axios";
import { BASE_URL } from "../constants";

const AddProducts = async (values) => {
console.log(values , ">>>>>>>>>>>>>>>>>>>>>>>>>>>")
  try {
    const response = await axios.post(`${BASE_URL}/product`, {
      name: values.productName,
      price: values.productPrice,
      quantity: values.productQuantity,
      description: values.productDescription,
    });
    console.log("product added succesfully" ,response);
    return;
  } catch (error) {
    console.log("error in adding product", error);
  }
};
export { AddProducts };
