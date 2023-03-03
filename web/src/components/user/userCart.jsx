import { useState, useEffect } from 'react';
import { DeleteCart, GetAllCarts, AddingOrder } from "../../services/customer/cart";
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract, faTrash } from "@fortawesome/free-solid-svg-icons";


function UserCart() {
    const [carts, setCarts] = useState([])
    const [loadCart, setLoadCart] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        GetAllCarts()
            .then((data) => {
                setCarts(data)
                add(data)
            })
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

    const add = (data) => {
        data.map((d) => {

            setTotal(total + d.price)
        })

    }

    return (
        <>
            {carts.map((eachCart, i) => {
// console.log(carts)
                return (
                    <Card hoverable className='cart-cards' cover={<img className="cart-image"width={"20px"} alt="products" src={eachCart.pictureUrl} />}
                    >
                        <div className='cart-flex '>
                            <h1 className='cart-name'>{eachCart.name.toUpperCase()}</h1>
                            <Button className='buttons' onClick={() => { minus(eachCart) }}><FontAwesomeIcon icon={faSubtract} /></Button>
                            <div className='cart-order'>{eachCart.order}</div>
                            <Button className='buttons' onClick={() => { plus(eachCart) }}><FontAwesomeIcon icon={faAdd} /></Button>
                            <p className="cart-price">Rs.{eachCart.price}</p>
                        </div>
                        <div className='cart-flex'>
                            <Button className='cart-trash' onClick={() => { DeleteCart(eachCart._id).then(() => { setLoadCart(!loadCart) }).catch((err) => { console.log(err) }) }}><FontAwesomeIcon icon={faTrash} /></Button>
                            <h5 className='cart-quantity'>{eachCart.quantity} in stock</h5>
                            {/* <p>{total}</p> */}
                        </div>
                    </Card>
                )
            })}
        </>
    )
}

export default UserCart;