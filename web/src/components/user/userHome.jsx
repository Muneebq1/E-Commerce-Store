import "./app.css"
import React from 'react';
import { useEffect, useState } from 'react';
import { GetAllProducts } from "../../services/admin/home";
import { AddToCart } from '../../services/customer/home';
import { Button, Card, Carousel } from 'antd';
import Image from './carousel.jpg'
import Image2 from './carousel 2.jpg'
import Image3 from './carousel 3.jpg'
import Image4 from './carousel 4.jpg'
import fruits from './fruits.png'
import vegetables from './vegetables.png'
import grocery from './grocery.png'
import masala from './masala.png'



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


  const contentStyle = {
    height: '408px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: 'lightgray',
  };
  // console.log(count)

  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}><img className="image" src={Image} alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img className="image" src={Image2} alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img className="image" src={Image3} alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img className="image" src={Image4} alt="" /></h3>
        </div>
      </Carousel>

      <h1>Shop by Category</h1 >
      <div className="category">
        <div><img className="categories" alt="products" src={grocery} /> <br /> grocery</div>
        <div><img className="categories" alt="products" src={vegetables} /> <br />vegetables</div>
        <div><img className="categories" alt="products" src={fruits} /> <br /> fruits</div>
        <div><img className="categories" alt="products" src={masala} /> <br /> masala</div>
      </div>
      <div className="home">
        {products.map((eachProduct, i) => {
          const { Meta } = Card;
          return (
            <Card hoverable className="cards" cover={<img className="cards-img" alt="products" src={eachProduct.pictureUrl} />}
            >
              <Meta title={eachProduct.name} description={eachProduct.description} />
              <p className="price">
                {eachProduct.price}
              </p>
              <button className="add-button" onClick={() => {
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