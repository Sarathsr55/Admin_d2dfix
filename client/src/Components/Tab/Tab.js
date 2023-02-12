import React,{useState,useContext} from 'react'
import { AdminContext } from '../../App'
import { images } from '../../constants'
import Completed from '../../Pages/Completed Orders/Completed'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import OrderAccepted from '../../Pages/Order Accepted/OrderAccepted'
import Orders from '../../Pages/Orders/Orders'
import Pending from '../../Pages/Pending/Pending'
import Settings from '../../Pages/Settings/Settings'
import Seperator from '../Seperator'

import './Tab.css'

const Tab = () => {

    const {state,dispatch} = useContext(AdminContext)
    
    const tabno = state.tab? state.tab : 1

    
    const tabState = (index)=>{
        setActiveTab(index)
        dispatch({type:'TABS',payload:index})
    }
    const [activeTab,setActiveTab]  = useState(1)



    return (

        <div className='tab-contents'>
            <div className='side-panel' >
                <Seperator height={'25px'} />
                <div className={tabno === 1 ?'home-panel row active' : 'home-panel row'} onClick={()=>tabState(1)} >
                    <img style={{ height: '24px' }} src={images.DASHBOARD} alt="" />
                    <h6>Dashboard</h6>
                </div>
                <div className={tabno === 2 ?'orders-panel row active' : 'orders-panel row'} onClick={()=>tabState(2)} >
                    <img style={{ height: '24px' }} src={images.ORDER_LIST} alt="" />
                    <h6>Orders</h6>
                </div>
                <div className={tabno === 3 ?'orderaccepted-panel row active' : 'orderaccepted-panel row'} onClick={()=>tabState(3)}>
                    <img style={{ height: '24px' }} src={images.ORDERACCEPTED} alt="" />
                    <h6>Accepted Orders</h6>
                </div>
                <div className={tabno === 4 ?'pending-panel row active' : 'opending-panel row'} onClick={()=>tabState(4)}>
                    <img style={{ height: '24px' }} src={images.PENDING} alt="" />
                    <h6>Pending Orders</h6>
                </div>
                <div className={tabno === 5 ?'completed-panel row active' : 'completed-panel row'} onClick={()=>tabState(5)}>
                    <img style={{ height: '24px' }} src={images.ACCEPT} alt="" />
                    <h6>Completed Orders</h6>
                </div>
                <div className={tabno === 6 ?'settings-panel row active' : 'settings-panel row'} onClick={()=>tabState(6)}>
                    <img style={{ height: '24px' }} src={images.SETTING} alt="" />
                    <h6>Settings</h6>
                </div>

            </div>
            <div className='tab-component'>
                <div className={tabno === 1 ?'active-tab':'tab'} >
                    <Dashboard/>
                </div>
                <div className={tabno === 2 ?'active-tab':'tab'} >
                    <Orders/>
                </div>
                <div className={tabno ===3 ? 'active-tab':'tab'}>
                    <OrderAccepted/>
                </div>
                <div className={tabno ===4 ? 'active-tab':'tab'}>
                    <Pending/>
                </div>
                <div className={tabno === 5 ?'active-tab':'tab'} >
                    <Completed/>
                </div>
                <div className={tabno === 6 ?'active-tab':'tab'} >
                    <Settings/>
                </div>

            </div>

        </div>

)
}

export default Tab