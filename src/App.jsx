import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import Accueil from "./pages/Accueil";
// import Register from "./pages/auth/Register";

function App() {
    return (
        <AuthProvider>
            {/* <BrowserRouter> */}
                <Routes>
                    <Route element={<GuestLayout />}>
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/register" element={<Register />} /> */}
                    </Route>

                    {/* <Route element={<AuthLayout />}> */}
                        <Route path="/accueil" element={<Accueil />} />
                    {/* </Route> */}
                </Routes>
            {/* </BrowserRouter> */}
        </AuthProvider>
    );
}

export default App;
