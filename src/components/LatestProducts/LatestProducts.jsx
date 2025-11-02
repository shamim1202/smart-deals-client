import { use } from "react";
import LatestProduct from "../LatestProduct/LatestProduct";

const LatestProducts = ({ latestProductPromise }) => {
  const latestProducts = use(latestProductPromise);

  return (
    <div className="py-5 md:py-14">
      <h1 className="text-primary text-center text-2xl md:text-5xl font-bold py-2.5 md:py-4">
        Recent <span className="text-secondary">Products</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {latestProducts.map((product) => (
          <LatestProduct key={product._id} product={product}></LatestProduct>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
