import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useAxiosGet } from "../hooks/HttpRequest";

function Home() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

  let products = useAxiosGet(url);

  let content = null;

  if (products.loading) {
    content = <Loader />;
  }

  if (products.error) {
    content = <div className="text-red-500"> Error </div>;
  }

  if (products.data) {
    content = products.data.results.map((product) => (
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
