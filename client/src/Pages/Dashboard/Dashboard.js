import React, { useState, useEffect, useContext } from 'react'
import Seperator from '../../Components/Seperator'
import { images } from '../../constants'
import './Dashboard.css'
import { AdminContext } from '../../App'
import Select from 'react-select'
import axios from 'axios'

const DashBoard = () => {


    const { state, dispatch } = useContext(AdminContext)
    const [userId, setUserId] = useState(null)
    const [posts, setPosts] = useState([])
    const [todaysPost, setTodaysPost] = useState([])
    const [pendingPosts, setPendingPosts] = useState([])
    const [acceptedOrders,setAcceptedOrders] = useState([])
    const [todayRequest,setTodayRequest] = useState([])
    const [techie, setTechie] = useState('')
    const [editTechie, setEditTechie] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const [editAmount, setEditAmount] = useState('')
    const [date, setDate] = useState('')
    const [activeTab,setActiveTab]  = useState(1)
    const [completed,setCompleted] = useState([])

    const tabState = (index)=>{
        setActiveTab(index)
        dispatch({type:'TABS',payload:index})
    }


    const token = localStorage.getItem('jwt')

    useEffect(() => {
        setDate(new Date().toLocaleDateString('en-GB'))
        setInterval(() => {

            allOrders()

        }, 1000)
    }, [])

    useEffect(() => {
        todayOrders()
    }, [posts])







    const todayOrders = () => {
        const result = posts.filter((obj) => {
            if (obj.date === date) {
                return { obj }
            }
        })
        setTodaysPost(result);

        const todays_request = posts.filter((obj)=>{
            if(obj.date === date && obj.status === 'Order requested'){
                return {obj}
            }
        })
        setTodayRequest(todays_request)

        const pendingPost = posts.filter((obj) => {
            if (obj.status === 'Order requested') {
                return { obj }
            }
        })
        setPendingPosts(pendingPost)

        const acceptedPost = posts.filter((obj)=>{
            if(obj.status === 'Order Accepted'){
                return {obj}
            }
        })
        setAcceptedOrders(acceptedPost)

        const completedOrders = posts.filter((obj)=>{
            if(obj.status === 'Completed'){
                return {obj}
            }
        })
        setCompleted(completedOrders)



    }



    const allOrders = async () => {
        const orders = await axios.get('http://ec2-54-159-166-105.compute-1.amazonaws.com:3000/api/post/allpost', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setPosts(orders.data);
        dispatch({ type: 'ALLPOSTS', payload: orders.data })
    }


    const editBtn = (id) => {
        setUserId(id)
        if (userId === id) {
            setUserId(null)
        }
    }
    const updateBtn = async (obj) => {
        const elementupdate = {
            id: obj._id,
            techie: editTechie ? editTechie : obj.techie,
            status: editStatus ? editStatus : obj.status,
            amount: editAmount ? editAmount : obj.amount
        }
        console.log(elementupdate);
        const postUpdate = await axios.post('http://ec2-54-159-166-105.compute-1.amazonaws.com:3000/api/postUpdate', elementupdate, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setUserId(null)
        setEditTechie('')
        setEditStatus('')
        setEditAmount('')


    }
    return (
        <div className='dash-container' >
            <div className='basic-details' >
                <div className='detail-card' >
                    <img style={{ width: '72px' }} src={images.ORDERS} alt="" />
                    <h4 style={{ margin: 0, textAlign: 'center' }} >Today's Order</h4>
                    <div className='normal-badge' >
                        {todaysPost.length}
                    </div>
                </div>
                <div className='detail-card' onClick={()=>tabState(5)} >
                    <img style={{ width: '72px' }} src={images.COMPLETED} alt="" />
                    <h4 style={{ margin: 0, textAlign: 'center' }} >Completed Orders</h4>
                    <div className='user-badge' >
                        {completed.length}
                    </div>
                </div>
                <div className='detail-card' onClick={()=>tabState(3)} >
                    <img style={{ width: '72px' }} src={images.ACCEPTED} alt="" />
                    <h4 style={{ margin: 0, textAlign: 'center' }} >Accepted Orders</h4>
                    <div className='important-badge' >
                        {acceptedOrders.length}
                    </div>
                </div>
                <div className='detail-card' onClick={()=>tabState(4)} >
                    <img style={{ width: '72px' }} src={images.TIME} alt="" />
                    <h4 style={{ margin: 0, textAlign: 'center' }} >Pending Orders</h4>
                    <div className='important-badge' >
                        {pendingPosts.length}
                    </div>
                </div>

            </div>
            <Seperator height={'50px'} />
            <div className='order-details' >
                <table className='table' >
                    <tr className='table-row table-heading' >
                        <th className='sl-no' >SL No.</th>
                        <th className='customer-name' >Customer ID</th>
                        <th className='brand-name'>Mobile Brand</th>
                        <th className='complaint'>Complaint</th>
                        <th className='mobileno'>Mobile No.</th>
                        <th className='location'>Location</th>
                        <th className='techiename'>Technician</th>
                        <th className='status'>Status</th>
                        <th className='amount'>Amount</th>
                        <th className='remarks'>Remarks</th>
                        <th className='blank'>       </th>
                    </tr>
                    {
                        todayRequest.map((obj, index) => {


                            return (
                                <tr className='table-row' key={index}>
                                    <td className='sl-no' >{index + 1}</td>
                                    <td ><div className='customer-name'>{obj.postedBy}</div></td>
                                    <td className='brand-name'>{obj.mobile + ' ' + obj.model}</td>
                                    <td className='complaint'>{obj.problem}</td>
                                    <td className='mobileno'>{obj.phone}</td>
                                    <td className='location' >{obj.location}</td>
                                    <td className='techiename'>
                                        {userId === obj._id ?
                                            <select onChange={(e) => setEditTechie(e.target.value)} >
                                                <option value="">Select</option>
                                                <option value="Manu">Manu</option>
                                                <option value="Sarath">Sarath</option>
                                            </select>
                                            :
                                            `${obj.techie ? obj.techie : '-'}`}
                                    </td>
                                    <td className='status'>
                                        {userId === obj._id ?
                                            <select onChange={(e) => setEditStatus(e.target.value)} >
                                                <option value='Order requested' >Order requested</option>
                                                <option value='Order Accepted' >Order Accepted</option>
                                                <option value='Order cancelled' >Order cancelled</option>
                                                <option value='Completed' >Completed</option>
                                                <option value='Order waiting' >Order waiting</option>
                                                <option value='Enquiry' >Enquiry</option>
                                            </select>
                                            :
                                            obj.status}
                                    </td>
                                    <td className='amount'>
                                        {userId === obj._id ?
                                            <input style={{ width: '90px' }} onChange={(e) => setEditAmount(e.target.value)} ></input>
                                            :
                                            obj.amount}
                                    </td>
                                    <td className='remarks'>
                                        {userId === obj._id ?
                                            <input style={{ width: '200px', height: '50px' }} onChange={(e) => setRemarks(e.target.value)} ></input>
                                            :
                                            `${obj.remarks ? obj.remarks : '-'}`}
                                    </td>
                                    <td className='blank' >{userId !== obj._id ? <button onClick={() => editBtn(obj._id)} style={{ height: '25px', width: '25px', display: 'flex', justifyContent: 'center' }} ><img style={{ height: '20px', width: '20px' }} src={images.EDIT} alt="" /></button> : <button onClick={() => updateBtn(obj)} style={{ height: '25px', width: '25px', display: 'flex', justifyContent: 'center' }}><img style={{ height: '20px', width: '20px' }} src={images.ACCEPT} alt="" /></button>}</td>
                                </tr>
                            )

                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default DashBoard