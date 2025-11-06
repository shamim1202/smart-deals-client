import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/bids?email=${user.email}`).then((data) => {
      setBids(data.data);
    });
  }, [user, axiosSecure]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-server-seven.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-server-seven.vercel.app/bids/${_id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                position: "top-end",
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="md:max-w-7xl mx-auto md:py-14">
      <h1 className="text-primary text-center text-2xl md:text-5xl font-bold py-2.5 md:py-4">
        My Bids : <span className="text-secondary">{bids.length}</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </div>
                </td>

                <td>Zemlak, Daniel and Leannon</td>

                <td>{bid.bid_price}</td>

                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning text-primary">
                      {bid.status}
                    </div>
                  ) : (
                    <div className="badge badge-success text-white">
                      {bid.status}
                    </div>
                  )}
                </td>

                <th>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="btn btn-outline btn-error btn-xs md:btn-sm hover:text-white"
                    >
                      Remove Bid
                    </button>

                    <button className="btn btn-outline btn-info btn-xs md:btn-sm hover:text-white">
                      View Details
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
