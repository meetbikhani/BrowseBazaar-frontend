import React, { useEffect } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncgetcategory } from "./actions/CategoryActions";
import Loader from "./Loader";

const Categories = () => {
  const data = useSelector((state) => state.category.newCategory);
  const loader = useSelector((state) => state.category.loader);
  const dispatch = useDispatch();
  // console.log(data) ;

  useEffect(() => {
    dispatch(asyncgetcategory("/categories?populate=*"));
  }, []);
  return (
    <>
      <h1 className="mt-10 text-4xl ml-5">Shop By Categories</h1>
        <div className="outer">
          {loader ? <div className="flex h-full w-full items-center justify-center my-40"><Loader /></div> : <>
            {data.map((item) => {
              return (
                <Link
                  key={item?.id}
                  to={`/products/${item?.id}`}
                  className="inside"
                >
                  <div className="categories-image-div">
                    <img
                      className="image object-cover"
                      src={item?.attributes?.image?.data?.attributes?.url}
                    ></img>
                  </div>
                  <h1 className="name">{item?.attributes?.name}</h1>
                </Link>
              );
            })}
          </>}
        </div>
    </>
  );
};

export default Categories;
