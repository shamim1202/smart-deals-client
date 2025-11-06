import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductPromise = fetch(
  "https://smart-deals-server-seven.vercel.app/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div className="md:max-w-7xl mx-auto">
      <LatestProducts
        latestProductPromise={latestProductPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
