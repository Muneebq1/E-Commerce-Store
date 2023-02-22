import axios from "axios";
import { useState, useEffect } from 'react';
import { DeleteCart, GetAllCarts } from "../../services/customer/cart";

function UserCart() {
    const [carts, setCarts] = useState([])
    const [loadCart, setLoadCart] = useState(false)

    useEffect(() => {
        GetAllCarts()
            .then((data) => { setCarts(data) })
            .catch((err) => { console.log(err, "error") })
    }, [loadCart])

    return (
        <>
            {carts.map((eachProduct, i) => (
                <div key={eachProduct._id} className="post">
                    <h2>{eachProduct.name}</h2>
                    <h5 className='price'>{eachProduct.price}</h5>
                    <p>{eachProduct.description}</p>
                    <button onClick={() => {
                        DeleteCart(eachProduct._id)
                        .then(setLoadCart(!loadCart)).catch((err) => { console.log(err) })
                    }}>confirm</button>
                </div>
            ))}
        </>

    )
}

export default UserCart;