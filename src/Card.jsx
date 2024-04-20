import React, { useEffect, useState } from "react";
import "./card.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ data, id }) => {
  const cartdata = useSelector((state) => state.cart.products);
  const [isInCart, setIsInCart] = useState(false);
  const cartCheck = () => {
    if (cartdata.find((item) => item?.id === id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  };

  useEffect(() => {
    cartdata ? cartCheck() : null;
  }, [isInCart, cartdata]);
  // useEffect(() => {
  //   if(isInCart)
  //   onAdd()
  // }, [isInCart]);
  return (
    <div className=" w-[360px] h-[400px] border-md overflow-hidden flex flex-col rounded-md bg-white">
      <div className="overflow-hidden mx-auto h-[80%]">
        <div className=" w-full overflow-hidden scale-[90%] hover:scale-125 transition-all ease-out">
          <img
            className="object-contain overflow-hidden "
            src={data?.attributes?.image?.data?.attributes?.url}
            alt=""
          />
        </div>
      </div>
      <div className="p-3 flex flex-col bg-white ">
        <h2 className="text-base font-semibold mb-2">
          {data?.attributes?.name?.length >= 28
            ? data?.attributes?.name?.substring(0, 29) + "..."
            : data?.attributes?.name}
        </h2>
        <div className="flex justify-between">
          <p className=" text-lg font-bold">${data?.attributes?.price}</p>
          <div className="flex gap-2">
            {isInCart ? (
              <Link to={""}>
                <div  className="border-none cursor-pointer bg-black px-3 py-2  text-white rounded-md text-sm font-semibold">
                
                  Already added to the cart
                </div>
              </Link>
            ) : (
              <Link to={""}>
                <Button data={data} quantity={1} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
