import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout';
import Accueil from './pages/Accueil';
import Posts from './pages/Posts';
import PostForm from './pages/PostForm';

function App() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path='/accueil' element={<Accueil />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/posts/add' element={<PostForm />} />
            </Route>
        </Routes>
    );
}

export default App;
