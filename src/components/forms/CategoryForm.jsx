export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Category name"
        className="form-control p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary mt-4">{buttonText}</button>

        {handleDelete && (<button className="btn btn-danger mt-4" onClick={handleDelete}>Delete</button>)}
        
      </div>
    </form>
  );
}
