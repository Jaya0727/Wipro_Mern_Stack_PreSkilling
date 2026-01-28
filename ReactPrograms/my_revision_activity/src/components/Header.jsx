const Header = () => {
  return (
    <header className="w-full">
      <div className="bg-gray-600 text-white text-sm py-2 px-6 flex justify-center gap-6">
        <span className="cursor-pointer hover:text-yellow-400">Best Sellers</span>
        <span className="cursor-pointer hover:text-yellow-400">Gift Ideas</span>
        <span className="cursor-pointer hover:text-yellow-400">New Releases</span>
        <span className="cursor-pointer hover:text-yellow-400">Hot Deals</span>
        <span className="cursor-pointer hover:text-yellow-400">Customer Service</span>
      </div>
      <div className="bg-yellow-500 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-2xl">☰</button>
          <button className="bg-black text-white px-4 py-2 rounded text-sm">
            Categories 
          </button>
        </div>
        <h1 className="text-4xl font-bold text-white">Eflyer</h1>
        <div className="flex items-center gap-4">
          <select className="px-2 py-1 rounded">
            <option>English</option>
            <option>Hindi</option>
            <option>Telugu</option>
          </select>
          <span className="text-white cursor-pointer">Cart</span>
        </div>
      </div>

      <div className="bg-white-500 px-6 pb-4">
        <input
          type="text"
          placeholder="Search this blog"
          className="w-full px-4 py-2 rounded text-black outline-none"
        />
      </div>
    </header>
  );
};
export default Header;
