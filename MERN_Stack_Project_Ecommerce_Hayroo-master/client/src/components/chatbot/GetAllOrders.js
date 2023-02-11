import React, { useEffect, useState } from 'react'
import axios from "axios";
import OrderCard from './OrderCard';
const apiURL = process.env.REACT_APP_API_URL;
function GetAllOrders({triggerNextStep }) {
    const [order, setOrder] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const [user, setUser] = useState({});
    
    const getOrder =async () =>{
        setIsClicked(true)
        const userToken = localStorage.getItem("jwt");
        const tok = JSON.parse(userToken);
        const userData = {uId:tok.user._id};
        setUser(userData)
        if(!userToken){
            setIsLogin(false)
            return ;
        }
        try {
            setIsLogin(true);
            const data = await axios.post(`${apiURL}/api/order/order-by-user`, userData);
            setOrder(data.data.Order);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() =>{
        if(!isClicked){
            setTimeout(function() {
                triggerNextStep()
            }, 20000);
        }
        
        // eslint-disable-next-line
    },[isClicked])

return (
    <div className="order" >
    {isClicked ?isLogin? 
    order ? order.map((item) => {
        return <OrderCard item={item} triggerNextStep={triggerNextStep} user={user} />
    }) :
    <h3>No order found</h3> :  
    <p>Please login first to get order details</p> :  
    <button type='button' onClick={() => getOrder()} >
    Click me to get all orders
</button>}
    </div>
)
}

export default GetAllOrders