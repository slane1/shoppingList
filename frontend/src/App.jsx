import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/site/Header";
import Frontpage from "./components/site/Frontpage";
import Footer from "./components/site/Footer";
import './App.css'

export default function App() {
  return (
    <div>
      <Header />
      <Frontpage />
      <Footer />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
