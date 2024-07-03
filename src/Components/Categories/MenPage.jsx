import { useContext } from "react";
import DisplayProducts from "./DisplayProducts";
import { ProductFetchContext } from '../Context/ProductFetch'; // Update the path accordingly

const MenPage = () => {
  const { menProducts } = useContext(ProductFetchContext);
  return <DisplayProducts products={menProducts} />;
};

export default MenPage;