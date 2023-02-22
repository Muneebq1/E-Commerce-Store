import axios from "axios";
const BASE_URL = window.location.href.includes("localhost")
  ? `http://localhost:5001/api/v1`
  : `/api/v1`;

const AddProducts = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, {
      name: values.productName,
      price: values.productPrice,
      description: values.productDescription,
    });
    console.log("product added succesfully" ,response);
    return;
  } catch (error) {
    console.log("error in adding product", error);
  }
};
export { AddProducts };
