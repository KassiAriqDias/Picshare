import Home from "./pages/Home/Home";
import Registeration from "./pages/Registration/Registration";
import Profile from "./pages/Profile/Profile";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/Admin/Admin"

function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/registration/login" /> } />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/registration/login" />} />
        <Route path="/registration/*" element={isLoggedIn ? <Navigate to="/" /> : <Registeration/>} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/registration/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
