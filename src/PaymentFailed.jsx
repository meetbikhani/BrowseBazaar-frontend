import { Link } from 'react-router-dom'
import Button from './Button'
import { MdOutlineSmsFailed } from "react-icons/md";

function PaymentFailed() {
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
        <div className=' w-fit h-fit border-2 border-zinc-300 rounded-md p-5 flex flex-col items-center gap-2 m-2'>
        <div className=''>
          <MdOutlineSmsFailed style={{fontSize: "70px"}} />
        </div>
            <h1 className='text-xl lg:text-2xl font-bold'>Payment Failed</h1>
            <p className='font-semibold mb-20 text-sm'>Your transaction has failed so you cannot proceed further</p>
            <Link to='/' className='text-sm'><div className='px-3 py-2 bg-black text-white rounded-md font-semibold'>Go To Home</div></Link>
        </div>
    </div>
  )
}

export default PaymentFailed