import { useParams } from "react-router-dom";
function ProductDetail() {
  const params = useParams();
  const { name } = params;
  return (
    <>
      <h1 className="text-blue-700 text-[33px]">{name}</h1>
    </>
  );
}

export default ProductDetail;
