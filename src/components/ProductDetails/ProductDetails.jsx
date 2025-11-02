import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <div className="md:max-w-7xl mx-auto md:py-14 flex flex-col md:gap-10">
      {/* Products Details Section */}
      <section>
        <div className="grid md:grid-cols-2 md:gap-10">
          {/* Left Section - Image & Description */}
          <div className="space-y-6">
            <div className="w-full md:h-96 rounded-xl flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover rounded-2xl"
                />
              ) : (
                <span className="text-gray-400">No Image Available</span>
              )}
            </div>

            <div className="md:space-y-2 p-6 bg-white rounded-xl">
              <h1 className="md:text-xl font-bold">Product Description</h1>

              <div className="text-sm md:text-lg font-semibold flex items-center justify-between">
                <p className="text-secondary">
                  Condition :
                  <span className="text-primary"> {product.condition}</span>
                </p>
                <p className="text-secondary">
                  Usage Time :
                  <span className="text-primary"> {product.usage}</span>
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Section - Details & Seller */}
          <div className="space-y-6">
            {/* Products Name and back button */}
            <div>
              <button
                onClick={() => window.history.back()}
                className="text-sm md:text-lg font-semibold text-primary hover:text-gray-700 mb-2"
              >
                ← Back To Products
              </button>
              <h1 className="text-xl md:text-4xl font-semibold md:font-bold md:mb-4">
                {product.title}
              </h1>

              <button className="text-secondary md:px-3 rounded-4xl bg-purple-300">
                {product.category}
              </button>
            </div>

            {/* Products price */}
            <div className="md:p-4 bg-white rounded-lg">
              <p className="text-lg md:text-2xl font-bold text-green-600">
                ${product.price_min} - {product.price_max}
              </p>
              <p className="text-sm text-gray-500">Price starts from</p>
            </div>

            {/* Products id and posted date */}
            <div className="md:p-4 bg-white rounded-lg">
              <h1 className="md:text-2xl font-bold md:mb-4">Product Details</h1>

              <div className="text-sm md:text-lg space-y-1">
                <p>
                  <strong>Product ID:</strong> {product._id}
                </p>
                <p>
                  <strong>Posted:</strong> {product.created_at}
                </p>
              </div>
            </div>

            <div className="md:p-4 bg-white rounded-lg">
              <h1 className="md:text-2xl font-bold md:mb-4">
                Seller Information
              </h1>
              <div className="text-sm md:text-lg space-y-1">
                <div className="flex items-center gap-2 md:gap-4">
                  <img src={product.seller_image} alt={product.seller_name} />
                  <div>
                    <p>
                      <strong>{product.seller_name}</strong>
                    </p>
                    <p>{product.email}</p>
                  </div>
                </div>
                <p>
                  <strong>Location:</strong> {product.location}
                </p>
                <p>
                  <strong>Contact:</strong> {product.seller_contact}
                </p>
                <p className="flex items-center md:gap-4">
                  <strong>Status:</strong> <div>
                    {
                      product.status === "sold" ? `Sold` : "Pending"
                    }</div>
                </p>
              </div>
            </div>
            
          <button className="w-full md:text-lg btn btn-secondary">
            I Want Buy This Product
          </button>
          </div>
        </div>
      </section>

      {/* All bids for this products section */}
      <section>
        <h1 className="text-xl md:text-3xl font-bold">
          Bids For This Products : {}
        </h1>
      </section>
    </div>
  );
};

export default ProductDetails;
