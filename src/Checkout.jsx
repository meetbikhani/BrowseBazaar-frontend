import { useEffect, useState } from "react";
import "./checkout.css";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const [nameLength, setNameLength] = useState(0)
  const [emailLength, setEmailLength] = useState(0)
  const [phoneNoLength, setPhoneNoLength] = useState(0)
  const [zipLength, setZipLength] = useState(0)
  const [addressLength, setAddressLength] = useState(0)
  const total = useSelector((state) => state.cart.total);
  const tax = (total * 0.18).toFixed(2)
  const final = (parseFloat((total * 0.18) + total + 15)).toFixed(2)
  useEffect(() => {
    // Scroll to the top of the outlet when the component mounts or updates
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-20 mb-60">
      <h1 className="bg-black text-white text-center text-5xl p-4 pt-1 font-semibold ">
        Checkout
      </h1>
      <div className="">
        <form className=" max-xl:flex-col flex items-center">
          <div className="xl:w-[60%] w-[80%] pt-8 x1:pl-[10%]  max-lg:mx-auto">
            <h1 className="text-3xl font-bold text-center xl:text-left">Billing Details</h1>
            <div className="w-full my-5 flex flex-col gap-5 sm:block items-center">
              <input
                className="w-[70%] sm:w-[48%] px-3 py-2 text-bold sm:mr-5 border-2 border-zinc-300 rounded-md"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setNameLength(e.target.value.length) }
              />
              <input
                className="w-[70%] sm:w-[48%] px-3 py-2 text-bold border-2 border-zinc-300 rounded-md "
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmailLength(e.target.value.length) }
              />
            </div>
            <div className="my-5 flex flex-col gap-5 items-center sm:block">
              <input
                className="w-[70%] sm:w-[48%] px-3 py-2 text-bold sm:mr-5 border-2 border-zinc-300 rounded-md"
                type="tel"
                placeholder="Phone"
                required
                onChange={(e) => setPhoneNoLength(e.target.value.length) }
              />
              <input
                className="no-spinner w-[70%] sm:w-[48%] px-3 py-2 text-bold border-2 border-zinc-300 rounded-md"
                type="number"
                placeholder="Zip"
                required
                onChange={(e) => setZipLength(e.target.value.length) }
              />
            </div>
            <div className="flex justify-center">
              <input
                className="sm:w-[98%] mr-2 w-[70%] border-2 border-zinc-300 rounded-md px-3 py-2"
                type="text"
                placeholder="Address"
                required
                onChange={(e) => setAddressLength(e.target.value.length)}
              />
            </div>
          </div>
          <div className="xl:w-[30%] w-[70%] flex flex-col pt-8 px-8">
            <div className="border-2 border-zinc-300">
              <h2 className="bg-zinc-300 text-xl text-center font-bold py-2">
                Total Cart (2)
              </h2>
              <div className="flex justify-between p-2 font-bold border-b-2 mx-2">
                <span>Subtotal:</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between p-2 font-medium mx-2">
                <span>Delivery:</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between p-2 font-medium mx-2 border-b-2">
                <span>Tax(18%):</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between mx-2 p-2 mb-4 font-bold">
                <span>Total:</span>
                <span>${final}</span>
              </div>

              <div className="buttons flex justify-center gap-5 items-center mb-4">
                <button disabled= {!nameLength && emailLength && phoneNoLength && zipLength && addressLength} className=" bg-zinc-300 text-xl text-zinc-700 font-semibold px-3 py-1 rounded-md">Pay Now</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
