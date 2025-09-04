import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Accueil";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/AuthLayout";
import ListPosts from "./pages/posts/ListPosts";
import FormPost from "./pages/posts/FormPost";
import ListCategories from "./pages/categories/ListCategories";
import FormCategory from "./pages/categories/FormCategory";
import ListArticles from "./pages/articles/ListArticles";
import { AlertSystem } from "./components/AlertSystem";
import { NotificationProvider } from "./context/NotificationContext";
import { NotifContainer } from "./components/NotifContainer";

function App() {
    return (
        <NotificationProvider>
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

                        <Route path="/categories" element={<ListCategories />} />
                        <Route path="/categories/ajouter" element={<FormCategory />} />
                        <Route path="/categories/:id/editer" element={<FormCategory />} />

                        <Route path="/articles" element={<ListArticles />} />
                        
                        <Route path="/alert" element={<AlertSystem userId="user12345" />} />
                    </Route>
                </Routes>

                <NotifContainer />
            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;
