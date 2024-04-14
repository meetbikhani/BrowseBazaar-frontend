import React, { useEffect, useState } from "react";
import "./cart.css";
import { FaTrash } from "react-icons/fa";
import EmtyCart from "./EmtyCart";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getTotal,
  removefromcart,
  resetcart,
  setProductQuantity,
} from "./Features/CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { makeRequest } from "./actions/MakeRequestAction";
import Loader from "./Loader";

const stripePromise = loadStripe(
  "pk_test_51P53SdSF8EJQDsx7mE2dg0SVVDSXoiixav6lamtGI7l0tCT4oZfXBNhFFl5b9mV1hIKgjaHFYdIFqu5Vva1VVBH000W8HZmG1y"
);

const Cart = ({ setOpen }) => {
  const [loader, setloader] = useState(false);
  const data = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) localStorage.setItem("cart", JSON.stringify(data));
    localStorage.setItem("total", JSON.stringify(total));
  }, [data]);
  // console.log("data lelo", data);
  const handlepayment = async () => {
    try {
      setloader(true);
      const stripe = await stripePromise;
      // console.log(1);
      const res = await makeRequest.post("/orders", {
        cart: data, // wapis a jana plz
      });
      // console.log(2);
      // console.log(res.data);
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      // console.log(3);
    } catch (err) {
      setloader(false);
      // console.log(4);
      console.log(err);
    }
  };

  return (
    <div className="cart-outside rounded-md border-none ">
      <div className="flex justify-between relative bg-gray-200 mb-5 py-2">
        <h1 className=" text-[150%] font-semibold px-4">
          Products in your Cart
        </h1>
        <h1 className="absolute top-3 right-5 text-2xl cart_cross font-bold">
          X
        </h1>
      </div>
      {/* Set condition for showing cart items or empty cart */}
      {data.length === 0 ? (
        <EmtyCart setOpen={setOpen} />
      ) : (
        <>
          {loader ? (
            <div className="my-32 flex items-center justify-center"><Loader /></div>
          ) : (
            <div className="cart-middle">
              {data.map((item) => (
                <div
                  key={item?.id}
                  className="mb-5 px-4 flex gap-3 justify-start align-middle relative rounded "
                >
                  <img
                    className="h-[12vh] w-[20%] rounded-md"
                    src={item?.img}
                  ></img>
                  <div>
                    <h1 className="text-lg font-semibold ">
                      {item?.title?.length >= 35
                        ? item?.title?.substring(0, 36) + "..."
                        : item?.title}
                    </h1>
                    <p className=" text-sm mb-5">
                      {item?.description?.slice(0, 100) + "..."}
                    </p>
                    <div className="flex justify-between px-4">
                      <div className="basis-1/3">
                        {item?.quantity} X {item?.price}
                      </div>
                      <div className="basis-fit flex gap-[1px] border-[1px] border-zinc-400 ">
                        <button
                          className="border-[1px] border-zinc-400 px-2 py-0 flex items-center justify-center"
                          onClick={() =>
                            dispatch(
                              setProductQuantity({
                                id: item?.id,
                                quantity: item?.quantity - 1,
                                flag: false,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <div className="border-[1px]  border-zinc-400 px-2 py-0 flex items-center justify-center">
                          {item?.quantity}
                        </div>
                        <button
                          className="border-[1px] border-zinc-400 px-2 py-0 flex items-center justify-center"
                          onClick={() =>
                            dispatch(
                              setProductQuantity({
                                id: item?.id,
                                quantity: item?.quantity + 1,
                                flag: true,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <FaTrash
                      onClick={() => {
                        dispatch(removefromcart({ id: item?.id }));
                        dispatch(getTotal());
                      }}
                      className=" absolute top-1 right-5 text-red-600 text-lg cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="bg-gray-200 px-4 py-2">
            <div className="flex justify-between mb-4">
              <h1 className="font-bold px-1 text-[120%]">TOTAL</h1>
              <h1 className="font-bold text-[120%] mr-10">${parseFloat(total).toFixed(2)}</h1>
            </div>
            <button
              className="bg-blue-500 mt-1 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-md"
              onClick={() => {
                // setOpen(false);
                handlepayment();
              }}
            >
              Proceed to Checkout
            </button>
            <br />
            <button
              onClick={() => dispatch(resetcart([]))}
              className="bg-red-500 text-white rounded-md font-bold px-2 mt-5"
            >
              Reset Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
