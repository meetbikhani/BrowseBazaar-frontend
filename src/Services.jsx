import React from 'react'
import './services.css'

const Services = () => {
  return (
    <>
    {/* <h1 className='mt-10 text-4xl ml-5'>Shop By Categories</h1> */}
    <div className='outer'>
        <div className='inside'>
            <img className='img' src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334304_small.svg?v=1682336123'></img>
            <h1 className='name'>7-day Replacement</h1>
        </div>
        <div className='inside'>
            <img className='img' src='https://www.boat-lifestyle.com/cdn/shop/files/Group_334303_small.svg?v=1682336123'></img>
            <h1 className='name'>Free Shipping</h1>
        </div>
        
    </div>
    </>
  )
}

export default Services
