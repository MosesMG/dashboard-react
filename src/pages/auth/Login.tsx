import React, { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
// import useAuth from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

interface Credentials {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    //     const { login, errors, setErrors } = useAuth();

        const [form, setForm] = useState<Credentials>({
            email: '', password: ''
        });
        const [loading, setLoading] = useState<boolean>(false);
        const [showPassword, setShowPassword] = useState<boolean>(false);
        // const navigate = useNavigate();
    //     const location = useLocation();

    //     const from = location.state?.from || '/accueil';

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            // setErrors({ ...errors, [e.target.name]: [] });
        }

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);
            // setErrors({});

            // const result = await login(form);

            // if (result.success) {
            //     navigate(from, { replace: true });
            // } else {
            //     setLoading(false);
            // }
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
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-semibold mb-1"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            onChange={handleChange}
                            id="email" name="email"
                            className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                        {/* {errors.email && <span className="text-red-500 text-xs">{errors.email[0]}</span>} */}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-1"
                        >
                            Mot de passe
                        </label>

                        <div className="relative">
                            <input
                                type={!showPassword ? "password" : "text"}
                                onChange={handleChange}
                                id="password" name="password"
                                className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        {/* {errors.password && <span className="text-red-500 text-xs">{errors.password[0]}</span>} */}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 px-4 py-2 inline-flex justify-center items-center bg-blue-500 text-white font-semibold uppercase rounded-md shadow-sm hover:bg-blue-700 hover:cursor-pointer transition duration-200"
                    >

                        {loading ?
                            <>
                                <Loader2 size={20} className="animate-spin mr-1" />
                                Connexion...
                            </> :
                            <>
                                <LogIn size={20} className="mr-2" />
                                Se connecter
                            </>
                        }
                    </button>
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous n'avez pas de compte ?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Inscrivez-vous
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
