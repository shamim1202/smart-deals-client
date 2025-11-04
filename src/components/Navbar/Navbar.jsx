import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allproducts">All Products</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/myproducts">My Products</Link>
          </li>
          <li>
            <Link to="/mybids">My Bids</Link>
          </li>
          <li>
            <Link to="/create-a-product">Create A Product</Link>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="md:max-w-7xl mx-auto">
      <div className="navbar mx-0 px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="font-bold md:font-extrabold md:text-3xl">
            Smart{" "}
            <span className="text-secondary md:font-extrabold">Deals</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-secondary btn-sm md:btn-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-secondary btn-sm md:btn-md md:px-8"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-secondary btn-sm md:btn-md md:ml-5 md:px-8"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
