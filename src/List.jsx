import React, { useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncgetfilterproducts } from "./actions/FilterProductActions";
import Loader from "./Loader";
import { setloader } from "./Features/FilterProductSlice";

const List = ({ selectedSubCats, catId, maxPrice, sort, setwindowUp }) => {
  const data = useSelector((state) => state.filterproduct.FilterProducts);
  const loader = useSelector((state) => state.filterproduct.loader);
  const dispatch = useDispatch();
  // console.log(data);
  useEffect(() => {
    dispatch(setloader(true))
    dispatch(
      asyncgetfilterproducts(
        `/products?populate=*&[filters][categories][id]=${catId}${selectedSubCats.map(
          (item) => `&[filters][sub_categories][id][$eq]=${item}&`
        )}&[filters][price][$lte]=${maxPrice}${
          sort ? `&sort=price:${sort}` : ""
        }`
      )
    );
  }, [selectedSubCats, maxPrice, sort]);



  return (
    <>
      {loader ? (
        <div className="flex min-h-[90vh] my-5 items-center  justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex min-h-[90vh] flex-wrap gap-10 justify-evenly">
          {data.map((item) => {
            return (
              <Link key={item?.id} to={`/product/${item?.id}`}>
                <Card id={item?.id} data={item} />
              </Link>
            );
        })}{ setwindowUp(false)}
        </div>
      )}
    </>
  );
};

export default List;
