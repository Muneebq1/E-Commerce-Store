import { useState, useEffect } from 'react';
import { DeleteCart, GetAllCarts, AddingOrder } from "../../services/customer/cart";

function UserCart() {
    const [carts, setCarts] = useState([])
    const [loadCart, setLoadCart] = useState(false)

    useEffect(() => {
        GetAllCarts()
            .then((data) => { setCarts(data) })
            .catch((err) => { console.log(err, "error") })
    }, [loadCart])

    const plus = (eachCart) => {
        let value;

        if (eachCart.quantity > eachCart.order) {
            value = eachCart.order + 1
        } else {
            value = eachCart.quantity
        }
        AddingOrder(value, eachCart).then(() => { setLoadCart(!loadCart) }).catch((err) => { console.log(err) })
    }

    const minus = (eachCart) => {
        let value;

        if (eachCart.order >= 2) {
            value = eachCart.order - 1
        } else {
            value = 1
        }
        AddingOrder(value, eachCart).then(() => { setLoadCart(!loadCart) }).catch((err) => { console.log(err) })
    }
    return (
        <>
            {carts.map((eachCart, i) => {
                return (
                    <div key={eachCart._id} className="post">
                        <h2>{eachCart.name}</h2>
                        <h5 className='price'>{eachCart.price}</h5>
                        <h5>{eachCart.quantity} in stock</h5>
                        <button onClick={() => { minus(eachCart) }}>-</button>
                        <span>{eachCart.order}</span>
                        <button onClick={() => { plus(eachCart) }}>+</button>
                        <p>{eachCart.description}</p>
                        <button onClick={() => {
                            DeleteCart(eachCart._id)
                                .then(() => { setLoadCart(!loadCart) }).catch((err) => { console.log(err) })
                        }}>remove</button>
                    </div>
                )
            })}
        </>

    )
}

export default UserCart;