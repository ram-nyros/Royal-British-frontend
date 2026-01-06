const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h4 className="font-semibold text-lg">{product.name}</h4>
      <p className="text-gray-700">₹{product.price}</p>
      <button className="mt-3 inline-block bg-[#00247d] text-white px-3 py-1 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
