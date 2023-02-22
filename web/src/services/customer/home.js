import axios from "axios";
const BASE_URL = window.location.href.includes("localhost")
  ? `http://localhost:5001/api/v1`
  : `/api/v1`;

const AddToCart = (data) => {
    axios.post(`${BASE_URL}/cart`, {
      name: data.name,
      price: data.price,
      description: data.description,
    })
      .then(response => {
        console.log("response: ", response.data);
      })
      .catch(err => {
        console.log("error:", err);
      })
  }
  export {AddToCart}