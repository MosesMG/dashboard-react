import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Accueil";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/AuthLayout";
import ListPosts from "./pages/posts/ListPosts";
import FormPost from "./pages/posts/FormPost";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                
                <Route element={<AuthLayout />}>
                    <Route path="/accueil" element={<Dashboard />} />
                    <Route path="/posts" element={<ListPosts />} />
                    <Route path="/posts/ajouter" element={<FormPost />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
