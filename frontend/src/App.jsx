import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/site/Dashboard";
import Frontpage from "./components/site/Frontpage";
import './App.css'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
