import axios from "axios";
import { BASE_URL } from "../constants";

const AddProducts = (values, picture) => {

  let formData = new FormData();
  formData.append("product", picture);
  formData.append("name", values.productName);
  formData.append("price", values.productPrice);
  formData.append("quantity", values.productQuantity);
  formData.append("description", values.productDescription);


  axios({
    method: "post",
    url: `${BASE_URL}/product`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log(`upload Success` + res.data);
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export { AddProducts };
