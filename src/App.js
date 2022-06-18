import AdminQuestion from "./components/AdminQuestion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

function App() {
  const ROLES = {
    'ADMIN': 5150
  }
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/registerAdmin" element={<AdminRegister />} />
          <Route path="/loginAdmin" element={<AdminLogin />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/newForm" element={<AdminQuestion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
