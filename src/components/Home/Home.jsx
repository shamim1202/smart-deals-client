import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductPromise = fetch(
  "http://localhost:3000/latest-products"
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
