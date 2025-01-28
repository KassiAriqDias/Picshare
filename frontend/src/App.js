import Home from "./pages/Home/Home";
import Registeration from "./pages/Registration/Registration";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/Admin/Admin"
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLogedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/registration/login" /> } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registration/*" element={isLoggedIn ? <Navigate to="/" /> : <Registeration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
