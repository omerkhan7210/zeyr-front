import  { useContext } from "react";
import DisplayProducts from "./DisplayProducts";
import { ProductFetchContext } from "../Context/ProductFetch"; // Update the path accordingly

export const AllCollections = () => {
  const { products } = useContext(ProductFetchContext);

  return <DisplayProducts products={products} />;
};
