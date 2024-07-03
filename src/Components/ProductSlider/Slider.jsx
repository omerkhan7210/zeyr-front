import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductCard } from "./ProductCard";
import { useContext } from "react";
import { ProductFetchContext } from "../Context/ProductFetch";

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

export const Slider = () => {
  const { products } = useContext(ProductFetchContext);

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={1500}
      arrows={false}
      infinite={true}
    >
      {products && products.length > 0 ? (
        products.map((item) => <ProductCard key={item.id} item={item} />)
      ) : (
        <p className="cart-sidebar-loading">
          <img src="/images/loadingGIF.gif" width={"30px"} />
        </p>
      )}
    </Carousel>
  );
};
