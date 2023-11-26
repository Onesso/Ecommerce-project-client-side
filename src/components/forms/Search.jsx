//replacing local state with context - using context to store data from the backend(db)
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search"; //context

export default function Search() {
  //hook context
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      setValues({ ...values, result: data });
      // console.log(data);
      navigate("/Search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* the seearch  */}
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          style={{
            borderRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            width: "500px",
            
          }}
          placeholder="Search"
          className="form-control"
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          value={values.keyword}
        />
        <button
          type="submit"
          style={{
            borderRadius: "10px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
          className="btn btn-outline-primary"
        >
          search
        </button>
      </form>
    </>
  );
}
