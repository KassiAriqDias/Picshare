import Home from "./pages/Home/Home";
import Registeration from "./pages/Registration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration/*" element={<Registeration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
