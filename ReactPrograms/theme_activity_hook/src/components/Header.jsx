import { useTheme } from "../hooks/useTheme";

function Header() {
  const { theme } = useTheme();

  return (
    <header style={{ padding: "10px" }}>
      <h3>Current Theme: {theme}</h3>
    </header>
  );
}

export default Header;