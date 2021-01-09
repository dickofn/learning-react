import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useAxiosGet } from "../hooks/HttpRequest";

function Product() {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  let product = useAxiosGet(url);

  let content = null;

  if (product.loading) {
    content = <Loader />;
  }

  if (product.error) {
    content = <div className="text-red-500"> {id} is not registered yet</div>;
  }

  if (product.data) {
    content = (
      <div>
        <h1 className="text-2xl font-bold mb-3 uppercase text-center">
          {product.data.name}
        </h1>

        <div>
          <img
            src={product.data.sprites.front_default}
            alt={product.data.name}
            className="mx-auto"
          />
        </div>

        <div className="font-bold text-xl mb-3">{product.data.weight} kg</div>

        <div>{product.data.height} m</div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Product;
