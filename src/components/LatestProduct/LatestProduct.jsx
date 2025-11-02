import { Link } from "react-router";

const LatestProduct = ({ product }) => {
  const { _id, image, title, price_min, price_max } = product;
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div>
        <img
          className="rounded w-full md:h-[250px] object-cover"
          src={image}
          alt=""
        />
      </div>
      <div className="md:my-2 space-y-1">
        <h3 className="md:text-xl font-bold text-primary">{title}</h3>
        <p className="text-sm md:text-lg font-semibold text-secondary">
          $ {price_min} - {price_max}
        </p>
      </div>
      <Link to={`/product-details/${_id}`} className="btn btn-outline btn-secondary w-full">View Details</Link>
    </div>
  );
};

export default LatestProduct;
