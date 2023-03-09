import { useState, useEffect } from 'react';
import { DeleteCart, GetAllCarts, AddingOrder } from "../../services/customer/cart";
import { Card, Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddOrder, GetAllOrders } from '../../services/customer/order';


function UserCart() {
    const [carts, setCarts] = useState([])
    const [orders, setOrders] = useState([])
    const [loadCart, setLoadCart] = useState(false)

    useEffect(() => {
        GetAllCarts()
            .then((data) => {
                setCarts(data)
            })
            .catch((err) => { console.log(err, "error") })

        GetAllOrders()
            .then((value) => {
                const orderStatus = value.map((order) => {
                    return order.status
                })
                setOrders(orderStatus);
            })
            .catch((err) => {
                console.log(err, "error");
            });

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
            <p>{orders[0]}</p>
            {carts.map((eachCart, i) => {
                return (
                    <Card hoverable className='cart-cards' cover={<img className="cart-image" alt="products" src={eachCart.pictureUrl} />}
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
                        </div>
                    </Card>
                )
            })}
            <button onClick={() => { carts.map((d) => { AddOrder(d) }) }}>submit</button>
        </>
    )
}

export default UserCart;