import "./app.css"
import React from 'react';
import { useEffect, useState } from 'react';
import { GetAllProducts } from "../../services/admin/home";
import { AddToCart } from '../../services/customer/home';
import { Card } from 'antd';
import Image from './online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg'

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
    <div className="home">
      <div className="image"><img src={Image} /></div>
      {products.map((eachProduct, i) => {
        const { Meta } = Card;
        return (
          <Card hoverable className="cards" cover={<img alt="products" src={Image} />}
          >
            <Meta title={eachProduct.name} description={eachProduct.description} />
            {eachProduct.price}
            <button onClick={() => {
              AddToCart(eachProduct)
            }}>add to cart</button>
          </Card>
        )
      })}
    </div>

  )
}

export default Userhome;