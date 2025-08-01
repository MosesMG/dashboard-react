import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import Accueil from "./pages/Accueil";
import Register from "./pages/auth/Register";
import Users from "./pages/Users";
import ListeBoutiques from "./pages/stores/ListeBoutiques";
import ListeCategories from "./pages/categories/ListeCategories";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/accueil" element={<Accueil />} />
                    <Route path="/boutiques" element={<ListeBoutiques />} />
                    <Route path="/categories" element={<ListeCategories />} />
                    <Route path="/utilisateurs" element={<Users />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
