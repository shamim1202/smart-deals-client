import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CreateProduct = () => {
  const { user } = useAuth();
  const handleCreateProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.photoUrl.value;
    const minPrice = e.target.min_price.value;
    const maxPrice = e.target.max_price.value;

    const newProduct = {
      title,
      image,
      minPrice,
      maxPrice,
      email: user.email,
      seller_name: user.displayName,
    };

    axios.post("http://localhost:3000/product", newProduct).then((data) => {
      console.log("add product via axios", data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Create Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="md:max-w-7xl mx-auto md:py-14">
      <h1 className="text-primary text-center text-2xl md:text-5xl font-bold py-2.5 md:py-4">
        Create A Product
      </h1>
      <div>
        <form onSubmit={handleCreateProduct}>
          <fieldset className="fieldset rounded-box mx-auto md:w-[450px] md:p-6 shadow-md bg-white">
            <label className="label md:text-lg font-semibold text-primary">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              className="input w-full md:mb-5 font-normal md:text-lg"
              placeholder="Your product title"
              required
            />

            <label className="label md:text-lg font-semibold text-primary">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className="input w-full md:mb-5 font-normal md:text-lg"
              placeholder="Your e-mail"
              required
            />

            <label className="label md:text-lg font-semibold text-primary">
              Product Image
            </label>
            <input
              type="text"
              name="photoUrl"
              className="input w-full md:mb-5 font-normal md:text-lg"
              placeholder="Product Photo Url"
              required
            />

            <label className="label md:text-lg font-semibold text-primary">
              Minimum Price
            </label>
            <input
              type="number"
              name="min_price"
              className="input w-full md:mb-2.5 md:text-lg font-normal"
              placeholder="Minimum Price $"
            />

            <label className="label md:text-lg font-semibold text-primary">
              Maximum Price
            </label>
            <input
              type="number"
              name="max_price"
              className="input w-full md:mb-2.5 md:text-lg font-normal"
              placeholder="Maximum Price $"
            />

            <button className="btn btn-secondary w-full flex-1" type="submit">
              Create Now
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
