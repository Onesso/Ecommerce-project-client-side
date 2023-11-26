import { useSearch } from "../context/search";
import ProductCard from "../components/cards/ProductCard";
import Jumbo from "../components/cards/Jumbo";

export default function Search() {
  const [values, setValues] = useSearch();
  return (
    <>
      <Jumbo
        title="Search Results"
        subTitle={
          values?.result?.length < 1
            ? "No products found"
            : `Found ${values?.result?.length} products`
        }
      />
      <div className="container mt-3">
        <div className="row">
          {values?.result?.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
