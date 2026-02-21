import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { FaRupeeSign } from "react-icons/fa";

const ProgramList = () => {

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);

  const userId = "USR101";
  useEffect(() => {
    fetch(`${API_BASE}/programs`)
      .then(res => res.json())
      .then(data => {
        setPrograms(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch programs");
        setLoading(false);
      });
  }, []);

  const enroll = async (programId) => {
    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, programId })
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage(data.message);
        setEnrolledPrograms(prev => [...prev, data.data]);
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Server error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2>Fitness Programs</h2>
      {message && <p>{message}</p>}
      {programs.map(p => (
        <div key={p.programId} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>Category: {p.category}</p>
          <p>Level: {p.level}</p>
          <p>Price: <FaRupeeSign/>{p.price}</p>
          <button onClick={() => enroll(p.programId)}>Enroll</button>
        </div>
      ))}

      <h3>Enrolled Programs</h3>

      {enrolledPrograms.map((item, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><strong>User:</strong> {item.user.name} ({item.user.userId})</p>
          <p><strong>Program:</strong> {item.program.name}</p>
          <p><strong>Program ID:</strong> {item.program.programId}</p>
          <p><strong>Level:</strong> {item.program.level}</p>
          <p><strong>Price:</strong> <FaRupeeSign/>{item.program.price}</p>
        </div>
      ))}

    </div>
  );
};

export default ProgramList;