import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerAdmin" element={<AdminRegister />} />
          <Route path="/loginAdmin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
