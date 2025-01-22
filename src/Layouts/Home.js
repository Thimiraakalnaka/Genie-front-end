import React from 'react'
import './home.css'
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';



const Home = () => {


    return (
        <div>
            <div className='home-body'>
                <div className='box'>
                    <GroupIcon fontSize='large' className='icon' />
                    <div>
                        <h2>Total Users</h2>
                        <h3>20</h3>
                    </div>
                </div>
                <div className='box'>
                <SellIcon fontSize='large' className='icon'/>
                    <div>
                        <h2>Total Orders</h2>
                        <h3>150</h3>
                    </div>
                </div>
                <div className='box'>
                <CategoryIcon fontSize='large' className='icon'/>
                    <div>
                        <h2>Total Products</h2>
                        <h3>12</h3>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default Home

