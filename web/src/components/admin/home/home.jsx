import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../../store/Context";
import "./home.css";
import { Link } from "react-router-dom";
import {
  GetAllProducts,
  DeleteProduct,
  EditProducts,
} from "../../../services/admin/home";

function Home() {
  let { state } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [loadProduct, setLoadProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const editMode = (product) => {
    setIsEditMode(!isEditMode);
    setEditingProduct(product);

    editFormik.setFieldValue("productName", product.name);
    editFormik.setFieldValue("productPrice", product.price);
    editFormik.setFieldValue("productQuantity", product.quantity);
    editFormik.setFieldValue("productDescription", product.description);
  };

  useEffect(() => {
    GetAllProducts()
      .then((value) => {
        setProducts(value);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [loadProduct]);

  const editFormik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productQuantity: "",
      productDescription: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your product name")
        .required("product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(20, "please enter within 20 characters "),

      productPrice: yup
        .number("Enter your product price")
        .positive("enter positive product price")
        .required("product name is required"),

      productQuantity: yup
        .number("Enter your product quantity")
        .positive("enter positive product quantity")
        .required("product quantity is required"),

      productDescription: yup
        .string("Enter your product Description")
        .required("product name is required")
        .min(3, "please enter more then 3 characters ")
        .max(500, "please enter within 20 characters "),
    }),
    onSubmit: (values) => {
      EditProducts(values, editingProduct)
        .then(() => {
          setLoadProduct(!loadProduct);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="all-post">
      {products.map((eachProduct, i) => (
        <div key={eachProduct._id} className="post">
          <h2>{eachProduct.name}</h2>
          <h5 className="price">{eachProduct.price}</h5>
          <h5>{eachProduct.quantity}</h5>
          <p>{eachProduct.description}</p>

          <button
            onClick={() => {
              DeleteProduct(eachProduct._id)
                .then(setLoadProduct(!loadProduct))
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            delete
          </button>

          <button
            onClick={() => {
              editMode(eachProduct);
            }}
          >
            edit
          </button>

          {isEditMode && editingProduct._id === eachProduct._id ? (
            <div>
              <form onSubmit={editFormik.handleSubmit}>
                <input
                  id="productName"
                  placeholder="Product Name"
                  value={editFormik.values.productName}
                  onChange={editFormik.handleChange}
                />
                {editFormik.touched.productName &&
                  Boolean(editFormik.errors.productName) ? (
                  <span style={{ color: "red" }}>
                    {editFormik.errors.productName}
                  </span>
                ) : null}
                <br />
                <input
                  id="productPrice"
                  placeholder="Product Price"
                  value={editFormik.values.productPrice}
                  onChange={editFormik.handleChange}
                />
                {editFormik.touched.productPrice &&
                  Boolean(editFormik.errors.productPrice) ? (
                  <span style={{ color: "red" }}>
                    {editFormik.errors.productPrice}
                  </span>
                ) : null}
                <br />
                <input
                  id="productQuantity"
                  placeholder="Product quantity"
                  value={editFormik.values.productQuantity}
                  onChange={editFormik.handleChange}
                />
                {editFormik.touched.productQuantity &&
                  Boolean(editFormik.errors.productQuantity) ? (
                  <span style={{ color: "red" }}>
                    {editFormik.errors.productQuantity}
                  </span>
                ) : null}

                <br />
                <input
                  id="productDescription"
                  placeholder="Product Description"
                  value={editFormik.values.productDescription}
                  onChange={editFormik.handleChange}
                />
                {editFormik.touched.productDescription &&
                  Boolean(editFormik.errors.productDescription) ? (
                  <span style={{ color: "red" }}>
                    {editFormik.errors.productDescription}
                  </span>
                ) : null}
                <br />
                <button type="submit"> Submit </button>
              </form>
            </div>
          ) : null}
        </div>
      ))}
      {state.isLogin === 1 ? (
        <nav className="navBar">
          <ul>
            <li>
              {" "}
              <Link to={`/`}>Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to={`/gallery`}>Add items</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to={`/about`}>Account</Link>{" "}
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
export default Home;
