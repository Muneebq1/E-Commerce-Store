import "./app.css"
import React from 'react';
import { useEffect, useState } from 'react';
import { GetAllProducts } from "../../services/admin/home";
import { AddToCart } from '../../services/customer/home';
import { Card } from 'antd';
import Image from './online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg'
import image2 from "./img1.png"
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
    <div>
      <div className="image"><img src={Image} /></div>
      <h3>Shop by category</h3 >
      <div className="category">
        <div><img className="" alt="products" src={image2} /> <br /> something</div>
        <div><img className="" alt="products" src={image2} /> <br /> something</div>
        <div><img className="" alt="products" src={image2} /> <br /> something</div>
        <div><img className="" alt="products" src={image2} /> <br /> something</div>
        </div>
      <div className="home">
        {products.map((eachProduct, i) => {
          const { Meta } = Card;
          return (
            <Card hoverable className="cards" cover={<img className="cards-img" alt="products" src={Image} />}
            >
              <Meta title={eachProduct.name} description={eachProduct.description} />
              <p className="price">
                {eachProduct.price}
                </p>
              <button onClick={() => {
                AddToCart(eachProduct)
              }}>add to cart</button>
            </Card>
          )
        })}
      </div>
    </div>

  )
}

export default Userhome;