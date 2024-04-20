import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { asyncgetproductdetails } from "./actions/ProductDetailsActions";
import { setproductdetailsloader } from "./Features/ProductDetailsSlice";
import Loader from "./Loader";
import Related from "./Related";
import Button from "./Button";
import { Toaster } from "react-hot-toast";

const Product = () => {
  const [added, setadded] = useState(false);

  const id = useParams().id;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const productId = useParams().id;

  const data = useSelector((state) => state.productDetails.ProductDetails);
  const cartdata = useSelector((state) => state.cart.products);
  const loader = useSelector((state) => state.productDetails.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    async function waiter() {
      dispatch(setproductdetailsloader(true));
      await dispatch(
        asyncgetproductdetails(`/products/${productId}?populate=*`)
      );
      check();
    }
    waiter();
  }, [productId, cartdata]);

  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  const check = () => {
    if (cartdata.length > 0) {
      for (var i = 0; i < cartdata.length; i++) {
        if (cartdata[i].id == productId) {
          setadded(true);

          break;
        } else {
          setadded(false);
        }
      }
    } else {
      setadded(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center h-[80vh] w-[100%]">
          <Loader />
        </div>
      ) : (
        <div className="lg:flex lg:flex-row h-auto w-[100%]  overflow-hidden lg:gap-10 lg:justify-evenly mt-20">
          <div className="product-left overflow-hidden rounded-lg ">
            <img
              className="h-[100%] w-[100%] object-contain"
              src={data?.attributes?.image?.data?.attributes?.url}
              alt="product"
            ></img>
          </div>
          <div className="product-right">
            <h1 className="text-5xl font-semibold mb-10">
              {data?.attributes?.name}
            </h1>
            <p className="text-lg mb-10">{data?.attributes?.description}</p>
            <div className=" mb-10">
              <span className="text-2xl font-semibold">
                ${data?.attributes?.price}
              </span>{" "}
            </div>

            {added ? (
              <div className=" flex my-2 lg:my-20 h-10">
                <div className="border-none cursor-pointer bg-black px-3 py-2  text-white rounded-md  font-semibold">
                  Item already added to the cart
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 flex gap-4">
                  <button
                    className="bg-zinc-700  rounded-full text-white font-bold w-8 h-8 outline-none text-xl"
                    onClick={decrementQuantity}
                  >
                    <span className="block -translate-y-1">-</span>
                  </button>
                  <span className="text-xl border-gray-500">{quantity}</span>
                  <button
                    className="bg-zinc-700 rounded-full text-white font-bold w-8 h-8 outline-none text-xl"
                    onClick={incrementQuantity}
                  >
                    <span className="block -translate-y-1">+</span>
                  </button>
                </div>
                <div className="w-40 text-center">
                  <Button data={data} quantity={quantity} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <h1 className="mt-10 text-4xl ml-5">Related Products</h1>
      <Related
        productId={productId}
        CatId={data?.attributes?.categories?.data[0]?.id}
        subCatId={data?.attributes?.sub_categories?.data[0]?.id}
      />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              color: "white",
              background: "red",
            },
          },
        }}
      />
    </>
  );
};

export default Product;
