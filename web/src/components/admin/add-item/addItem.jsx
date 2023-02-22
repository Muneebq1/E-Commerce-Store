import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { GlobalContext } from '../../../store/Context';
import { useContext } from 'react';
import './addItem.css'
import { AddProducts } from '../../../services/admin/add';


function AddItem() {
  let { state } = useContext(GlobalContext);

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
        AddProducts(values)
      },
  })


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

export default AddItem;