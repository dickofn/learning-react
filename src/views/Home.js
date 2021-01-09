import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

function Home() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let content = null;

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
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
    content = <div className="text-red-500"> Error </div>;
  }

  if (products) {
    content = products.results.map((product) => (
      <div key={product.url}>
        <ProductCard product={product} />
      </div>
    ));
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Best Sellers</h1>

      {content}
    </div>
  );
}

export default Home;
