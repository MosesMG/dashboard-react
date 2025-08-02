import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";

const Register = () => {
    const { register, errors, setErrors } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
       name: '', email: '',
       password: '', password_confirmation: ''
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const result = await register(formData);
        if (result.success) {
            navigate('/login');
        } else {
            setLoading(false);
        }
    }

    return (
        <>
            <PageTitle title="Inscription" />

            <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
                <h3 className="text-gray-800 text-2xl font-semibold text-center">Inscription</h3>
                <p className="text-gray-600 text-sm text-center mt-2 mb-6">Créez un compte pour continuer.</p>
                <hr className="border-gray-400" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-1">Nom</label>
                        <input type="text" onChange={handleChange} id="name" name="name" required
                            className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.name &&
                            <span className="text-red-500 text-xs">
                                <i className="fa fa-exclamation-triangle mr-1"></i>{errors.name[0]}
                            </span>
                        }
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                        <input type="email" onChange={handleChange} id="email" name="email" required
                            className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.email &&
                            <span className="text-red-500 text-xs">
                                <i className="fa fa-exclamation-triangle mr-1"></i>{errors.email[0]}
                            </span>
                        }
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">Mot de passe</label>
                        <div className="relative">
                            <input type={!showPassword ? "password" : "text"} onChange={handleChange} id="password" name="password" required
                                className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer">
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {errors.password && 
                            <span className="text-red-500 text-xs">
                                <i className="fa fa-exclamation-triangle mr-1"></i>{errors.password[0]}
                            </span>
                        }
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-semibold mb-1">
                            Confirmer le mot de passe
                        </label>
                        <div className="relative">
                            <input type={!showPassword1 ? "password" : "text"} onChange={handleChange} id="password_confirmation" name="password_confirmation" required
                                className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <button type="button" onClick={() => setShowPassword1(!showPassword1)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer">
                                <i className={`fa ${showPassword1 ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold uppercase rounded-md shadow-sm hover:bg-blue-700 transition duration-200 hover:cursor-pointer">
                        {loading ? 
                            <>
                                <i className="fa fa-spinner fa-spin mr-2"></i>
                                Inscription...
                            </> : 
                            <>
                                <i className="fa fa-sign-in-alt mr-2"></i>
                                S'inscrire
                            </>
                        }
                    </button>
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous avez déjà un compte ?</p>
                    <Link to="/login" className="text-blue-500 hover:underline">Connectez-vous</Link>
                </div>
            </div>
        </>
    );
}

export default Register;
