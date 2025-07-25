import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../components/ui/PageTitle";
import axiosClient from "../../services/axios";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // await axiosClient.get('/sanctum/csrf-cookie');
            await login(formData);
            navigate('/accueil')
        } catch (error) {
            if (error.erros) {
                setErrors(error.errors);
            } else {
                console.error("Erreur de connexion: ", error);
                // setErrors({ general: "Une erreur s'est produite lors de la connexion." });
            }
        }
    }

    return (
        <>
            <PageTitle title="Connexion" />
            
            <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
                <h3 className="text-gray-800 text-2xl font-semibold text-center">Connexion</h3>
                <p className="text-gray-600 text-sm text-center mt-2 mb-6">Connectez-vous à votre compte.</p>
                <hr className="border-gray-400" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                        <input type="email" onChange={handleChange} id="email" name="email" required
                            className="w-full px-4 py-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        { errors.email &&
                            <span className="text-red-500 text-xs">
                                <i className="fa fa-exclamation-triangle mr-1"></i>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            </span>
                        }
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">Mot de passe</label>
                        <div className="relative">
                            <input type={!showPassword ? "password" : "text"} onChange={handleChange} id="password" name="password" required
                                className="w-full px-4 py-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer">
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        { errors.password && 
                            <span className="text-red-500 text-xs">
                                <i className="fa fa-exclamation-triangle mr-1"></i>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            </span>
                        }
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold uppercase rounded-md shadow-sm hover:bg-blue-700 transition duration-200">
                        {loading ? 
                            <>
                                <i className="fa fa-spinner fa-spin mr-2"></i>
                                Connexion...
                            </> : 
                            <>
                                <i className="fa fa-sign-in-alt mr-2"></i>
                                Se connecter
                            </>
                        }
                    </button>
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous n'avez pas de compte ?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">Inscrivez-vous</Link>
                </div>
            </div>
        </>
    );
}

export default Login;
