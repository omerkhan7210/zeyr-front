import { useContext } from "react";
import DisplayProducts from "./DisplayProducts";
import { ProductFetchContext } from "../Context/ProductFetch"; // Update the path accordingly

const WomenPage = () => {
  const { womenProducts } = useContext(ProductFetchContext);

  return <DisplayProducts products={womenProducts} />;
};

export default WomenPage;