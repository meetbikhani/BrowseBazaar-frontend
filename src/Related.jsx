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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 40000000000000000, min: 3050 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3050, min: 2500 },
    items: 8,
  },
  desktop2: {
    breakpoint: { max: 2500, min: 2145 },
    items: 7,
  },
  desktop3: {
    breakpoint: { max: 2145, min: 1860 },
    items: 6,
  },
  desktop4: {
    breakpoint: { max: 1860, min: 1520 },
    items: 5,
  },
  desktop5: {
    breakpoint: { max: 1520, min: 1200 },
    items: 4,
  },
  desktop6: {
    breakpoint: { max: 1200, min: 900 },
    items: 3,
  },
  desktop7: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
  },
  desktop8: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

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
      {loader ? (
        <div className="flex items-center justify-center my-32">
          <Loader />
        </div>
      ) : (
        <Carousel
          swipeable={true}
          // centerMode={true}
          draggable={true}
          responsive={responsive}
          className="mt-10"
          arrows={false}
          customButtonGroup={<CustomButtonGroup />}
          additionalTransfrom={0}
          autoPlay={true}
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container-with-dots"
          dotListClass=""
          focusOnSelect={false}
          infinite
          itemClass="mr-5"
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
        >
          {data.map((item) => {
            return (
              <Link className="" key={item.id} to={`/product/${item.id}`}>
                <div className="overflow-none productSliderCard">
                  <Card id={item.id} data={item} />
                </div>
              </Link>
            );
          })}
        </Carousel>
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
