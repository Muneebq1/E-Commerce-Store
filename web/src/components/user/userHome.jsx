import React from 'react';
import { useEffect, useState } from 'react';
import "./app.css"

import { Button } from 'antd';

import { GetAllProducts } from "../../services/admin/home";
import { AddToCart } from '../../services/customer/home';

function Userhome() {
  const [products, setProducts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)


  useEffect(() => {
    GetAllProducts()
      .then((value) => {
        setProducts(value)
      }).catch((err) => {
        console.log(err, "error")
      })
  }, [loadProduct])

  return (
    <div >
      {products.map((eachProduct, i) => (
        <div className='post' key={eachProduct._id}>
          <h2>{eachProduct.name}</h2>
          <h5 className='price'>{eachProduct.price}</h5>
          <h5>{eachProduct.quantity}</h5>
          <p>{eachProduct.description}</p>
          <Button onClick={() => {
            AddToCart(eachProduct)
          }}>add to cart</Button>

        </div>
      ))}
    </div>
  )
}

export default Userhome;