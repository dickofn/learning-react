import { Link } from "react-router-dom";

function ProductCard(props) {
  const product = props.product;

  return (
    <div className="border mb-4 rounded overflow-hidden">
      <Link to={`/product/${product.name}`}>
        <div className="uppercase font-medium p-3">{product.name}</div>
        <div className="text-blue-500 p-3">{product.url}</div>
      </Link>
    </div>
  );
}

export default ProductCard;
