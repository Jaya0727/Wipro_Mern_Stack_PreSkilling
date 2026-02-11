import React from "react";

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} style={{ margin: "5px" }}>
      {text}
    </button>
  );
}

export default Button;
