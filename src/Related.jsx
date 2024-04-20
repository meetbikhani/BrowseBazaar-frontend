import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./related.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { clearrelated, setloader } from "./Features/RelatedSlice";
import { asyncgetrelated } from "./actions/RelatedActions";
import { Toaster } from "react-hot-toast";
import  { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import "./productslider.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation  } from 'swiper/modules';
import './slidersample.css';


const Related = ({ productId, CatId, subCatId }) => {
  const data = useSelector((state) => state.related.Related);
  const loader = useSelector((state) => state.related.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setloader(true));
    dispatch(
      asyncgetrelated(
        `/products?populate=*&[filters][id][$ne]=${productId}&[filters][categories][id][$eq]=${CatId}&[filters][sub_categories][id][$eq]=${subCatId}`
      )
    );
  }, [CatId, subCatId, productId]);

  return (
    <>
    {/* <h1 className="mt-10 text-4xl ml-5">{title}</h1> */}
    {loader ? (
      <div className="flex h-full w-full items-center justify-center my-40">
        <Loader />
      </div>
    ) : (
      <Swiper 
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        navigation={true}
        className="mySwiper"
      >
        {data.map((item) => {
          return (
            
              <SwiperSlide>
              <Link key={item?.id} className="" to={`/product/${item?.id}`}>
                <Card id={item?.id} data={item} />
                </Link>
              </SwiperSlide>
            
          );
        })}
      </Swiper>
    )}
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

const CustomButtonGroup = ({ next, previous }) => {
  return (
    <>
      <div className="custom-button-group-left">
        <button className="custom-arrow-button" onClick={() => previous()}>
          <GrFormPrevious className=" h-8 w-8" />
        </button>
      </div>
      <div className="custom-button-group-right">
        <button className="custom-arrow-button" onClick={() => next()}>
          <MdNavigateNext className=" h-8 w-8" />
        </button>
      </div>
    </>
  );
};

export default Related;
