import axios from "axios";
import { BASE_URL } from "../constants";

const AddPicture = (pic, id) => {
  let formData = new FormData();
  formData.append("profilePic", pic);
  formData.append("id", id);
  axios({
    method: "post",
    url: `${BASE_URL}/users`,
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
const GetProfilePic = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`);
    return response.data.data;
  } catch (error) {
    console.log("error in getting picture", error);
    return error;
  }
};

export { AddPicture, GetProfilePic };
