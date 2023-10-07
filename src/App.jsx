import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Report from "./Components/User/Report/report";
import User from "./Components/User/User";
import Landing from "./Components/LandingPage/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Forgot from "./Components/Auth/Forgot";
import Admin from "./Components/Admin/Admin";
import Test from "./Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/user" element={<User />} />
        <Route path="/control" element={<Admin />} />
        <Route path="/report" element={<Report />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;