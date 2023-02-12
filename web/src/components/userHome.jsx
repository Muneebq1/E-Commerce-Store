import { useFormik } from 'formik';
import axios from "axios";
import { GlobalContext } from '../context/Context';
import { useEffect, useState, useContext } from 'react';


function Userhome() {
    let { state, dispatch } = useContext(GlobalContext);
    const [products, setProducts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)

    const getAllProducts = async () => {
        try {
          const response = await axios.get(`${state.baseUrl}/products`)
          console.log("response: ", response.data);
    
          setProducts(response.data.data)
          console.log(response , ">>>>>>>>")
    
        } catch (error) {
          console.log("error in getting all products", error);
        }
      }
      useEffect(() => {

        getAllProducts()
    
      }, [loadProduct])
    return(
        <div >
        {products.map((eachProduct, i) => (
          <div key={eachProduct._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
            <h2>{eachProduct.name}</h2>
            {/* <p>{eachProduct._id}</p> */}
            <h5 className='price'>{eachProduct.price}</h5>
            <p>{eachProduct.description}</p>
          </div>
        ))}
      </div>


    )
}

export default Userhome;