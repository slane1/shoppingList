import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/site/Dashboard";
import Frontpage from "./components/site/Frontpage";
import Register from "./components/site/Register";
import Login from "./components/site/Login";
import Logout from "./components/site/Logout";
import NewList from "./components/forms/NewList";
import ShoppingListDisplay from "./components/site/ShoppingListDisplay";
import './App.css'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/shopping-list/:id" element={<ShoppingListDisplay />}/>
        <Route path="/new-list" element={<NewList />} />
      </Routes>
    </div>
  );
}
