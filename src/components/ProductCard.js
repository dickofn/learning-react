import { Link } from "react-router-dom";

function ProductCard(props) {
  const product = props.product;

  return (
    <div className="border mb-4 rounded overflow-hidden">
      <Link to={`/product/${product.name}`}>
        <div className="uppercase font-medium p-3">{product.name}</div>
        <img src={product.image} alt={product.name} />
      </Link>
    </div>
  );
}

export default ProductCard;
