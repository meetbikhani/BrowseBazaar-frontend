import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./navbar.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { asyncgetcategory } from "./actions/CategoryActions";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchopen, setSearchOpen] = useState(false);
  const refOne = useRef(null);
  const [change, setChange] = useState(true)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log(e.target.className);
      if (
        !refOne.current.contains(e.target) ||
        e.target.className.includes("cart_cross")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const data = useSelector((state) => state.category.newCategory);
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(asyncgetcategory("/categories?populate=*"));
  }, []);

  return (
    <>
      <div className="main fixed top-0 z-10 h-20">
        <div className="main2 ">
          <ul className="categories">
            <li className="list">
              <div onMouseEnter={() => setChange(true)} className="left  border  focus:outline-none  focus:ring-4  font-medium rounded-full text-sm px-5 pb-1 me-2  bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
                <p className="cattext">Categories</p>
                <IoMdArrowDropdown className="drop cursor-pointer" />
              </div>
              {change ? <ul className="dropdown rounded-md p-0 overflow-hidden top-10 w-[95%]">
                {data?.map((item) => {
                  return (
                    <Link onClick={() => setChange((prev) => !prev)} key={item?.id} to={`/products/${item?.id}`}>
                      <li className="w-full h-full" style={{ padding: "10px" }}>
                        {item?.attributes?.name}
                      </li>
                    </Link>
                  );
                })}
              </ul> : ""}
            </li>
          </ul>
          <Link to={"/"} className="center sm:mr-5">
            <img className="logo" src={logo} alt="Logo" />
            <h1 className="website_name cursor-pointer">BROWSE-BAZAAR</h1>
          </Link>
          <div className="icons">
            <IoMdSearch
              className="search cursor-pointer"
              onClick={() => setSearchOpen(!searchopen)}
            />
            <div className="cart_div">
              <MdOutlineShoppingCart
                className="cart cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              <span className="cart_span">{cartdata?.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={refOne}>{open && <Cart setOpen={setOpen} />}</div>

      <div>{searchopen && <Search setSearchModal={setSearchOpen} />}</div>
    </>
  );
};

export default Navbar;
