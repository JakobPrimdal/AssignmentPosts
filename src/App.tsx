import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "@/pages/Home.tsx";
import "./index.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
