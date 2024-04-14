import React from 'react'
import Slider from './Slider'
import ProductSlider from './ProductSlider';
import Categories from './Categories';
import Services from './Services';
import Letter from './Letter';

const Home = () => {
  const slides = [
    { url: "https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg", title: "beach" },
    { url: "https://www.gonoise.com/cdn/shop/files/Top_banner-Desktop_24d3d489-8edd-458e-bcf9-3cd44cde9c72.png?v=1710403453", title: "boat" },
    { url: "https://bangaknitwear.com/assets/data/TShirt-Banner.jpg", title: "italy" },
    { url: "https://www.boat-lifestyle.com/cdn/shop/files/Lunar_Embrace_Banner_WEB_1600x.jpg?v=1709549781", title: "forest" },
    { url: "https://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg", title: "city" },
    { url: "https://printnew.in/wp-content/uploads/2021/11/Printed-Graphic-T-shirt-Banner-For-Print-New-India-1-1024x441-1.png", title: "italy" },
    { url: "https://blog.daraz.pk/wp-content/uploads/2020/03/WOMEN-TSHIRT-BANNER-1.jpg", title: "italy" },
    { url: "https://m.media-amazon.com/images/S/aplus-media/vc/98a7b4c2-6724-4246-8ff4-19649dcd3ec9.__CR0,0,970,300_PT0_SX970_V1___.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "99vw",
    // height: "80vh",
    margin: "80px auto auto auto",
  };
  return (
    <div>
      <div  style={containerStyles}>
        <Slider slides={slides} />
      </div>
        <Categories />
        <ProductSlider title={"New Arrival"}/>
        <Services />
        <ProductSlider title={"Trending Products"}/>
        <Letter />

    </div>
  );
}

export default Home