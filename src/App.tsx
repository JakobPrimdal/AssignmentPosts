import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "@/pages/Home.tsx";
import { Post } from "@/pages/Post.tsx";
import "./index.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
