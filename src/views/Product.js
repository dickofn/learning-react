import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useAxiosGet } from "../hooks/HttpRequest";

function Product() {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  let { data, loading, error } = useAxiosGet(url);
  const product = data;

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (error) {
    content = <div className="text-red-500"> {id} is not registered yet</div>;
  }

  if (product) {
    content = (
      <div>
        <h1 className="text-2xl font-bold mb-3 uppercase text-center">
          {product.name}
        </h1>

        <div>
          <img
            src={product.sprites.front_default}
            alt={product.name}
            className="mx-auto"
          />
        </div>

        <div className="font-bold text-xl mb-3">{product.weight} kg</div>

        <div>{product.height} m</div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Product;
