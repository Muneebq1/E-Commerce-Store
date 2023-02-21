import axios from "axios";
import { GlobalContext } from '../../context/Context';
import { useEffect, useState, useContext } from 'react';


function Userhome() {
  let { state, dispatch } = useContext(GlobalContext);
  const [carts, setCarts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  // const [cartProduct, setCartProduct] = useState()


  const addToCart = (d) => {
    axios.post(`${state.baseUrl}/cart`, {
      name: d.productName,
      price: d.productPrice,
      description: d.productDescription,
    })
      .then(response => {
        console.log("response: ", response.data);
        setLoadProduct(!loadProduct)

      })
      .catch(err => {
        console.log("error: ", err);
      })
    
  }
  // console.log(cartProduct)

  const getAllCarts = async () => {
    try {
      const response = await axios.get(`${state.baseUrl}/carts`)
      console.log("response: ", response.data);

      setCarts(response.data.data)
      console.log(response, ">>>>>>>>")

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }
  useEffect(() => {

    getAllCarts()

  }, [loadProduct])
  return (
    <div >
      {carts.map((eachProduct, i) => (
        <div key={eachProduct._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
          <h2>{eachProduct.name}</h2>
          <h5 className='price'>{eachProduct.price}</h5>
          <p>{eachProduct.description}</p>
          <button onClick={() => {
            addToCart(eachProduct)
          }}>Add to Cart</button>
        </div>
      ))}
    </div>


  )
}

export default Userhome;