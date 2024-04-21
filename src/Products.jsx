import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import List from "./List";
import { useSelector, useDispatch } from 'react-redux'
import { asyncgetsubcategory } from "./actions/SubCategoryActions";
import Loader from './Loader'
import { setsubcategoryloader } from "./Features/SubCategorySlice";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [windowUp, setwindowUp] = useState(true)
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 630);
  // const [screenChanged, setScreenChanged] = useState(false);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  // useEffect(() => {
  //   // Function to update isMobile state when window is resized
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 630);
  //     setScreenChanged(true);
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  

  useEffect(() => {
    // Scroll to the top of the outlet when the component mounts or updates
    window.scrollTo(0, 0);
  }, [windowUp]);
  // useEffect(() => {
  //   // Reload the page only if the screen size changes from mobile to non-mobile or vice versa
  //   if (screenChanged) {
  //     window.location.reload();
  //   }
  // }, [screenChanged]);

  var catId = parseInt(useParams().id) ;
  const [refresh, setrefresh] = useState(false) ;
  const data = useSelector((state) => state.subcategory.newSubCategory) ;
  const loader = useSelector((state) => state.subcategory.loader) ;
    const dispatch = useDispatch() ;
    // console.log(data) ;
var loc = useLocation();
   loc = loc.pathname[loc.pathname.length - 1];
  useEffect(() => {
    setSelectedSubCats([]);
    setSort(null);
    setMaxPrice(1000);
    
    dispatch(setsubcategoryloader(true)); 
    dispatch(asyncgetsubcategory(`/sub-categories?[filters][categories][id][$eq]=${catId}`));
    
  }, [catId , loc, refresh]) ;

  const handleChange = (e) => {
    const value = e.target.value ;
    const isChecked = e.target.checked ;

    setSelectedSubCats(
      isChecked ? [...selectedSubCats,value] : selectedSubCats.filter(item=> item !== value)
    )

  }


  return (
    <div className="products mt-20 flex-col sm:flex-row">
      <div className="left-section pl-5">
        <div className="filterItem">
          <h2 className="font-medium mb-5 max-sm:mb-2 filter-title">Product Categories</h2>
          {loader ? <div className="flex items-center justify-center my-10">
            <Loader />
          </div> : <div className="flex sm:flex-col max-sm:item-center max-sm:justify-center">
          {data.map((item)=>{
            return <div key={item?.id} className="mb-1 ml-1">
            <input
              className="mr-2 select-box"
              type="checkbox"
              id={item?.id}
              value={item?.id}
              onChange={handleChange}
            />
            <label className="label-text" htmlFor={item?.id}>
              {item?.attributes?.name}
            </label>
          </div>
          })}
          </div>}
        </div>

        <div className="filterItem max-sm:flex max-sm:item-center max-sm:justify-center">
          <h2 className="filter-title font-medium mb-5 max-sm:mb-0">Filter by price</h2>
          <div className="flex max-sm:item-center max-sm:justify-center max-sm:mx-6">
            <span className="label-text">0</span>
            <input
              type="range"
              min={0}
              value={maxPrice}
              max={1000}
              className="price-input"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span className="label-text">{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem max-sm:flex max-sm:gap-3 max-sm:item-center max-sm:justify-center">
          <h2 className="filter-title font-medium mb-5 max-sm:mb-0">Sort by Price</h2>
          <div className="mb-1 ml-1 max-sm:mb-0">
            <input
              className="mr-2 select-box"
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label className=" label-text" htmlFor="asc">
              Lowest first
            </label>
          </div>
          <div className="mb-1 ml-1 max-sm:mb-0">
            <input
              className="mr-2 select-box"
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label className=" label-text" htmlFor="desc">
              Highest first
            </label>
          </div>
        </div>
      </div>
      <div className="right-section">
        <List selectedSubCats={selectedSubCats} catId={catId} maxPrice={maxPrice} sort={sort} setwindowUp={setwindowUp} />
      </div>
    </div>
  );
};

export default Products;
