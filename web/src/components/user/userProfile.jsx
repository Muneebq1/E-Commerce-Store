import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddPicture, GetProfilePic } from "../../services/customer/profile";
import { GlobalContext } from '../../store/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import img from './img/noprofile.jpg';
import { GetUserOrders } from "../../services/customer/order";

function UserProfile() {
    let { state, dispatch } = useContext(GlobalContext);
    const [profilePic, setProfilePic] = useState()
    const [loadProduct, setLoadProduct] = useState(false)
    const [pic, setPic] = useState([])
    const [orders, setOrders] = useState([])
    const [preview, setPreview] = useState()

    useEffect(() => {
        GetProfilePic()
            .then((value) => {
                setPic(value);
            })
            .catch((err) => {
                console.log(err, "error");
            });

        GetUserOrders()
            .then((value) => {
                setOrders(value);
            })
            .catch((err) => {
                console.log(err, "error");
            });
    }, [loadProduct])

    const data = pic.map((d) => {
        return d.profilePic
    })
    return (
        <div>
            <h1 className="setting">Settings</h1>
            <div className="upload">
                {(data[0] != undefined) ? <img src={data} className='picture' alt="" /> : <img src={img} alt="upload" />}
                <div className="round">
                    <input
                        type="file"
                        id='picture'
                        onChange={
                            (e) => {
                                let url = URL.createObjectURL(e.currentTarget.files[0])
                                setPreview(url)
                                setProfilePic(e.currentTarget.files[0])
                            }
                        } />
                    <FontAwesomeIcon className="camera" icon={faCamera} />
                </div>
            </div>
            <div className="user-name">
                <h2>{state.user.firstName.toUpperCase()}</h2>
                <button className="check" onClick={() => { AddPicture(profilePic, state.user._id).then(setLoadProduct(!loadProduct)) }}><FontAwesomeIcon className="icon" icon={faCheck} /></button>
            </div>
            <h2>Orders</h2>
            {orders.map((eachOrder) => {
                return (
                    <div className="orders">
                        <p>{eachOrder.name}</p>
                        <p>{eachOrder.price}</p>
                    </div>

                )
            })}
        </div>
    )
}
export default UserProfile;