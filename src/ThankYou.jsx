import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useDispatch} from 'react-redux';
import { resetcart } from './Features/CartSlice';

const ThankYou = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetcart())
  }, [])
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
        <div className=' w-fit h-fit border-2 border-zinc-300 rounded-md p-5 flex flex-col items-start gap-2 m-2'>
            <h1 className='text-xl lg:text-2xl font-bold'>Thanks for shopping with us!</h1>
            <p className='font-semibold mb-20 text-sm'>Your order has been placed successfully</p>
            <Link to='/' className='text-sm'><div className='px-3 py-2 bg-black text-white rounded-md font-semibold'>Go To Home</div></Link>
        </div>
    </div>
  )
}

export default ThankYou