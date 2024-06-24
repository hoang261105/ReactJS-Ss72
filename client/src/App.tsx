import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
