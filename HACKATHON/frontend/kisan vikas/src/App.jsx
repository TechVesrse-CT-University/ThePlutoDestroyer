import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import CropPlanning from "./pages/cropguidance";"./pages/cropguidance";
import Inventory from "./pages/inventory"
import Weather from "./pages/weather";
import GovSchemes from "./pages/GovSchemes";
import Chatbot from "./pages/Chatbot";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/home"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        />
        <Route path="/cropguidance" element={<CropPlanning   />} />
        <Route path="/inventory" element={<Inventory   />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/govschemes" element={<GovSchemes />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
