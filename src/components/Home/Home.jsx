import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LatestProducts from "../LatestProducts/LatestProducts";
import Loading from "../Loading/Loading";

const latestProductPromise = fetch(
  "https://smart-deals-server-seven.vercel.app/latest-products"
).then((res) => res.json());
const Home = () => {
  const { loading } = useContext(AuthContext);

  if(loading) {
    return <Loading></Loading>
  }
  return (
    <div className="md:max-w-7xl mx-auto">
      <LatestProducts
        latestProductPromise={latestProductPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
