import Home from "./pages/Home/Home";
import Registeration from "./pages/Registration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/registration/*" element={<Registeration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
