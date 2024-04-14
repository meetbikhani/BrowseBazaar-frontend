import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncgetsearch } from "./actions/SeacrhActions";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setQuery(e.target.value);
    };
    // console.log("mai hu search",query) ;
    const data = useSelector((state) => state.search.product);
  
  const dispatch = useDispatch();
//   console.log("mai hu search ka data",data) ;

  useEffect(() => {
    dispatch(asyncgetsearch(`/products?populate=*&[filters][name][$containsi]=${query}`));
  }, [query]);

    // console.log("search le loo",query);
    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                <div className="search-results">
                    
                        {data.map(item =>{
                            return <div key={item?.id}
                            className="search-result-item flex"
                            
                            onClick={() => {
                                navigate(`/product/${item?.id}`);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                                <img
                                    src={item?.attributes?.image?.data?.attributes?.url}
                                />
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                {item?.attributes?.name.length > 70 ? item?.attributes?.name.substring(0,71) + "..." : item?.attributes?.name}
                                </span>
                                <span className="desc">
                                {item?.attributes?.description.length >100 ? item?.attributes?.description.substring(0,101) + "..." : item?.attributes?.description}
                                </span>
                            </div>
                        </div>
                        })}
                    
                </div>
            </div>
        </div>
    );
};

export default Search;