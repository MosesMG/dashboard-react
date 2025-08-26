import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout';
import Accueil from './pages/Accueil';
import Posts from './pages/posts/Posts';
import PostForm from './pages/posts/PostForm';
import SinglePost from './pages/posts/SinglePost';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
    return (
        <Routes>
            <Route element={<GuestLayout />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path='/accueil' element={<Accueil />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/posts/add' element={<PostForm />} />
                <Route path='/posts/:id' element={<SinglePost />} />
                <Route path='/posts/:id/edit' element={<PostForm />} />
            </Route>
        </Routes>
    );
}

export default App;
