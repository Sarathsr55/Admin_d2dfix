import React, { useContext } from 'react'
import './Orders.css'
import { AdminContext } from '../../App'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Seperator from '../../Components/Seperator'
import Calender from 'moedim'
import { images } from '../../constants'

const Orders = () => {


  const [postByDate, setPostByDate] = useState([])
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem('jwt')
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'))
  const [calender, setCalender] = useState('')
  const [calOpen, setCalOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [editTechie, setEditTechie] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [remarks,setRemarks] = useState('')

  useEffect(() => {
    allOrders()
    post()
  }, [posts])

  const allOrders = async () => {
    const orders = await axios.get('http://ec2-54-159-166-105.compute-1.amazonaws.com:3000/api/post/allpost', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    setPosts(orders.data);
  }

  const post = () => {
    var a = posts.filter(obj => {
      if (obj.date === date) {
        return obj
      }
    })
    setPostByDate(a);
  }

  const referDate = (newdate) => {
    setCalender(newdate)
  }

  const selectDate = () => {
    setDate(calender)
    setCalOpen(false)
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
    <div className='orders-container' >
      <div className='date_header' >
        <h4>{date}</h4>
        <Seperator width={'25px'} />
        <button style={{ height: '30px', backgroundColor: '#ff9900', color: 'white', border: 'none' }} onClick={() => setCalOpen(true)} >Select a date</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Calender className={calOpen ? 'calenderon' : 'calenderoff'} locale='en-US' onChange={(d) => referDate(d.toLocaleDateString('en-GB'))} />
        <div className={calOpen ? 'calenderon' : 'calenderoff'}>
          <button onClick={() => selectDate()} >select</button>
          <button>cancel</button>
        </div>
      </div>
      <div>
        <table className='table'>
          <tr className='table-row table-heading' >
            <th className='sl-no' >SL No.</th>
            <th className='customer-name' >Customer Name</th>
            <th className='brand-name'>Mobile Brand</th>
            <th className='complaint'>Complaint</th>
            <th className='mobileno'>Mobile No.</th>
            <th className='location'>Location</th>
            <th style={{paddingLeft:1}} className='techiename'>Technician</th>
            <th className='status'>Status</th>
            <th className='amount'>Amount</th>
            <th className='remarks' >Remarks</th>
            <th className='blank'>       </th>
          </tr>
        </table>
        <div>
          {
            postByDate.map((obj, index) => {
              return (

                <tr className='table-row' key={index}>
                  <td className='sl-no' >{index + 1}</td>

                  <td ><div className='customer-name'>{obj.postedBy}</div></td>
                  <td  className='brand-name'>{obj.mobile + ' ' + obj.model}</td>
                  <td style={{paddingLeft:5}}  className='complaint'>{obj.problem}</td>
                  <td className='mobileno'>{obj.phone}</td>
                  <th style={{paddingLeft:5}} className='location'>{obj.location}</th>
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
                  <td style={{paddingLeft:10}}  className='status'>
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
                      <input style={{ width: '200px',height:'50px' }} onChange={(e) => setRemarks(e.target.value)} ></input>
                      :
                      `${obj.remarks ? obj.remarks : '-'}`}
                  </td>
                  <td className='blank' >{userId !== obj._id ? <button onClick={() => editBtn(obj._id)} style={{ height: '25px', width: '25px', display: 'flex', justifyContent: 'center' }} ><img style={{ height: '20px', width: '20px' }} src={images.EDIT} alt="" /></button> : <button onClick={() => updateBtn(obj)} style={{ height: '25px', width: '25px', display: 'flex', justifyContent: 'center' }}><img style={{ height: '20px', width: '20px' }} src={images.ACCEPT} alt="" /></button>}</td>
                </tr>

              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default Orders