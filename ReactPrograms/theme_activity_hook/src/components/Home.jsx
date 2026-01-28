import { useTheme } from "../hooks/useTheme";

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#222222",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h2>{theme.toUpperCase()} MODE</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default Home;