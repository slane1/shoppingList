import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/site/Dashboard";
import Frontpage from "./components/site/Frontpage";
import ShoppingListController from "./components/controller/ShoppingListController";
import './App.css'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shopping-list/:id" element={<ShoppingListController />}/>
      </Routes>
    </div>
  );
}
