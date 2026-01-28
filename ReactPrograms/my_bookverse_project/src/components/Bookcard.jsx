const Bookcard = ({ title, author, price, view }) => {
  return (
    <div
      className={`border rounded-lg p-4 shadow-md bg-white 
      ${view === "grid" ? "w-full" : "flex justify-between items-center"}`}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">Author: {author}</p>
      </div>

      <p className="text-blue-600 font-bold mt-2">₹{price}</p>
    </div>
  );
};

export default Bookcard;