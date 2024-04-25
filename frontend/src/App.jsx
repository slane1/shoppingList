import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/site/Dashboard";
import Frontpage from "./components/site/Frontpage";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import NewList from "./components/forms/NewList";
import ShoppingListController from "./components/controller/ShoppingListController";
import './App.css'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-list/:id" element={<ShoppingListController />}/>
        <Route path="/new-list" element={<NewList />} />
      </Routes>
    </div>
  );
}
