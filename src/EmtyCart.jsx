import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const EmtyCart = ({setOpen}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex  flex-col">
      <div className="h-4/5 w-4/5 mx-auto flex justify-center">
        <img
          className="h-60 w-60"
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp"
          alt=""
        />
      </div>
      <p className="text-3xl font-bold mx-auto">Your Cart is Empty</p>
      <p className="text-zinc-400 text-[0.9rem] mx-auto text-center w-4/5 my-2">
        Looks like you have not added anything to your cart. Go ahead & explore
        the top categories
      </p>
      <button
        onClick={() => {
          navigate("/");
          setOpen(false);
        }}
        className="bg-blue-500 hover:bg-blue-700 w-40 mx-auto my-4 text-white font-bold py-2 px-4 rounded-full"
      >
        Home
      </button>
    </div>
  );
};

export default EmtyCart;
