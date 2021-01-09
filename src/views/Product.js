import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

function Product() {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let content = null;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [url]);

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
