import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtocart, getTotal } from "./Features/CartSlice";

const Button = ({ data, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          addtocart({
            id: data?.id,
            title: data?.attributes?.name,
            description: data?.attributes?.description,
            price: data?.attributes?.price,
            img: data?.attributes?.image?.data?.attributes?.url,
            quantity,
          })
        );
        dispatch(getTotal())
      }}
      className={`border-none cursor-pointer bg-black px-3 py-2  text-white rounded-md  font-semibold`}
    >
      Add to Cart
    </div>
  );
};

export default Button;
