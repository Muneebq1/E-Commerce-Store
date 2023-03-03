import { useFormik } from 'formik';
import * as yup from 'yup';
import './addItem.css'
import { AddProducts } from '../../../services/admin/add';
import { useState } from 'react';


function AddItem() {
  const [preview ,setPreview] = useState()
  const [picture ,setPicture] = useState()


  const myFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productQuantity: '',
      productDescription: '',
      picture: '',
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

        productQuantity: yup
          .number('Enter your product quantity')
          .positive("enter positive product quantity")
          .required('product quantity is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      AddProducts(values , picture)
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
          type='number'
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
          className='pQuantity'
          type='number'
          id="productQuantity"
          placeholder="Product quantity"
          value={myFormik.values.productQuantity}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.productQuantity && Boolean(myFormik.errors.productQuantity)) ?
            <span style={{ color: "red" }}>{myFormik.errors.productQuantity}</span>
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
        <input
          type="file"
          id='picture'
          value={myFormik.values.picture}
          onChange={
            (e) => {
            let url = URL.createObjectURL(e.currentTarget.files[0])
            setPreview(url)
            setPicture(e.currentTarget.files[0])
          }
          } />
        <br />
        <img width={200} src={preview} alt="" />
        <br />
        <button className='addButton' type="submit"> Submit </button>
      </form>
      <br />
      <br />
    </div>

  );
}

export default AddItem;