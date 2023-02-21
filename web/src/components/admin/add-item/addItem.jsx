


import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/Context';
import './addItem.css'


function Gallery() {

  let { state, dispatch } = useContext(GlobalContext);


  const [products, setProducts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)


  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${state.baseUrl}/products`)
      console.log("response: ", response.data);

      setProducts(response.data.data)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${state.baseUrl}/product/${id}`)
      console.log("response: ", response.data);

      setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const editMode = (product) => {
    setIsEditMode(!isEditMode)
    setEditingProduct(product)

    editFormik.setFieldValue("productName", product.name)
    editFormik.setFieldValue("productPrice", product.price)
    editFormik.setFieldValue("productDescription", product.description)
   
  }

  useEffect(() => {

    getAllProducts()

  }, [loadProduct])


  const myFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
    },
    validationSchema:
      yup.object({
        productName: yup
          .string('Enter your product name')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

        productPrice: yup
          .number('Enter your product price')
          .positive("enter positive product price")
          .required('product name is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.post(`${state.baseUrl}/product`, {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!loadProduct)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });
  const editFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
    },
    validationSchema:
      yup.object({
        productName: yup
          .string('Enter your product name')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

        productPrice: yup
          .number('Enter your product price')
          .positive("enter positive product price")
          .required('product name is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.put(`${state.baseUrl}/product/${editingProduct._id}`, {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!loadProduct)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });


  return (
    <div>
      <form onSubmit={myFormik.handleSubmit}>
        <input
            className='pName'
          id="productName"
          placeholder="Product Name"
          value={myFormik.values.productName}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productName && Boolean(myFormik.errors.productName)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
            :
            null
        }

        <br />
        <input
            className='pPrice'
          id="productPrice"
          placeholder="Product Price"
          value={myFormik.values.productPrice}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productPrice && Boolean(myFormik.errors.productPrice)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
            :
            null
        }

        <br />
        <input
            className='pDescription'
          id="productDescription"
          placeholder="Product Description"
          value={myFormik.values.productDescription}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productDescription && Boolean(myFormik.errors.productDescription)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productDescription}</span>
            :
            null
        }

        <br />
        <button className='addButton' type="submit"> Submit </button>
      </form>

      <br />
      <br />
    </div>





  );
}

export default Gallery;