function Employee({ name, currentRole, onPromote }) {
  return (
    <div className="bg-amber-100 border p-4 rounded mb-3">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Role:</strong> {currentRole}</p>

      <button
        onClick={() => onPromote(name)}
        className="mt-2 bg-indigo-500 text-black px-3 py-1 rounded"
      >
        Promote
      </button>
    </div>
  );
}

export default Employee;