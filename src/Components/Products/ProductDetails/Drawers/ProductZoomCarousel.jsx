import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { hostLink } from "../../../Hostlink/hostlink";
import ProductImages from "../ProductImages/ProductImages";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const ProductZoomCarousel = ({imagesArray,setActive}) => {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={1500}
      arrows={false}
      infinite={true}
    >
      {imagesArray && imagesArray.length > 0 ? (
        imagesArray.map((item,index) => (
        // <img key={index} src={`${hostLink}/uploads/${item}`}/>
        <ProductImages imagesArray={imagesArray}/>
        ))
      ) : (
        <p className="cart-sidebar-loading">
          <img src="/images/loadingGIF.gif" width={"30px"} />
        </p>
      )}
    </Carousel>
  );
};
