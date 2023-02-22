import { useEffect, useState, useContext } from 'react';
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
        <div key={eachProduct._id}>
          <h2>{eachProduct.name}</h2>
          <h5 className='price'>{eachProduct.price}</h5>
          <p>{eachProduct.description}</p>
          <button onClick={() => {
            AddToCart(eachProduct)
          }}>add to cart</button>
        </div>
      ))}
    </div>
  )
}

export default Userhome;