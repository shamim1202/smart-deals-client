import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [bids, setBids] = useState([]);

  const bidModalRef = useRef(null);

  const {
    _id,
    image,
    title,
    condition,
    usage,
    description,
    category,
    price_max,
    price_min,
    created_at,
    location,
    seller_contact,
    status,
    seller_image,
    seller_name,
    email,
  } = useLoaderData();

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const contact = e.target.contact.value;

    const newBid = {
      product: _id,
      buyer_image: "https://example.com/buyers/alex.jpg",
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      bid_price: parseInt(bid),
      status: "status",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Bid Placed Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
          bidModalRef.current.close();
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [_id, user]);

  return (
    <div className="md:max-w-7xl mx-auto md:py-14 flex flex-col md:gap-10">
      {/* Products Details Section */}
      <section>
        <div className="grid md:grid-cols-2 md:gap-10">
          {/* Left Section - Image & Description */}
          <div className="space-y-6">
            <div className="w-full md:h-96 rounded-xl flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={title}
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
                  Condition :<span className="text-primary"> {condition}</span>
                </p>
                <p className="text-secondary">
                  Usage Time :<span className="text-primary"> {usage}</span>
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">{description}</p>
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
                {title}
              </h1>

              <button className="text-secondary md:px-3 rounded-4xl bg-purple-300">
                {category}
              </button>
            </div>

            {/* Products price */}
            <div className="md:p-4 bg-white rounded-lg">
              <p className="text-lg md:text-2xl font-bold text-green-600">
                ${price_min} - {price_max}
              </p>
              <p className="text-sm text-gray-500">Price starts from</p>
            </div>

            {/* Products id and posted date */}
            <div className="md:p-4 bg-white rounded-lg">
              <h1 className="md:text-2xl font-bold md:mb-4">Product Details</h1>

              <div className="text-sm md:text-lg space-y-1">
                <p>
                  <strong>Product ID:</strong> {_id}
                </p>
                <p>
                  <strong>Posted:</strong> {created_at}
                </p>
              </div>
            </div>

            {/* Seller information */}
            <div className="md:p-4 bg-white rounded-lg">
              <h1 className="md:text-2xl font-bold md:mb-4">
                Seller Information
              </h1>
              <div className="text-sm md:text-lg space-y-1">
                <div className="flex items-center gap-2 md:gap-4">
                  <img src={seller_image} alt={seller_name} />
                  <div>
                    <p>
                      <strong>{seller_name}</strong>
                    </p>
                    <p>{email}</p>
                  </div>
                </div>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>Contact:</strong> {seller_contact}
                </p>
                <p className="flex items-center md:gap-4">
                  <strong>Status:</strong>{" "}
                  <div>{status === "sold" ? `Sold` : "Pending"}</div>
                </p>
              </div>
            </div>

            {/* Buy button with product bid modal form */}
            <button
              onClick={handleBidModal}
              className="w-full md:text-lg btn btn-secondary"
            >
              I Want Buy This Product
              <dialog
                ref={bidModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box text-primary">
                  <h3 className="font-bold text-lg md:text-2xl md:py-4">
                    Give Seller Your Offer Price
                  </h3>

                  {/* Bid Form */}
                  <form onSubmit={handleBidSubmit}>
                    <fieldset className="fieldset rounded-box w-full">
                      <div className="flex flex-row items-center gap-2 md:mb-2.5">
                        <div className="flex flex-col flex-1">
                          <label className="label md:text-base text-primary md:pb-1">
                            Buyer Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="input w-full font-normal md:text-lg"
                            defaultValue={user?.displayName}
                            readOnly
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <label className="label md:text-base text-primary md:pb-1">
                            Buyer Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="input w-full font-normal md:text-lg"
                            defaultValue={user?.email}
                            readOnly
                          />
                        </div>
                      </div>

                      <label className="label md:text-base text-primary">
                        Place Your Price
                      </label>
                      <input
                        type="number"
                        name="bid"
                        className="input w-full md:mb-2.5 md:text-lg font-normal"
                        placeholder="Amount $"
                      />

                      <label className="label md:text-base text-primary">
                        Contact Info
                      </label>
                      <input
                        type="number"
                        name="contact"
                        className="input w-full md:mb-5 font-normal md:text-lg"
                        placeholder="e.g. +880-123-45678-901"
                        required
                      />

                      <div className="flex items-center justify-between gap-3 md:gap-5">
                        <button className="btn btn-outline btn-secondary w-full flex-1">
                          Cancel
                        </button>

                        <button
                          className="btn btn-secondary w-full flex-1"
                          type="submit"
                        >
                          Submit Bid
                        </button>
                      </div>
                    </fieldset>
                  </form>

                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-outline btn-secondary">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </button>
          </div>
        </div>
      </section>

      {/* All bids for this products section */}
      <section>
        <h1 className="text-xl md:text-3xl font-bold">
          Bids For This Products :{" "}
          <span className="text-secondary">{bids.length}</span>
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.buyer_image}
                            alt={user?.displayName}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
