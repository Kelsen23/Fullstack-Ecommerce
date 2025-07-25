const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        className="py-3 px-4 border rounded-lg w-full"
        placeholder="Write category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex justify-between gap-4">
        <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          {buttonText}
        </button>

        {handleDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
