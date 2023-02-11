import React, {useState} from 'react'
import { editCategory, returnOrder } from '../admin/orders/FetchApi';
function OrderCard({item, triggerNextStep, user}) {
    const [isCanceledToggle, setIsCanceledToggle] = useState(false);
    const [isReturnedToggle, setIsReturnedToggle] = useState(false);
    const [returnRequest, setReturnRequest] = useState(false);
    const [cancelRequest, setCancelRequest] = useState(false);
    const cancelOrder = async (oId,allProduct) => {
        const status = "Cancelled"
            let responseData = await editCategory(oId, status,allProduct);
            if(responseData.success){
                console.log("order updated successfully");
                setCancelRequest(true);
                setIsCanceledToggle(false)
                triggerNextStep()
            }else{
                console.log("Please try again");
                setIsCanceledToggle(false)
            }
    }
    const returnProduct = async (e,id) => {
        const data={reason:e.target.value, oId: id, user}
            let responseData = await returnOrder(data);
            if(responseData.success){
                console.log("Return requested successfully");
                setIsReturnedToggle(false)
                setReturnRequest(true);
                triggerNextStep()
            }else{
                console.log("Please try again");
                setIsReturnedToggle(false)
            }
    }
  return (
    <div key={item._id} className="order-card" >
            <h3>Order Id: {item._id}</h3>
            <p>Status: {item.status}</p>
            {item.status === "Cancelled" ? "" :
            item.status === "Delivered" ? 
            <button className='chatbot-btn' type='button' onClick={() => setIsReturnedToggle(true)}>Return Order</button> :
            <button className='chatbot-btn' type='button' onClick={() => setIsCanceledToggle(true)}>Cancel Order</button>}
            {isCanceledToggle && <div>
                <h1>Are you sure you want to cancel your order</h1>
                <button className='chatbot-btn' type='button' onClick={() =>cancelOrder(item._id,  item.allProduct)} >Yes</button>
                <button className='chatbot-btn' type='button' onClick={() => triggerNextStep()} >No</button>
                
                </div>}
                {cancelRequest && <p>Your Order has been cancelled successfully</p>}
            {isReturnedToggle && <div>
                <h1>Please select one of the below option to proceed</h1>
                <label htmlFor="return">Choose a reason for returning the product</label>
                <select className='chatbot-select' name="return" id="return" onChange={(e) => returnProduct(e, item._id)}>
                <option value="Select one option">Select one option</option>
                <option value="not worthy">not worthy</option>
                <option value="size issue">size issue</option>
                <option value="missing items">missing items</option>
                <option value="not working/ damaged">not working/ damaged</option>
                </select>
                
                </div>}
                {returnRequest && 
                    <p>Your return request has been submitted successfully. Soon you will hear from us on your registered email.</p>}
            
        </div>
  )
}

export default OrderCard