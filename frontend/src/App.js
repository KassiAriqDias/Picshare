import Home from "./pages/Home/Home";
import Registeration from "./pages/Registration/Registration";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/registration" element={<Registeration/>} />
    </Routes>
  );
}

export default App;
