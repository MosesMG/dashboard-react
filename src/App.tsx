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
import { NotificationProvider } from "./context/NotificationContext";
import { NotifContainer } from "./components/NotifContainer";
import FormArticle from "./pages/articles/FormArticle";
import SingleArticle from "./pages/articles/SingleArticle";
import Homepage from "./pages/Homepage";
import Analyses from "./pages/analyses/Analyses";
import Scanner from "./pages/analyses/Scanner";

function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<GuestLayout />}>
                        <Route path="/" element={<Homepage />} />
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
                        <Route path="/articles/ajouter" element={<FormArticle />} />
                        <Route path="/articles/:id" element={<SingleArticle />} />
                        <Route path="/articles/:id/editer" element={<FormArticle />} />

                        <Route path="/analyses" element={<Analyses />} />
                        <Route path="/analyses/scan" element={<Scanner />} />
                    </Route>
                </Routes>

                <NotifContainer />
            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;
