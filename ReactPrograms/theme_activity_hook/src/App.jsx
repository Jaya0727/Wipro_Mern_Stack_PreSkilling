import { ThemeProvider } from "./context/ThemeProvider";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Home />
    </ThemeProvider>
  );
}

export default App;