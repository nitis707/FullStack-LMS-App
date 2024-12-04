import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Login />
    </main>
  );
}

export default App;
